// Obtener el elemento canvas del html
const canvas = d3.select("#canvas");

// JSON con los datos necesarios para generar las graficas
const data = [
    { name: "Medellín", index2005: 3, index2006: 33 },
    { name: "Cali", index2005: 39, index2006: 45 },
    { name: "Bogotá", index2005: 7, index2006: 31 },
    { name: "Pereira", index2005: 35, index2006: 36 },
    { name: "Bucaramanga", index2005: 16, index2006: 23 },
    { name: "Cúcuta", index2005: 45, index2006: 45 },
    { name: "Armenia", index2005: 6, index2006: 16 }
];

// Caracteristicas del canvas
const widht = 700;
const height = 500;
const margin = {top:10, left:50, bottom: 40, right: 10};
const iwidth = widht - margin.left - margin.right;
const iheight = height - margin.top - margin.bottom;

// Creacion del elemento svg para la grafica con sus atributos
const svg = canvas.append("svg");
svg.attr("width", widht);
svg.attr("height", height);

let g = svg
    .append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

// Dominio en x de la grafica
const x = d3.scaleBand()
    .domain(data.map(d => d.name) ) 
    .range([0, iwidth])
    .padding(0.1); 

// Dominio en y de la grafica
const y = d3.scaleLinear() 
    .domain([0, 50])
    .range([iheight, 0])

// Creacion de las barras de la grafica
const bars = g.selectAll("rect").data(data)
    .enter()
    .append("rect")
    .attr("class", "bar");

// Animacion al graficar los datos index2005 al hacer click en el boton
d3.select("#anio2005").on("click", function () {
    bars.transition()
        .attr("class", "bar")
        .attr("fill", "steelblue")
        .attr("x", (d) => x(d.name))
        .attr("y", (d) => y(d.index2005))
        .attr("height", d => iheight - y(d.index2005))
        .attr("width", x.bandwidth())
        .delay(500)
        .duration(3000);

    // Titulo de la grafica
    g.append("text")
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .attr("x", 310)
        .attr("y", 10)
        .text("Index 2005 vs Ciudad");
});

// Animacion al graficar los datos index2006 al hacer click en el boton
d3.select("#anio2006").on("click", function () {
    bars.transition()
        .attr("class", "bar")
        .attr("fill", "green")
        .attr("x", (d) => x(d.name))
        .attr("y", (d) => y(d.index2006))
        .attr("height", d => iheight - y(d.index2006))
        .attr("width", x.bandwidth())
        .delay(500)
        .duration(3000);

    // Titulo de la grafica
    g.append("text")
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .attr("x", 310)
        .attr("y", 10)
        .text("Index 2006 vs Ciudad");
});

// Eje x de la grafica corresponde a las ciudades
g.append("g")
    .classed("x--axis", true)
    .call(d3.axisBottom(x))
    .attr("transform", `translate(0, ${iheight})`);  
    
// Eje y de la grafica  corresponde a los indices
g.append("g")
    .classed("y--axis", true)
    .call(d3.axisLeft(y));