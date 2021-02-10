const fetch = require('node-fetch');
const boxen = require('boxen');
const chalk  = require('chalk');
let ores = require('./ores.json'); // Load in the JSON file

//`https://api.evemarketer.com/ec/marketstat/json?typeid=${type_id}&regionlimit=${region_limit}`;
typeids = [1230, 17470, 17471, 18, 17455, 17456, 28432, 28430, 28431, 28422, 28421, 28423]
let region_limit = '10000002'; // Value for "The Forge" - Jita trade hub
let url = `https://api.evemarketer.com/ec/marketstat/json?typeid=1230&typeid=17470&typeid=17471&typeid=18&typeid=17455&typeid=17456&typeid=28432&typeid=28430&typeid=28431&typeid=28422&typeid=28421&typeid=28423&regionlimit=10000002`

main(url);

// Get data from the API
async function main(url, options) {
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

    // Print prices to console
    console.log("\n-------------Non-compressed ores-------------");
    for(let i = 0; i < ores.length; i++) {
        console.log(ores[i].name + " --- " + ores[i].price)
    }
    console.log("\n-------------Compressed ores----------------");
    for(let i = 0; i < ores.length; i++) {
        console.log("Compressed " + ores[i].name + " --- " + ores[i].compressed_price)
    }
    let best_ore = ores[0].name;
    let best_price_per_m3 = ores[0].price / ores[0].volume;
    for(let i = 1; i < ores.length; i++) {
        if ((ores[i].price / ores[i].volume) > best_price_per_m3) {
            best_price_per_m3 = ores[i].price / ores[i].volume;
            best_ore = ores[i].name;
        }
    }
    console.log("\nThe best ore to mine is " + best_ore + " at " + best_price_per_m3 + " ISK/m3");
}
