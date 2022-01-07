const WIDTH = 800;
const HEIGHT = 500;

// Space between the SVG boundary and the plot
const PADDING = 40;

const URL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

fetch(URL)
    .then(res => res.json())
    .then(dataset => {
        const {data} = dataset;
        
        // create a new array of year, gdp and date.
        createSVG(data.map(d => [d[0].split("-")[0], d[1], d[0]]));
    });

const createSVG = (dataset) => {
    const BarWidth = (WIDTH - 2 * PADDING) / dataset.length;

    // SVG Canvas
    const svg = d3.select("section")
    .append("svg")
    .attr("width", WIDTH)
    .attr("height", HEIGHT);

    // Data scales to prevent visualization from exceeding the SVG width/height.
    xMin = d3.min(dataset, d => d[0]);
    xMax = d3.max(dataset, d => d[0]);
    const xScale = d3.scaleLinear().domain([xMin, xMax]);
    xScale.range([PADDING, WIDTH - PADDING]);

    yMax = d3.max(dataset, (d) => d[1]);
    const yScale = d3.scaleLinear().domain([0, yMax])
    yScale.range([HEIGHT - PADDING, PADDING]);
                         
    // Improve visualization by adding Axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Rendering the axes using g element
    svg.append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${HEIGHT - PADDING})`)
    .call(xAxis);

    svg.append("g")
    .attr("id", "y-axis")
    .attr("transform", `translate(${PADDING}, 0)`)
    .call(yAxis);

    svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("width", BarWidth) 
    .attr("height", d => HEIGHT - yScale(d[1]))
    .attr("x", (d, i) => (i * BarWidth) + PADDING)
    .attr("y", d => yScale(d[1]) - PADDING)
    .attr("class", "bar") 
    .attr("data-date", d => d[2]) 
    .attr("data-gdp", d => d[1]) 
    .attr("index", (d, i) => i)
    .append("title") 
    .attr("id", "tooltip") 
    .text(d => "$" + d[1] + " Billion");
}
