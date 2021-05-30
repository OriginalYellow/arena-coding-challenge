const { promises } = require('fs')

const readFile = promises.readFile

const readArtistsString = relPath => {
    const path = process.cwd() + relPath;
    return readFile(path, 'utf8');
}

module.exports = readArtistsString