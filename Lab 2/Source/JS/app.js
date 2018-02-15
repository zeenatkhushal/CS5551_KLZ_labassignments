
var app=angular.module('myapp',[]);
app.controller('mycontroller',function ($scope) {
    $scope.onSignIn=function (googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); 
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); 
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
    }
});


var x=angular.module('mashup',[])
x.controller('mycont',function ($scope,$http) {
    $scope.fuck=function () {
        var i = $scope.input;
        var z = i.replace(" ", "+");
        var handler = $http.get("https://kgsearch.googleapis.com/v1/entities:search?query=" + z + "&key=AIzaSyA1Sy0t-uNoi-9pnR5ETJnTBGDNvoi6YhE&limit=1&indent=True")
        handler.success(function (data) {
            if (data != null) {
           
                $scope.final = {
                    "name": data.itemListElement[0].result.name,
                    "disc": data.itemListElement[0].result.description,
                    "link": data.itemListElement[0].result.image.url,
                    "detailed": data.itemListElement[0].result.detailedDescription.articleBody,
                    "web": data.itemListElement[0].result.url,
                    "wiki": data.itemListElement[0].result.detailedDescription.url
                }
                document.getElementById('se').style.display = 'block';
            }
        })
        handler.error(function (data) {
         alert("There was some error processing your request. Please try after some time.");
    })

            

    $scope.translate=function (y) {
        var hand=$http.get("https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170206T054715Z.79fffb75ffe99e6e.ee7075626f5e0a731fc17fee095054467a4c665c&text="+y+"&lang=hi&callback=");
        hand.success(function (res)
        {
            document.getElementById('lg').innerHTML="Language translate from Yandex API";
            document.getElementById('trans').innerHTML=res.text[0];
        })

    }
    $scope.voice=function (v) {
        responsiveVoice.speak(v);
    }
    $scope.sentiment=function (s) {
        var hit=$http.get("http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment"+
        "?apikey=1a271dd087dda99bbaffac46b977410122233493"+
        "&outputMode=json&text="+s);
        hit.success(function (data) {
            $scope.sent={
                "score":data.docSentiment.score,
                "type":data.docSentiment.type
            }
            document.getElementById('dis').style.display = 'block';
        })
    }

});
