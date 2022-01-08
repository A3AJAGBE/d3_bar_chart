const WIDTH = 800;
const HEIGHT = 500;
const MARGIN = 40;

const TOOLTIP = d3.select("section")
                    .append("div")
                    .attr("id", "tooltip")
                    .attr('opacity', 0);

const OVERLAY = d3.select("section")
                   .append("div")
                   .attr("class", "overlay")
                   .attr('opacity', 0);


const svg = d3.select("section")
                .append("svg")
                .attr("width", WIDTH + (2 * MARGIN))
                .attr("height", HEIGHT + MARGIN);

const URL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

fetch(URL)
    .then(res => res.json() )
    .then(dataset => {
        const {data} = dataset;
        // console.log(data);

        const DateInfo = data.map( d => {
            let month =  d[0].split("-")[1];
            let quarter = "";
    
            if (month === '01') {
                quarter = 'Q1';
            } else if (month === '04') {
                quarter = 'Q2';
            } else if (month === '07') {
                quarter = 'Q3';
            } else if (month === '10') {
                quarter = 'Q4';
            }
        
            return `${month}  ${quarter}`;
        });

        const newDate = data.map(d => { 
            return new Date(d[0]);
        });

        const getGDP =  data.map(d => {
            return d[1];
        });

        // Data scale to prevent visualization from exceeding the SVG width/height.
        xMin = d3.min(newDate);
        xMax = new Date(d3.max(newDate));
        const xScale = d3.scaleTime().domain([xMin, xMax]);
        xScale.range([MARGIN, WIDTH]);

        yMax = d3.max(getGDP);
        const yScale = d3.scaleLinear().domain([0, yMax])
        yScale.range([HEIGHT, 0]);

        // Improve visualization by adding Axes
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        // Rendering the axes using g element
        svg.append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(0, ${HEIGHT})`)
        .call(xAxis);

        svg.append("g")
        .attr("id", "y-axis")
        .attr("transform", `translate(${MARGIN}, 0)`)
        .call(yAxis);

        // Get the scaled gdp for y-axis
        const GDPLinearScale = d3.scaleLinear().domain([0, yMax]);
        GDPLinearScale.range([0, HEIGHT]);

        const getScaledGDP = getGDP.map(d => {
            return GDPLinearScale(d);
        });
        // console.log(getScaledGDP);

        const BarWidth = WIDTH / getScaledGDP.length;

        svg.selectAll("rect")
            .data(getScaledGDP)
            .enter()
            .append("rect")
            .attr("width", BarWidth) 
            .attr("height", d => d)
            .attr("x", (d, i) => xScale(newDate[i]))
            .attr("y", d => HEIGHT - d)
            .attr("class", "bar") 
            .attr("data-date", (d, i) => data[i][0]) 
            .attr("data-gdp", (d, i) => data[i][1]) 
            .attr("index", (d, i) => i)
    });