// const URL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const WIDTH = 300;
const HEIGHT = 200;
const PADDING = 40;

const M = 3; // constant that scales the data points.

const dataset = [12, 31, 22, 17, 25, 18, 29, 14];

// Data scales to prevent visualization from exceeding the SVG width/height.
const scale = d3.scaleLinear(); // linear scale (usually used with quantitative data)

// set a domain and range
scale.domain([250, 500]);
scale.range([10, 150]);


const output = scale(50);

d3.select("section")
  .append("h2")
  .text(output);

// const svg = d3.select("section")
//               .append("svg")
//               .attr("width", WIDTH) // svg width
//               .attr("height", HEIGHT) // svg height


// svg.selectAll("rect")
//    .data(dataset)
//    .enter()
//    .append("rect")
//    .attr("width", 25) // rect width
//    .attr("height", d => d * M) // rect height (set bar height to data value - multiplied by data scale constants)
//    .attr("x", (d, i) => i * 30) // set each bar coordinates (using the width + 5 for space)
//    .attr("y", d => HEIGHT - M * d) // Inverting svg element by accounting for both the height of the bar and the total height of the SVG area
//    .attr("fill", "blue") // set the color of the bars
//    .attr("class", "bar")  // add  a bar class to rect
//    .append("title") // add toolip element
//    .attr("id", "tooltip") 
//    .text(d => d) // toolip data



// // Labels Setup      
// svg.selectAll("text")
//    .data(dataset)
//    .enter()
//    .append("text")
//    .text(d => d)
//    .attr("x", (d, i) => i * 30) // same as the rect
//    .attr("y", d => HEIGHT - (d * 3) - M)
//    .attr("font-size", 20 + "px");



// d3.select("section").selectAll("h2")
//   .data(dataset)
//   .enter()
//   .append("div")
//   .attr("class", "bar")
//   .style("height", (d) => (d * 10 + "px"))

