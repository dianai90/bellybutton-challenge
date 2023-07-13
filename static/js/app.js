
 function init() {

    d3.json('samples.json').then((sampleData) => {
    
    console.log(sampleData);

    //Drop down menu
    let everyId = sampleData.names;
    everyId.forEach((idNumber) => {d3.select('#selDataset').append('option').text(idNumber)});


 
    // create initial charts
     charts(everyId[0])

    })

};

//Charts
function charts(searchId) {

    d3.json('samples.json').then((sampleData) => {

    var searchData = sampleData.samples.filter(person => person.id == searchId)[0];
    var searchMetaData = sampleData.metadata.filter(person => person.id == searchId)[0];


    let metadatab = d3.select('#sample-metadata').html("");
    for (key in searchMetaData) {
        metadatab.append('h5').text(`${key}: ${searchMetaData[key]}`)
    };



    // Data Values for charts
    var sValues = searchData.sample_values;
    var otIds = searchData.otu_ids;
    var otlabel = searchData.otu_labels;

    //Top 10 Data values
    var t10SampleV = sValues.slice(0, 10).reverse(); 
    var t10OtuIds = otIds.slice(0, 10).reverse();
    var t10OtuLabels = otlabel.slice(0, 10).reverse();

    // Creating Bar Chart
    let barChart = [{
        x: t10SampleV,
        y: t10OtuIds.map(x => `OTU  ${x}`),
        text: t10OtuLabels,
        type: 'bar',
        orientation: 'h'
    }];
    Plotly.newPlot('bar', barChart);

     // Creating Bubble Chart
     let bubbleChart = [{
        x: otIds,
        y: sValues,
        text: otlabel,
        mode: 'markers',
        marker: {
            size: sValues,
            color: otIds,
            colorscale: 'Bluered'
        }

    }];
    let layout = {
        height: 600,
        width: 1000,
        xaxis: {
            title: 'OTU ID'
        }
    };
    Plotly.newPlot('bubble', bubbleChart, layout)

    // End of block
    })

};


// Updating plot
function optionChanged(id) {
    charts(id)
};


init();