const { processArtistsString } = require('./processArtistsString');
const readArtistsString = require('./readArtistsString');
const writeArtistsString = require('./writeArtistsString');

const main = async (inputFileName, outputFileName, minCount) => {
    console.log('inputFileName:', inputFileName)
    console.log('outputFileName:', outputFileName)
    console.log('minCount:', minCount)

    const artistsString = await readArtistsString(inputFileName)
    const processedString = processArtistsString(parseInt(minCount))(artistsString)
    return writeArtistsString(processedString, outputFileName)
}

main(process.argv[2], process.argv[3], process.argv[4])