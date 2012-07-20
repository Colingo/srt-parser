var test = require("testling")
    , srt = require("..")
    , fromString = srt.fromString
    , merge = srt.merge
    , englishStringData = "1\n" +
        "00:00:20,000 --> 00:00:24,400\n" +
        "Altocumulus clouds occur between six thousand\n" +
        "\n" +
        "2\n" +
        "00:00:24,600 --> 00:00:27,800\n" +
        "and twenty thousand feet above ground level.\n" +
        "\n"
    , spanishStringData = "1\n" +
        "00:00:20,000 --> 00:00:24,400\n" +
        "Las nubes Altocumulus ocurren entre 6 mil\n" +
        "\n" +
        "2\n" +
        "00:00:24,600 --> 00:00:27,800\n" +
        "y 20 mil pies sobre el nivel del suelo.\n" +
        "\n"

test("srt fromString function", function (t) {
    var data = fromString("en", englishStringData)

    t.ok(Array.isArray(data), "result is not an array")
    t.equal(data.length, 2, "data does not have two keys")

    var one = data[0]
        , two = data[1]

    t.equal(one.startTime, 20000, "start time is incorrect [one]")
    t.equal(one.endTime, 24400, "end time is incorrect [one]")
    t.equal(one.languages.en, "Altocumulus clouds occur between six thousand",
        "text is incorrect [one]")
    t.equal(one.number, 1, "number is incorrect [one]")

    t.equal(two.startTime, 24600, "start time is incorrect [two]")
    t.equal(two.endTime, 27800, "end time is incorrect [two]")
    t.equal(two.languages.en, "and twenty thousand feet above ground level.",
        "text is incorrect [two]")
    t.equal(two.number, 2, "number is incorrect [two]")

    t.end()
})

test("srt merge function", function (t) {
    var englishData = fromString("en", englishStringData)
        , spanishData = fromString("es", spanishStringData)
        , data = merge(englishData, spanishData)

    t.ok(Array.isArray(data), "result is not an array")
    t.equal(data.length, 2, "data does not have two keys")

    var one = data[0]
        , two = data[1]

    t.equal(one.startTime, 20000, "start time is incorrect [one]")
    t.equal(one.endTime, 24400, "end time is incorrect [one]")
    t.equal(one.languages.en, "Altocumulus clouds occur between six thousand",
        "text is incorrect [one]")
    t.equal(one.languages.es, "Las nubes Altocumulus ocurren entre 6 mil",
        "spanish test is incorrect [one]")
    t.equal(one.number, 1, "number is incorrect [one]")

    t.equal(two.startTime, 24600, "start time is incorrect [two]")
    t.equal(two.endTime, 27800, "end time is incorrect [two]")
    t.equal(two.languages.en, "and twenty thousand feet above ground level.",
        "text is incorrect [two]")
    t.equal(two.languages.es, "y 20 mil pies sobre el nivel del suelo.",
        "spanish text is incorrect [two]")
    t.equal(two.number, 2, "number is incorrect [two]")

    t.end()
})