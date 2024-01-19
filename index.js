// $(".btn").on("click",function(){
//     alert("hello Rohan!");
// });
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
})


$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length - 1);
    playSound(userChosenColour);
    animatePress(userChosenColour);
})

function playSound(name){
    let audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    let randIdx = Math.floor(Math.random() * 4);
    // console.log(randIdx);
    let randomChosenColour = buttonColours[randIdx];
    // console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => { 
        $("#"+currentColour).removeClass("pressed"); 
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(()=>{
                nextSequence();
                
            },1100);
        }
    }else{
        console.log("fail");
        let audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        startOver();
    }
}