const newman = require('newman'); // require newman in your project
const jsonexport = require('jsonexport');
const fs = require('fs');
const config = require("./config/config");
const envJson = require("./config/" + config.envFile);

envJson.values = envJson.values.map(valueObj => {
    if (valueObj.key === 'email') {
        valueObj.value = process.argv[2];
    }
    return valueObj
})

// STEP 3: Writing to a file 
fs.writeFile("./config/" + config.envFile, JSON.stringify(envJson), err => {

    // Checking for errors 
    if (err) throw err;

    console.log("Done env file update now starting script run"); // Success 
    // call newman.run to pass `options` object and wait for callback
    newman.run({
        collection: require('./config/' + config.collectionFile),
        environment: './config/' + config.envFile,
        reporters: 'cli'
    }, function (err) {
        if (err) { throw err; }
        console.log('collection run complete!');
    }).on('done', function (err, summary) {
        if (err || summary.error) {
            console.error('collection run encountered an error.');
        }
        else {
            if (summary.environment.values.reference.excelExportData.value) {
                var exportData = JSON.parse(summary.environment.values.reference.excelExportData.value)
                jsonexport(exportData, function (err, csv) {
                    if (err) return console.error(err);
                    console.log(csv);
                    fs.writeFileSync('./exportedFiles/' + config.exportFileName, csv, 'binary');
                    console.log('Users Exported Successfully');
                });
            }
            else {
                fs.writeFileSync('./exportedFiles/' + config.exportFileName, "", 'binary');
            }
        }
    });
});