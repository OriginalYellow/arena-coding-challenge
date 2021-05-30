const readArtistsString = require('./readArtistsString')

const {
    getArtistLists,
    getArtistCounts,
    getFinalResult,
    processArtistsString
} = require('./processArtistsString')

const getArtistListsResult = require('./mocks/getArtistListsResult')
const getArtistCountsResult = require('./mocks/getArtistCountsResult')

// printMemory copied from https://www.valentinog.com/blog/node-usage/
const logMemoryUsage = (label) => {
    const used = process.memoryUsage();

    var logString = ':'
    
    for (let key in used) {
        logString += `\n${key}: ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`
    }

    console.log(label, logString);
}

const logTimeEllapsed = (func, label) => {
    console.time(label)
    func()
    console.timeEnd(label)
}

const logPerf = (func, label) => {
    logTimeEllapsed(func, label)
    logMemoryUsage(label)
}

describe('getArtistLists', () => {
    test(`
    should convert string containing artist lists into a 2D array.
    `, async () => {
        const artistsString = await readArtistsString('/Artist_lists_short.txt')
        logPerf(
            () => expect(getArtistLists(artistsString)).toMatchSnapshot(),
            expect.getState().currentTestName
        )
    })
})

describe('getArtistCounts', () => {
    test(`
    should convert 2D array containing artist lists into a map of artist 
    names to the index of the list they each appear in.
    `, async () => {
        logPerf(
            () => expect(getArtistCounts(getArtistListsResult)).toMatchSnapshot(),
            expect.getState().currentTestName
        )
    })
})

describe('getFinalResult', () => {
    test(`
    should convert map of artist names and index of the list they each
    appear in into the final result (a map where each key is a pair that
    satisfies the requirement explained in assignment description).
    `, async () => {
        logPerf(
            () => expect(getFinalResult(5)(getArtistCountsResult)).toMatchSnapshot(),
            expect.getState().currentTestName
        )
    })
})

describe('processArtistsString', () => {
    test(`
    should convert a string containing artist lists into csv-formatted
    string containing the final result
    `, async () => {
        const artistsString = await readArtistsString('/Artist_lists_short.txt')

        logPerf(
            () => expect(processArtistsString(5)(artistsString)).toMatchSnapshot(),
            expect.getState().currentTestName
        )
    })
})