var test = require("testling")
    , srt = require("..").fromString
    , testData =
        "1\n" +
        "00:00:20,000 --> 00:00:24,400\n" +
        "Altocumulus clouds occur between six thousand\n" +
        "\n" +
        "2\n" +
        "00:00:24,600 --> 00:00:27,800\n" +
        "and twenty thousand feet above ground level.\n" +
        "\n"

test("srt fromString function", function (t) {
    var data = srt(testData)

    t.equal(typeof data, "object", "result is not an object")
    t.equal(Object.keys(data).length, 2, "data does not have two keys")

    var one = data[1]
        , two = data[2]

    t.equal(one.startTime, 20000, "start time is incorrect [one]")
    t.equal(one.endTime, 24400, "end time is incorrect [one]")
    t.equal(one.text, "Altocumulus clouds occur between six thousand",
        "text is incorrect [one]")
    t.equal(one.number, 1, "number is incorrect [one]")

    t.equal(two.startTime, 24600, "start time is incorrect [two]")
    t.equal(two.endTime, 27800, "end time is incorrect [two]")
    t.equal(two.text, "and twenty thousand feet above ground level.",
        "text is incorrect [two]")
    t.equal(two.number, 2, "number is incorrect [two]")

    t.end()
})