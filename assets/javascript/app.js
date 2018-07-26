$(document).ready(function(){
    var gameStart = false;
    var gameTimer = 120;
    var gameBody = $(".gameBody");
    var timerBox = $("<div class = 'timer'>");
    var questions = {
        questionOne : {
            question : "Who is Spongebob's best friend?",
            choices: ["Patrick", "Gary", "Arthur", "Boof"],
            answer : "Patrick"
        },
        questionTwo : {
            question : "What was Tommy's (from Rugrats) last name?",
            choices: ["Cucumbers", "Pickles", "Eggplants", "Beets"],
            answer : "Pickles"
        },
        questionThree : {
            question: "How many bears are there in We Bare Bears?",
            choices: ["Four", "Six", "Three", "Ten"],
            answer : "Three"
        }
        
    } 
    
    objSize = Object.keys(questions).length;
    

    function timeDown() {
        gameTimer -= 1;
        $(".timer").html("<h2>" + gameTimer + "</h2>");
    }

    function fillQuestions() {
        for (var prop in questions) { 
            for (i = objSize-1; i < objSize; i++) {
                var obj = questions[prop];
                var objChoices = obj.choices;
                var qDiv = $("<div class = 'question'>");
                $(".gameBody").append(qDiv);
                qDiv.append(obj.question);
                var formElem = $("<form>");
                qDiv.append(formElem);
                for (j = 0; j < objChoices.length; j++) {
                    console.log(objChoices[j]);
                    var inputElem = $("<input type = 'radio' name = 'answer' id = 'radio-choice" + j + "'><label for = 'radio-choice" + j + "'>");
                    formElem.append(inputElem);
                    inputElem.append(objChoices[j]);
                }
                
            }
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





