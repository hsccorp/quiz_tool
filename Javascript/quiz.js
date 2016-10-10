var countdownTimer = null;
var currentQuestion = -1;
var currentRound = 1;
var questions = getQs();

function clearAll() {
    document.getElementById("q_txt").textContent = "";
    var vid = document.getElementById("video1");
    vid.pause();
    var aud = document.getElementById("audio1");
    aud.pause();

    $("#audioVideoDiv").hide();
    $("#optionsDiv").hide();
    $("#imageTimerDiv").hide();

    if (countdownTimer) {
        countdownTimer.destroy();
        countdownTimer = null;
    }

    // Clean up the options
    $(".optionText").text("");
    $(".optionText").removeClass("correct");
}

function getQs (){
    return window['question' + currentRound];
};

function playTimeupSound(){
    var aud = document.getElementById("audioCtrl");
    aud.src = "AV/timeup.mp3";
    aud.play();
}

function showAnswer(){
    if (currQ){
        if (currQ.options){
            $("#option" + currQ.answer).addClass("correct");
        }
        else {
            $("#option1").text(currQ.answer);
            $("#optionsDiv").show();
            $("#option1").addClass("correct");
        }
    }
}

timerDefaults = {
    delayToFadeIn: 500,
    size: 400,
    fontColor: 'black',
    fontSize: 100,
    colorCircle: 'white',
    background: '#2ECC71',
    reverseLoading: true,
    end: function(){playTimeupSound();}
};



$(document).ready(function() {
    // Hide the AV/image/timer/Q text/options divs
    clearAll();

    document.getElementById('video1').addEventListener('ended',videoEndHandler,false);
    function videoEndHandler(e) {
        console.log("video ended");
        // Hide the player
        $("#video1").hide();
    }

    $('#play').click(function() {
        if (currQ.type === "video"){
            $("#audioVideoDiv").show();
            var vid = document.getElementById("video1");
            vid.src = 'AV/' + currQ.av_file;
            vid.play();
        }
        else if (currQ.type === "audio"){
            var aud = document.getElementById("audio1");
            aud.src = 'AV/' + currQ.av_file;
            aud.play();
        }
        else if (currQ.type === "image"){
            var img = document.getElementById("image1");
            img.src = 'AV/' + currQ.av_file;
            $("#imageTimerDiv").show();
            $("#image1").show();
            $("#imageDiv").attr("class", "col-lg-7 col-sm-7");
            $("#image1").width($("#imageDiv").width());
        }
        else {
            // do nothing for text Q
        }
    });

    $('#showQ').click(function() {
        document.getElementById("q_txt").textContent = currQ.Q;
    });

    $('#options').click(function() {
        if (currQ.options) {
            $("#option1").text('A. ' + currQ.options[0]);
            $("#option2").text('B. ' + currQ.options[1]);
            $("#option3").text('C. ' + currQ.options[2]);
            $("#option4").text('D. ' + currQ.options[3]);
            $("#optionsDiv").show();
        }
    });

    $('#timerb').click(function() {
        if (countdownTimer) {
            countdownTimer.destroy();
            countdownTimer = null;
        }
        //Start the countdown timer
        if(currQ.type !== "image"){
            timerDefaults.size = 400;
            $("#image1").hide();
            $("#imageDiv").attr("class", "col-lg-4 col-sm-4");
        }
        else{
            timerDefaults.size = 350;
            $("#imageDiv").attr("class", "col-lg-7 col-sm-7");
        }
        timerDefaults.duration = {
            seconds: currQ.time
        };
        $("#imageTimerDiv").show();
        // Run the countdown
        countdownTimer = $('.timer').circularCountDown(timerDefaults);
    });

    $('#pass').click(function() {
        if (countdownTimer) {
            countdownTimer.destroy();
            countdownTimer = null;
        }
        timerDefaults.duration = {
            seconds: currQ.pass_time
        };
        // Run the countdown
        countdownTimer = $('.timer').circularCountDown(timerDefaults);
    });

    $('#clear').click(function() {
        clearAll();
    });

    $('#nextQ').click(function() {
        
        currentQuestion++;
        currQ = questions[currentQuestion];
    });

    $('#answer').click(function() {
        showAnswer();
    });

    $('#right').click(function() {
        if (countdownTimer) {
            countdownTimer.destroy();
            countdownTimer = null;
        }
        var aud = document.getElementById("audioCtrl");
        aud.src = "AV/correctAnswer.mp3";
        aud.play();
        
        showAnswer();
    });

    $('#wrong').click(function() {
        if (countdownTimer) {
            countdownTimer.destroy();
            countdownTimer = null;
        }
        var aud = document.getElementById("audioCtrl");
        aud.src = "AV/wrongAnswer.mp3";
        aud.play();
    });


    $('#nextRd').click(function() {
        currentRound++;
        questions = getQs();
        currentQuestion = 0;
        currQ = questions[currentQuestion];
    });
});

