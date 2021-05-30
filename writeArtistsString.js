const { promises } = require('fs')

const writeFile = promises.writeFile

const writeArtistsString = (artistsString, fileName) => {
    writeFile(fileName, artistsString)
}

module.exports = writeArtistsString