$(function() {
    $('#submit').click(function() {
        var LUIS_PROGRAMMATIC_ID = "9dc7cf3da7dd4e32bc0ca66db202b5d9";
        var query = $("#query").val();
        var params = {
            "q": query,
            "timezoneOffset": "0",
            "verbose": "false",
            "staging": "false"
        };
        var url = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/5e69d719-6d5d-4b66-9683-b1ff4ec7a26b?" + $.param(params);
        $('#url').text(url);
        $.ajax({
                url: url,
                beforeSend: function(xhrObj) {
                    // Request headers
                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", LUIS_PROGRAMMATIC_ID);
                },
                type: "GET",
                // The request body may be empty for a GET request
                //data: "{body}"
            })
            .done(function(data) {
                //var intent = JSON.parse(JSON.stringify(data)).topScoringIntent.intent;
                //var score = JSON.parse(JSON.stringify(data)).topScoringIntent.score;
                var pretty = JSON.stringify(JSON.parse(JSON.stringify(data)).topScoringIntent, null, 2);
                $("#response").text(pretty);
            })
            .fail(function(data) {
                var pretty = JSON.stringify(JSON.parse(JSON.stringify(data)), null, 2);
                $("#response").text(pretty);
            });
    });
});
