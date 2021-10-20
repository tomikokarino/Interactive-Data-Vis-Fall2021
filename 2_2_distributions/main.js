/* CONSTANTS AND GLOBALS */
const margin = {
  top: 50,
  right: 25,
  bottom: 70,
  left:50
};
const width = 1000 - margin.right - margin.left;
const height = 800 - margin.top - margin.bottom;

/*************/
/* LOAD DATA */
/*************/

d3.csv("../data/HDI.csv", d3.autoType)
  .then(HDI => {
    console.log(HDI)

    const svg = d3.select("#container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("margin-top", "50px")
      

    /**********/
    /* SCALES */
    /**********/

    const xScale = d3.scaleLinear()
      .domain(d3.extent(HDI, d => d.GNI_per_capita))
      .range([margin.left, width - margin.right])
      .nice()


    const yScale = d3.scaleLinear()
      .domain(d3.extent(HDI, d => d.Expected_Years_of_Education))
      .range([height - margin.bottom, margin.top])
      .nice()


    const rScale = d3.scaleLinear()
      .domain(d3.extent(HDI, d => d.HDI_score))
      .range([3,20])

    
    const colorScale = d3.scaleSequential()
      .domain(d3.extent(HDI, d => d.HDI_score))
      .interpolator(d3.interpolateRdYlGn)
      
    
  //  console.log('colorScale.range() :>> ', colorScale.range());
  //  console.log('colorScale.domain() :>> ', colorScale.domain());
    
    /***********/
    /* LEGENDS */
    /***********/
    
  const colorLegend = d3.legendColor()
      .scale(colorScale)
  
    /*****************/
    /* HTML ELEMENTS */
    /*****************/
    
    // Chart title //
   svg.append("text")
    .attr("class","title")
    .attr("x", (width * 0.2))
    .attr("y", 0 + (margin.top/2))
    .text("Human Development Index Score in relation to Education and GNI per capita")
    .style("font-size", "1.2em")
    .style("text-decoration", "underline")

    // X-axis
    svg.append("g")
      .attr("class", "x-axis")
      .style("transform", `translate(0px,${height - margin.bottom}px)`)
      .call(d3.axisBottom(xScale))

      svg.append("text")
      .attr("transform", "translate(" + (width / 2) + " ," + (height - (margin.bottom / 2)) + ")")
      .style("text-anchor", "middle")
      .text("Gross National Income (GNI) per capita (in US dollargs)"); 
    
    // Y-axis
    svg.append("g")
      .attr("class", "y-axis")
      .style("transform", `translate(${margin.left}px,0px)`)
      .call(d3.axisLeft(yScale))

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", (margin.left/2))
        .attr("x", 0 - (height/2))
        .style("text-anchor", "middle")
        .text("Expected Years of Education");

    // Color legend
    svg.append("g")
    .attr("class", "colorLegend")
    .attr("transform", "translate(800,85)")
    .call(colorLegend)

    svg.append("text")
    .attr("transform", "translate(800,75)")
    .text("HDI score")

    // Scatter plot

    // First add "g" so that circle and label are grouped
    svg.selectAll(".country")
      .data(HDI)
      .join("g")
      .attr("class", "country")
  
    // Append circle  
    svg.selectAll("g.country") 
      .append("circle")
      .attr("class", "dot")
      .attr("cx", d => xScale(d.GNI_per_capita))
      .attr("cy", d => yScale(d.Expected_Years_of_Education))
      .attr("r", d => rScale(d.HDI_score))
      .style("fill", d => colorScale(d.HDI_score))
      .style("fill-opacity", 0.7)
      
    // Then add HDI ranks as text label
    svg.selectAll("g.country")
    .append("text") 
    .attr("class", "label")
    .attr("x", d => xScale(d.GNI_per_capita))
    .attr("y", d => yScale(d.Expected_Years_of_Education))
    .text(d => (d.Country))
   
    
    

   
    
    
    


   
    


    

        
    
    
  });
