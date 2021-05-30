const { promises } = require('fs')

const readFile = promises.readFile

const readArtistsString = fileName => {
    const path = `${process.cwd()}/${fileName}`;
    return readFile(path, 'utf8');
}

module.exports = readArtistsString