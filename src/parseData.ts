// Parse the price data and store in ores object
export function parseData(priceData: any, ores: any) {
  // Parse out the prices
  for (let i = 0; i < priceData.length; i++) {
    for (let j = 0; j < ores.length; j++) {
      // Get prices for non-compressed ores
      if (priceData[i].buy.forQuery.types[0] == ores[j].id) {
        ores[j].price = priceData[i].buy.wavg;
      } else if (priceData[i].buy.forQuery.types[0] == ores[j].compressed_id) {
        ores[j].compressed_price = priceData[i].buy.wavg;
      }
    }
  }
}
