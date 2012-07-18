var SECOND = 1000
    , MINUTE = 60 * SECOND
    , HOUR = 60 * MINUTE
    , fs = require("fs")
    , partial = require("ap").partial

srt.fromString = fromString

module.exports = srt

function srt(fileName, callback) {
    fs.readFile(fileName, partial(returnParsedData, callback))
}

function returnParsedData(callback, err, data) {
    if (err) {
        return callback(err)
    }

    callback(null, fromString(data.toString()))
}

function fromString(stringData) {
    var segments = stringData.split("\n\n")
    return segments.reduce(createSrtData, {})
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

    memo[number] = {
        number: number
        , startTime: startTime
        , endTime: endTime
        , text: text
    }

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