var test = require("tap").test
    , srt = require("..")
    , path = require("path")
    , correctData = require("./fixtures/testFile.json")

test("test srt data from file", function (t) {
    srt(path.join(__dirname, "fixtures", "testFile.srt"), assertResults)

    function assertResults(err, data) {
        t.equal(err, null, "error is not null")

        t.deepEqual(correctData, data, "data is incorrect")

        t.end()
    }
})