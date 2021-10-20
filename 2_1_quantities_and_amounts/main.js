/* CONSTANTS AND GLOBALS */
const margin = {
  top: 15,
  right: 25,
  bottom: 25,
  left: 75
};
const width = 750 - margin.right - margin.left;
const height = 600 - margin.top - margin.bottom;

/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', d3.autoType)
  .then(squirrelActivities => {
    //console.log(quirrelActivities)
    const svg = d3.select("#container")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("background-color", "#ffffff")
      .style("margin-top", "20px")
      
   
    /**********/   
    /* SCALES */
    /**********/   
    
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(squirrelActivities, d => d.count)])
      .range([margin.left,(width + margin.left + margin.right)])
    
      
    const yScale = d3.scaleBand()
      .domain(squirrelActivities.map(d => d.activity))
      .range([60, height - margin.top])
      .padding(.3);

    const colorScale = d3.scaleOrdinal()
      .domain(d3.extent(squirrelActivities, d => d.activity))
      .range(d3.schemeSet3)
    
    /*****************/  
    /* HTML ELEMENTS */
    /*****************/

    // Chart title //
   svg.append("text")
   .attr("class","title")
   .attr("x", (width * 0.5))
   .attr("y", 0 + margin.top)
   .text("Number of squirrel activities by activity type")
   .style("font-size", "1.2em")
   .style("text-decoration", "underline")


    // X-axis
     svg.append("g")
     .attr("class", "x-axis")
     .style("transform", `translate(0,${height - margin.top}px)`)
     .call(d3.axisBottom(xScale))

     svg.append("text")
     .attr("transform", "translate(" + (width / 2) + " ," + (height + (margin.top * 2)) + ")")
     .style("text-anchor", "middle")
     .text("The number of squirral activities"); 
   
   // Y-axis
   svg.append("g")
     .attr("class", "y-axis")
     .style("transform", `translate(${margin.left}px,0px)`)
     .call(d3.axisLeft(yScale))

   svg.append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", (margin.left/4))
       .attr("x", 0 - (height/2))
       .style("text-anchor", "middle")
       .text("Types of squirral activities");

    
    /* Horizontal bar chart */
    svg.selectAll(".bar")
      .data(squirrelActivities)
      .join("rect")
      .attr("class", "bar")
      .attr("y", d => yScale(d.activity))
      .attr("x", d => xScale(0))
      .attr("height", yScale.bandwidth())
      .attr("width", d => xScale(d.count))
      .attr("fill", d => colorScale(d.activity))
      
      
     

  })