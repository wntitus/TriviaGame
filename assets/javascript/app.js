$(document).ready(function(){
    var gameStart = false;
    var gameTimer = 120;
    var gameBody = $(".gameBody");
    var timerBox = $("<div class = 'timer'>");
    var questions = 
        [{
            question : "Who is Spongebob's best friend?",
            answer : "Patrick"
        },{
            question : "What was Tommy's (from Rugrats) last name?",
            answer : "Pickles"
        }];
    

    function timeDown() {
        gameTimer -= 1;
        $(".timer").html("<h2>" + gameTimer + "</h2>");
    }

    function fillQuestions() {
        for (i = 0; i < questions.length; i++) {
            var questionP = $("<p>");
            questionP.append(questions[i].question);
            gameBody.append(questionP);
        }
    }    
    




    $("#playBtn").on("click", function() {
        gameStart = true;
        $("h1").text("Time to play!");
        $(".gameBody").append(timerBox);
        $(".timer").html("<h2>" + gameTimer + "</h2>");
        $("#playBtn").detach();
        if (gameTimer > 0) {
            setInterval(timeDown, 1000);
        } 
        fillQuestions();
             
        






    })
})





