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
 
// Read index from selected option from dropdown menu
var dropdownMenu = d3.select("#selDataset");
var dropdownValue = dropdownMenu.property("value");
var index = testid.indexOf(dropdownValue);

// Demographic information
d3.select("#sample-metadata").html("");
d3.select("#sample-metadata")
.selectAll("p")
.data(Object.entries(data.metadata[index]))
.enter()
.append("p")
.html(function(d) {
 return `${d[0]} : ${d[1]}`;
});

console.log(Object.entries(data.metadata[index]));

// Bar graph setup
var defaultsampleData = data.samples[index].sample_values
.slice(0, 10)
.reverse();
var defaultotuData = data.samples[index].otu_ids.slice(0, 10).reverse();
var defaultotuLabels = data.samples[index].otu_labels.slice(0, 10).reverse();
var defaultyxis = defaultotuData.map(a => "OTU" + a);

var bardata = [
{
 x: defaultsampleData,
 y: defaultyxis,
 type: "bar",
 orientation: "h",
 text: defaultotuLabels
}
];

var barLayout = {
title: "TOP10 Sample Values",
xaxis: { title: "Sample Values" },
yaxis: { title: "OTU ID" }
};

Plotly.newPlot("bar", bardata, barLayout);

// Bubble chart setup
var bubbleData = [
    {
     x: data.samples[index].otu_ids,
     y: data.samples[index].sample_values,
     mode: "markers",
     text: data.samples[index].otu_labels,
     marker: {
       size: data.samples[index].sample_values,
       color: data.samples[index].otu_ids,
       colorscale: "Viridis"
     }
    }
    ];
    
    var bubbleLabels = {
    title: "Bacteria Cultures Per Sample",
    xaxis: { title: "OTU ID" },
    yaxis: { title: "Sample Values" }
    };
    
    Plotly.newPlot("bubble", bubbleData, bubbleLabels);
    
    
});