 /* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.8,
  height = window.innerHeight * 0.75,
  margin = {
    top: 50,
    right: 25,
    bottom: 50,
    left: 75
  };

/*************/
/* LOAD DATA */
/*************/

d3.csv('../data/US_GNI_growth.csv', d => {
  return {
    Country: d.CountryName,
    Year: new Date(+d.Year, 0, 1),
    GNI: +d.GNIGrowth
  }
}).then(US_GNI => {
  console.log('data :>> ', US_GNI);
  
  /**********/
  /* SCALES */
  /**********/

  const xScale = d3.scaleTime()
    .domain(d3.extent(US_GNI, d => d.Year))
    .range([margin.left, width - margin.right])

    console.log('xScale.domain() :>> ', xScale.domain());
    console.log('xScale.range() :>> ', xScale.range());

  const yScale = d3.scaleLinear()
    .domain(d3.extent(US_GNI, d => d.GNI))
    .range([height - margin.bottom, margin.top])

    console.log('yScale.domain() :>> ', yScale.domain());
    console.log('yScale.range() :>> ', yScale.range());

  /****************/ 
  /* SVG ELEMENTS */
  /****************/

  // line chart svg
  const lineChart = d3.select("#lineChart")
    .append("svg")
    .attr("class", "lineChart")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "#ffffff")
    
  lineChart.append("text")
    .attr("class","title")
    .attr("x", (width / 3))
    .attr("y", (margin.top / 2))
    .text("U.S. GNI growth rate between 1971 and 2019")
    .style("font-size", "1.5em")
    .style("text-decoration", "underline")

  // area chart svg
  const areaChart = d3.select("#areaChart")
    .append("svg")
    .attr("class", "areaChart")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "#ffffff")
    
  areaChart.append("text")
    .attr("class","title")
    .attr("x", (width / 3))
    .attr("y", (margin.top / 2))
    .text("U.S. GNI growth rate between 1971 and 2019")
    .style("font-size", "1.5em")
    .style("text-decoration", "underline")
  
  /********/
  /* AXES */
  /********/

  /* xAxes */

  // for line chart
  lineChart.append("g")
      .attr("class", "x-axis")
      .style("transform", `translate(0px,${height - margin.bottom}px)`)
      .call(d3.axisBottom(xScale))

      lineChart.append("text")
      .attr("transform", "translate(" + (width / 2) + " ," + (height - margin.bottom * 0.2) + ")")
      .style("text-anchor", "middle")
      .text("Years");
 
  // for area chart
  areaChart.append("g")
      .attr("class", "x-axis")
      .style("transform", `translate(0px,${height - margin.bottom}px)`)
      .call(d3.axisBottom(xScale))

      areaChart.append("text")
      .attr("transform", "translate(" + (width / 2) + " ," + (height - margin.bottom * 0.2) + ")")
      .style("text-anchor", "middle")
      .text("Years");

  /* yAxes */

  // for line chart
  lineChart.append("g")
      .attr("class", "y-axis")
      .style("transform", `translate(${margin.left}px,0px)`)
      .call(d3.axisLeft(yScale))

    lineChart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", (margin.left/2))
        .attr("x", 0 - (height/2))
        .style("text-anchor", "middle")
        .text("GNI Growth rate (% annual)");

  // for area chart
  areaChart.append("g")
    .attr("class", "y-axis")
    .style("transform", `translate(${margin.left}px,0px)`)
    .call(d3.axisLeft(yScale))
  
  areaChart.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", (margin.left/2))
    .attr("x", 0 - (height/2))
    .style("text-anchor", "middle")
    .text("GNI Growth rate (% annual)");

  /****************************/
  /* LINE GENERATOR FUNCTION */
  /****************************/

  const lineGen = d3.line()
  .x(d => xScale(d.Year))
  .y(d => yScale(d.GNI))

  /***************************/
  /* AREA GENERATOR FUNCTION */
  /***************************/

 const areaGen = d3.area()
 .x(d => xScale(d.Year))      
 .y0(d => yScale(d.GNI))     
 .y1(d3.max(yScale.range()))

  const countriesMap = d3.group(US_GNI, d => d.Country)
  console.log('countriesMap :>> ', countriesMap);

  const countriesArray = Array.from(countriesMap)
  console.log('countriesArray :>> ', countriesArray);

  const countriesData =  countriesArray.map(([key, data]) => data)
  console.log('countriesData :>> ', countriesData);

/*************/
/* DRAW LINE */
/*************/

lineChart.selectAll(".line")
  .data(countriesData) 
  .join("path")
  .attr("class", 'line')
  .attr("fill", "none")
  .attr("stroke", "turquoise")
  .attr("stroke-width", 1.5)
  .attr("d", d => lineGen(d))

/*************/
/* DRAW AREA */
/*************/

areaChart.selectAll(".area")
 .data(countriesData) 
 .join("path")
 .attr("class", 'area')
 .attr("fill", "turquoise")
 .attr("stroke", "turquoise")
 .style("opacity", "45%")
 .attr("d", areaGen)



});