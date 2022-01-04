const URL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

fetch(URL)
    .then(res => res.json())
    .then(dataset => {
        const {data} = dataset;
        const BarWidth = WIDTH/data.length;

        createSVG(data, BarWidth);
    });

const WIDTH = 900;
const HEIGHT = 500;

// Space between the SVG boundary and the plot
const PADDING = 40;

const createSVG = (dataset, BarWidth) => {

    const svg = d3.select("section")
    .append("svg")
    .attr("width", WIDTH)
    .attr("height", HEIGHT)

    svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("width", BarWidth) 
    .attr("height", d => d[1] + "px")
    .attr("x", (d, i) => i * (BarWidth + 2))
    .attr("y", d => HEIGHT - d[1])
    .attr("fill", "blue") 
    .attr("class", "bar") 
    .append("title") 
    .attr("id", "tooltip") 
    .text(d => "$" + d[1] + " Billion");

    // Data scales to prevent visualization from exceeding the SVG width/height.
    const xScale = d3.scaleLinear()
    xScale.domain([0, d3.max(dataset, (d) => d[0])])
    xScale.range([PADDING, WIDTH - PADDING]);

    const yScale = d3.scaleLinear()
    yScale.domain([0, d3.max(dataset, (d) => d[1])])
    yScale.range([HEIGHT - PADDING, PADDING]);

    // Improve visualization by adding Axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Rendering the axes using g element
    svg.append("g")
    .attr("id", "x-axis")
    .attr("transform", "translate(0, " + (HEIGHT - PADDING) + ")")
    .call(xAxis);

    svg.append("g")
    .attr("id", "y-axis")
    .attr("transform", "translate( " + PADDING + ",0)")
    .call(yAxis);
}

// // Labels Setup      
// svg.selectAll("text")
//    .data(dataset)
//    .enter()
//    .append("text")
//    .text(d => d)
//    .attr("x", (d, i) => i * 30) // same as the rect
//    .attr("y", d => HEIGHT - (d * 3) - M)
//    .attr("font-size", 20 + "px");


/* Tests */
// svg.selectAll("circle")
//   .data(dataset)
//   .enter()
//   .append("circle")
//   .attr("cx", (d) => xScale(d[0]))
//   .attr("cy", (d) => yScale(d[1]))
//   .attr("r", 5);

// svg.selectAll("text")
//   .data(dataset)
//   .enter()
//   .append("text")
//   .text((d) =>  (d[0] + ", " + d[1]))
//   .attr("x", (d) => xScale(d[0] + 10))
//   .attr("y", (d) => yScale(d[1]));

// d3.select("section").selectAll("h2")
//   .data(dataset)
//   .enter()
//   .append("div")
//   .attr("class", "bar")
//   .style("height", (d) => (d * 10 + "px"))

