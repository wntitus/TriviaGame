$(document).ready(function(){

    // declaring our global variables - one for the game timer, a var for the div that will be added, a var for the submit button
    // that will be added, variables to hold the amount correct and incorrect, and a box to display the results, as well as
    // an object for our questions that will be dynamically filled
    
    var gameStart = false;
    var gameTimer = 75;
    var timerBox = $("<div class = 'timer'>");
    var submitBtn = $("<button type = 'button' id = 'submitBtn'>");
    var resetBtn = $("<button type = 'button' id = 'resetBtn'>");
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
            question: "Which one of these is NOT a name of a Fairly Oddparent or their son?",
            choices: ["Kipper", "Cosmo", "Wanda", "Poof"],
            answer : "Kipper"
        },
        questionFive : {
            question: "What was originally going to be Mickey Mouse's name?",
            choices: ["Marvin", "Mouseman", "Moogle", "Mortimer"],
            answer : "Mortimer"
        },
        questionSix: {
            question : "When Spongebob had a seahorse, what did he name it?",
            choices : ["Weesnaw", "Mystery", "Gary", "Jelly"],
            answer : "Mystery"
        },
        questionSeven: {
            question: "True or false: Disney reacquired the rights to Oswald the Lucky Rabbit by trading a sportscaster to NBC for them.",
            choices: ["True", "False"],
            answer: "True"
        },
        questionEight: {
            question: "What does Ariel from The Little Mermaid use to brush her hair?",
            choices: ["Brush", "Shell", "Bones", "Fork"],
            answer: "Fork"
        },
        questionNine: {
            question: "What series features a feline and canine who are joined in the middle?",
            choices: ["FelineCanine", "CatDog", "Cronenberged", "WoofMan"],
            answer: "CatDog"
        },
        questionTen: {
            question: "Fill in the blank: 'I'm Dirty ___! No, I\'M Dirty ___!'",
            choices: ["Boy", "Dude", "Bob", "Dan"],
            answer: "Dan"
        }
        
        
    } 

    // setting the length of our object to a variable for later use
    
    objSize = Object.keys(questions).length;

    // global function that will start the timer countdown
    // and will remove the questions and add a certain message if time runs out before answers are submitted

    function timeDown() {
        if (gameTimer > 0) {
            gameTimer -= 1;
            $(".timer").html("<h2>" + gameTimer + "</h2>");
        } else if (gameTimer === 0) {
            checkAnswers();
            clearInterval();
            $(".question").detach();
            $("#submitBtn").detach();
            $(timerBox).detach();
            $(".gameBody").append(resultsBox);
            $(".results").html("You ran out of time! You got: " + correct + " correct and " + incorrect + " incorrect!");
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

    // a function to loop through our object and check the answer property of each question against the selected answer,
    // and adds one to either correct or incorrect for each question
    
    function checkAnswers() {
        for (var prop in questions) {
            for (i = objSize-1; i < objSize; i++) {
                var obj = questions[prop];
                var objAns = obj.answer;
                var checkCheck = $("#radio-choice_" + objAns).prop("checked");
                if (checkCheck === true) {
                    correct++;
                } else if (checkCheck === false) {
                    incorrect++;
                }
            }
        }
    }

    //function to populate our game itself for when the start or reset buttons are clicked

    function gameFill() {
        if (gameStart === true) {
            clearInterval(timerInt);
            var timerInt = setInterval(timeDown, 1000);
        } 
        fillQuestions();
        $(".gameBody").append(submitBtn);
        $(submitBtn).text("Submit your answers!");
        $("#submitBtn").on("click", function() {
            clearInterval(timerInt);
            checkAnswers();
            $(".question").detach();
            $(timerBox).detach();
            $("#submitBtn").detach();
            $(".gameBody").append(resultsBox);
            $(".results").html("You got: " + correct + " correct and " + incorrect + " incorrect!");
            $(resultsBox).append(resetBtn);
            $(resetBtn).text("Restart!");
            gameStart = false;
    })
    }
    
    
    //adding functionality when we click the start button, removes the start button and starts timer function and the question 
    // fill function as well as adding the submit button at the bottom
    // also placing functionality for the submit button itself by checking answers, detaching all content, and then displaying
    // the player's results


    $("#playBtn").on("click", function() {
        gameStart = true;
        $("h1").text("Time to play!");
        $(".gameBody").append(timerBox);
        $(".timer").html("<h2>" + gameTimer + "</h2>");
        $("#playBtn").detach();
        gameFill();
    })

    //functionality for when the dynamic reset button is clicked - using document.on because the button is dynamically added
    //with jquery

    $(document).on("click", "#resetBtn", function() {
        $(resultsBox).detach();
        $(resetBtn).detach();
        gameStart = true;
        gameTimer = 75;
        correct = 0;
        incorrect = 0;
        $(".gameBody").append(timerBox);
        $(".timer").html("<h2>" + gameTimer + "</h2>");
        gameFill();
})

})



