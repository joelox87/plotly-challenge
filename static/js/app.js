// Read samples.json file using D3
d3.json("samples.json").then(function createPlotly(data) {
    console.log(data);
    var testid = data.names;
    console.log(testid);
  
 // Dropdown menu Setup
 d3.select("#selDataset")
 .selectAll("option")
 .data(testid)
 .enter()
 .append("option")
 .html(function(d) {
   return `<option>${d}</option`;
 });
 
 