var SECOND = 1000
    , MINUTE = 60 * SECOND
    , HOUR = 60 * MINUTE
    , fs = require("fs")
    , partial = require("ap").partial
    , iterators = require("iterators")
    , reduce = iterators.reduceSync
    , map = iterators.mapSync
    , slice = Array.prototype.slice
    , extend = require("xtend")

srt.fromString = fromString
srt.merge = merge

module.exports = srt

function srt(language, fileName, callback) {
    fs.readFile(fileName, partial(returnParsedData, language, callback))
}

function returnParsedData(language, callback, err, data) {
    if (err) {
        return callback(err)
    }

    callback(null, fromString(language, data.toString()))
}

function fromString(language, stringData) {
    var segments = stringData.split("\n\n")
    return reduce(segments, createSrtData, language, [])
}

function createSrtData(memo, string) {
    var lines = string.split("\n")

    if (lines.length < 3) {
        return memo
    }

    var number = parseInt(lines[0], 10)
        , times = lines[1].split(" --> ")
        , startTime = parseTime(times[0])
        , endTime = parseTime(times[1])
        , text = lines.slice(2).join("\n")
        , languages = {}

    languages[this] = text

    memo.push({
        number: number
        , startTime: startTime
        , endTime: endTime
        , languages: languages
    })

    return memo
}

function parseTime(timeString) {
    var chunks = timeString.split(":")
        , secondChunks = chunks[2].split(",")
        , hours = parseInt(chunks[0], 10)
        , minutes = parseInt(chunks[1], 10)
        , seconds = parseInt(secondChunks[0], 10)
        , milliSeconds = parseInt(secondChunks[1], 10)

    return HOUR * hours +
        MINUTE * minutes +
        SECOND * seconds +
        milliSeconds
}

function merge(srt) {
    var srts = slice.call(arguments)

    return reduce(srts, mixTogether)
}

function mixTogether(srtOne, srtTwo) {
    return map(srtOne, insertOtherSrtLanguage, srtTwo)
}

function insertOtherSrtLanguage(caption, index) {
    var otherSrt = this
        , otherCaptions = this[index]
        , languages = extend({}, caption.languages, otherCaptions.languages)

    return {
        startTime: caption.startTime
        , endTime: caption.endTime
        , number: caption.number
        , languages: languages
    }
}