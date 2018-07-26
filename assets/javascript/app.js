$(document).ready(function(){

    // declaring our global variables - one for the game timer, a var for the div that will be added, a var for the submit button
    // that will be added, and an object for our questions that will be dynamically filled
    
    var gameStart = false;
    var gameTimer = 5;
    var timerBox = $("<div class = 'timer'>");
    var submitBtn = $("<button type = 'button' id = 'submitBtn'>");
    var correct = 0;
    var incorrect = 0;
    var resultsBox = $("<div class = 'results'>");
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
        },
        questionFour : {
            question: "Which one of these is NOT a name of a Fairly Oddparent?",
            choices: ["Kipper", "Cosmo", "Wanda"],
            answer : "Kipper"
        }
        
    } 

    // setting the length of our object to a variable for later use
    
    objSize = Object.keys(questions).length;

    // global function that will start the timer countdown

    function timeOut() {
        clearInterval();
        (".question").detach();
        console.log(gameTimer);
    
    }
    

    function timeDown() {
        if (gameTimer > 0) {
            gameTimer -= 1;
            $(".timer").html("<h2>" + gameTimer + "</h2>");
        } else if (gameTimer === 0) {
            clearInterval();
            $(".question").detach();
            $("#submitBtn").detach();
            $(timerBox).detach();
            return;
        }
    }



    // global function that will dynamically fill in any questions we might add
    // loops through our object, then loops through the choices array in each object and appends both the question and its answers
    // as radio button choices to our HTML

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
                    var inputElem = $("<input type = 'radio' name = 'answer' id = 'radio-choice_" + objChoices[j] + "'><label for = 'radio-choice_" + objChoices[j] + "'>");
                    formElem.append(inputElem);
                    inputElem.append(objChoices[j]);
                }
                
            }
        }
    }


    
    function checkAnswers() {
        for (var prop in questions) {
            for (i = objSize-1; i < objSize; i++) {
                var obj = questions[prop];
                var objAns = obj.answer;
                var checkCheck = $("#radio-choice_" + objAns).prop("checked");
                console.log(checkCheck);
                if (checkCheck === true) {
                    correct++;
                } else if (checkCheck === false) {
                    incorrect++;
                }
                console.log(correct);
                console.log(incorrect);
            }
        }
    }
    
    
    //adding functionality when we click the start button, removes the start button and starts timer function and the question 
    // fill function as well as adding the submit button at the bottom


    $("#playBtn").on("click", function() {
        gameStart = true;
        $("h1").text("Time to play!");
        $(".gameBody").append(timerBox);
        $(".timer").html("<h2>" + gameTimer + "</h2>");
        $("#playBtn").detach();
        if (gameStart === true) {
            setInterval(timeDown, 1000);
        } 
        fillQuestions();
        $(".gameBody").append(submitBtn);
        $(submitBtn).text("Submit your answers!");
        $("#submitBtn").on("click", function() {
            clearInterval();
            checkAnswers();
            $(".question").detach();
            $(timerBox).detach();
            $("#submitBtn").detach();
            $(".gameBody").append(resultsBox);
            $(".results").html("You got: " + correct + " correct and " + incorrect + " incorrect!");
        })
    })

})





