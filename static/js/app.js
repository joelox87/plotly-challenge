// Use the D3 library to read in samples.json.
d3.json("samples.json").then(function createPlotly(data) {
    console.log(data);
    var testid = data.names;
    console.log(testid);
  
