const R = require('ramda')

const mapIndexed = R.addIndex(R.map)

const getArtistLists = R.pipe(
    R.split('\n'),
    R.map(R.split(',')),
)

const getArtistCounts = artistLists => {
    const artistCounts = {};

    R.pipe(
        mapIndexed((x, i) => {
            return R.map(
                y => {
                    if (!artistCounts[y]) {
                        artistCounts[y] = []
                    };
                    
                    artistCounts[y].push(i)
                    
                    return y
                },
                x
            )
        })
    )(artistLists)

    return artistCounts;
} 

const getFinalResult = minCount => artistCounts => {
    // filtering the artist counts first is an optimization:
    const filteredArtistCounts = {};
    R.mapObjIndexed(
        (x, i) => {
            if (x.length >= minCount) {
                filteredArtistCounts[i] = x;
            }
        },
        artistCounts
    )
    
    const result = new Map()

    R.mapObjIndexed((x, i) => {
        R.mapObjIndexed((y, j) => {
            if (i === j) return;

            const matchCount = R.intersection(x, y).length

            if (matchCount > minCount) {
                result.set(new Set([i, j]), true)
            }
        }, filteredArtistCounts)
    }, filteredArtistCounts)

    return result
}

const formatFinalResult = finalResult => {
    var ret = '';
    
    for (const pair of finalResult.keys()) {
        const entriesArr = []
        
        for (const entry of pair.entries()) {
            entriesArr.push(entry[0]);
        }

        ret += `${entriesArr[0]},${entriesArr[1]}\n`
    }

    return ret;
}

const processArtistsString = minCount => R.pipe(
    getArtistLists,
    getArtistCounts,
    getFinalResult(minCount),
    formatFinalResult
);

module.exports = {
    getArtistLists,
    getArtistCounts,
    getFinalResult,
    formatFinalResult,
    processArtistsString
}