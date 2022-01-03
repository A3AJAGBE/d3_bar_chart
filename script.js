// const URL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const WIDTH = 500;
const HEIGHT = 500;

const dataset = [
    [ 34,    78 ],
    [ 109,   280 ],
    [ 310,   120 ],
    [ 79,    411 ],
    [ 420,   220 ],
    [ 233,   145 ],
    [ 333,   96 ],
    [ 222,   333 ],
    [ 78,    320 ],
    [ 21,    123 ]
  ];

// Space between the SVG boundary and the plot
const PADDING = 20;

// Data scales to prevent visualization from exceeding the SVG width/height.
const xScale = d3.scaleLinear()
xScale.domain([0, d3.max(dataset, (d) => d[0])])
xScale.range([PADDING, WIDTH - PADDING]);

const yScale = d3.scaleLinear()
yScale.domain([0, d3.max(dataset, (d) => d[1])])
yScale.range([HEIGHT - PADDING, PADDING]);

const output = yScale(411);

d3.select("section")
  .append("h2")
  .text(output);

// const svg = d3.select("section")
//               .append("svg")
//               .attr("width", WIDTH) // svg width
//               .attr("height", HEIGHT) // svg height

// const M = 3; // constant that scales the data points.

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

