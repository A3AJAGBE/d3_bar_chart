const WIDTH = 800;
const HEIGHT = 500;

// Space between the SVG boundary and the plot
const PADDING = 40;

const URL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

fetch(URL)
    .then(res => res.json())
    .then(dataset => {
        const {data} = dataset;
    
        createSVG(data);
    });

const createSVG = (dataset) => {


    // Data scales to prevent visualization from exceeding the SVG width/height.
    // const xScale = d3.scaleLinear()
    // xScale.domain([0, d3.max(dataset, (d) => d[0])])
    // xScale.range([PADDING, WIDTH - PADDING]);

    const yScale = d3.scaleLinear()
    yScale.domain([0, d3.max(dataset, (d) => d[1])])
    yScale.range([0, HEIGHT]);

    // // Improve visualization by adding Axes
    // const xAxis = d3.axisBottom(xScale);
    // const yAxis = d3.axisLeft(yScale);

    // Rendering the axes using g element
    // svg.append("g")
    // .attr("id", "x-axis")
    // .attr("transform", "translate(0, " + (HEIGHT - PADDING) + ")")
    // .call(xAxis);

    // svg.append("g")
    // .attr("id", "y-axis")
    // .attr("transform", "translate( " + PADDING + ",0)")
    // .call(yAxis);

    const BarWidth = WIDTH / dataset.length;

    const svg = d3.select("section")
                  .append("svg")
                  .attr("width", WIDTH)
                  .attr("height", HEIGHT);

    svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("width", BarWidth) 
    .attr("height", d => yScale(d[1]) + "px")
    .attr("x", (d, i) => i * BarWidth)
    .attr("y", d => HEIGHT - yScale(d[1]))
    .attr("fill", "blue") 
    .attr("class", "bar") 
    .append("title") 
    .attr("id", "tooltip") 
    .text(d => "$" + d[1] + " Billion");
}
