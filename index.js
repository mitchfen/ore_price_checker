const fetch = require('node-fetch');
const chalk = require('chalk');

let ores = require('./JSON/ores.json'); // Load in the JSON file
let typeIDs = require('./JSON/typeIDs.json'); // These are the typeID's on EVEMarketer for HighSec ores

let regionLimit = '10000002'; // Value for "The Forge" - Jita trade hub

// Build up the URL from the typeIDs. 
let url = `https://api.evemarketer.com/ec/marketstat/json?regionlimit=${regionLimit}`
for(let i = 0; i < typeIDs.length; i++) {
    url = url + `&typeid=${typeIDs[i]}`
}

// Call async function 
getData();

// Fetch and parse data from API
async function getData() {
    let response = await fetch(url);
    let json = await response.json();
    //parseData(json);

    // Parse out the prices
    for(let i = 0; i < json.length; i++) {
        for(let j = 0; j < ores.length; j++) {
            // Get prices for non-compressed ores
            if(json[i].buy.forQuery.types[0] == ores[j].id) {
                ores[j].price = json[i].buy.wavg;
            } else if (json[i].buy.forQuery.types[0] == ores[j].compressed_id) {
                ores[j].compressed_price = json[i].buy.wavg;
            }
        }
    }
    calculateAndPrint();
}

function calculateAndPrint() {
    let bestOre = ores[0].name;
    let compressionGain = 0;
    
    // Bubble sort to find the best ore
    let bestPricePerM3 = ores[0].price / ores[0].volume;
    for(let i = 1; i < ores.length; i++) {
        if ((ores[i].price / ores[i].volume) > bestPricePerM3) {
            bestPricePerM3 = ores[i].price / ores[i].volume;
            bestOre = ores[i].name;

            // Calculate the % gained by compression.
            // 1 Compressed ore is composed of 100 units of normal ore. 
            compressionGain = (((ores[i].compressed_price / 100) - ores[i].price) / ores[i].price * 100).toFixed(2);
        }
    }

    // Print results to screen
    console.table(ores);
    console.log(
        'The most profitable ore to mine today is: ' + 
        chalk.green(bestOre) + 
        ' at ' + 
        chalk.green('%i ISK/m3'), bestPricePerM3);
    console.log(
        'You can compress it to increase profits by ' +
        chalk.yellow('%f%'), compressionGain);
    console.log();
}
