# srt-parser [![build status][1]][2]

Parse srt subtitle files

## Example

Make sure your subtitle files comply with the [SubRip file format][3]

    var srt = require("srt")

    srt(fileName, function (err, data) {
        /* data looks like
        {
            "1": {
                "startTime": 20000
                , "endTime": 24000
                , "text": "Altocumulus clouds occur between six thousand"
                , number: 1
            }
            , "2": {
                "startTime": 24600
                , "endTime": 27800
                , "text": "and twenty thousand feet above ground level."
                , "number": 2
            }
            , ...
            , "subtitle number": {
                "startTime": "subtitle start time"
                , "endTime": "subtitle end time"
                , "text": "text of subtitle"
                , "number": "number of the subtitle"
            }
        }
        */
    })

The file in the above example contained

    1
    00:00:20,000 --> 00:00:24,400
    Altocumulus clouds occur between six thousand

    2
    00:00:24,600 --> 00:00:27,800
    and twenty thousand feet above ground level.

## String example

    var src = require("srt").fromString
        , srtString = fs.readFileSync(fileName)

    // returns same data structure as above
    var data = srt(strString)


## Installation

`npm install srt`

## Tests

`make test`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/srt-parser.png
  [2]: http://travis-ci.org/Raynos/srt-parser
  [3]: http://en.wikipedia.org/wiki/SubRip