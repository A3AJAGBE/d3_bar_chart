// const URL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const WIDTH = 800;
const HEIGHT = 500;
const PADDING = 40;

const dataset = [12, 31, 22, 17, 25, 18, 29, 14];

const svg = d3.select("section")
              .append("svg")
              .attr("width", WIDTH) // svg width
              .attr("height", HEIGHT) // svg height
              .append("rect")
              .attr("width", 25) // rect width
              .attr("height", 100) // rect height
              .attr("x", 0)
              .attr("y", 0)


// d3.select("section").selectAll("h2")
//   .data(dataset)
//   .enter()
//   .append("div")
//   .attr("class", "bar")
//   .style("height", (d) => (d * 10 + "px"))

