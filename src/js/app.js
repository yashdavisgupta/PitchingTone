function getData(query) {
        console.log("In getData");
        var LUIS_PROGRAMMATIC_ID = "9dc7cf3da7dd4e32bc0ca66db202b5d9";
        var params = {
            "q": query,
            "timezoneOffset": "0",
            "verbose": "false",
            "staging": "false"
        };
        var url = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/5e69d719-6d5d-4b66-9683-b1ff4ec7a26b?" + $.param(params);
        $.ajax({
                url: url,
                beforeSend: function(xhrObj) {
                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", LUIS_PROGRAMMATIC_ID);
                },
                type: "GET",
            })
            .done(function(data) {
                var pretty = JSON.stringify(JSON.parse(JSON.stringify(data)).topScoringIntent, null, 2);
                $("#response").text(pretty);
            })
            .fail(function(data) {
                var pretty = JSON.stringify(JSON.parse(JSON.stringify(data)), null, 2);
                $("#response").text(pretty);
            });
}


$(document).ready(function start() {
    var r = document.getElementById("result");
    var t = document.getElementById("response");
    if ("webkitSpeechRecognition" in window) {
        var speechRecognizer = new webkitSpeechRecognition();
        speechRecognizer.continuous = true;
        speechRecognizer.interimResults = true;
        speechRecognizer.lang = "en-US";
        speechRecognizer.start();
        var finalTranscripts = "";
        speechRecognizer.onresult = function(event) {
            var interimTranscripts = "";
            for (var i = event.resultIndex; i < event.results.length; i++) {
                var transcript = event.results[i][0].transcript;
                transcript.replace("\n", "<br>");
                if (event.results[i].isFinal) {
                    results = getData(transcript);
                    console.log(transcript);
                    finalTranscripts += transcript;
                } else {
                    interimTranscripts += transcript;
                }
                r.innerHTML = finalTranscripts + '<span style="color: #999;">' + interimTranscripts + '</span>';
                t.innerHTML = results;
            }
        };
        speechRecognizer.onerror = function(event) {};
    } else {
        r.innerHTML = "Your browser does not support that.";
    }
}
)
