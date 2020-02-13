function random(min, max) {
    let minNum = Math.floor(min);
    let maxNum = Math.floor(max);
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}
function createElement(tagName) {
    return document.createElement(tagName);
}
function reverse(position, duck, ducks) {
    let increase = 10;
    let timeSpeed = 10;
    duck.classList.remove("d-none");
    if (position === 0) {
        duck.style.transform = "rotateY(180deg)";
        duck.style.left = "-200px";
        duck.style.top = random(0, parseInt(ducks.style.height) - 200) + "px";
        let move = setInterval(function() {
            duck.style.left = parseInt(duck.style.left) + increase + "px";
            if (parseInt(duck.style.left) > window.innerWidth) {
                clearInterval(move);
            }
        }, timeSpeed);
    } else {
        duck.style.right = "-200px";
        duck.style.top = random(0, parseInt(ducks.style.height) - 200) + "px";
        let move = setInterval(function() {
            duck.style.right = parseInt(duck.style.right) + increase + "px";
            if (parseInt(duck.style.right) > window.innerWidth) {
                clearInterval(move);
            }
        }, timeSpeed);
    }
}

function interval(ducks, name, _levelType, _player, _score) {
    let minute = 1;
    let second = 0;
    let speed = 0;
    let startScore = _score;
    let currentPlayerName = _player;
    let levelType = _levelType;
    if (levelType === "level-1") {
        speed = 500;
    } else if (levelType === "level-2") {
        speed = 850;
        var moveBomb = setInterval(function() {
            //Creation
            let bombImg = $(
                `<img class="bomb" style="right:${Math.random() * 1000}px;">`
            );
            bombImg.attr("src", "../images/bomb.png");
            bombImg.appendTo(ducks);

            bombImg.on("click", function() {
                bombImg.attr("src", "../images/bombAfter.png");
                bombImg.addClass("bombAfter");
                setTimeout(function() {
                    bombImg.remove();
                }, 150);
            });

            if (bombImg) {
                setTimeout(function() {
                    bombImg.remove();
                }, 5000);
            }
        }, 15000);

        setInterval(function() {
            //Move
            $(".bomb").css("top", "+=1px");
        }, 1); //bombs [endCode]
    }
    let moveDucks = setInterval(function() {
        let position = random(0, 1);
        let duck = createElement("img");
        let randomColor = random(0, 2);
        let newDuck = "";
        duck.style.position = "absolute";
        switch (randomColor) {
            case 0:
                newDuck = $("#white").clone(true);
                reverse(position, newDuck[0], ducks);
                ducks.append(newDuck[0]);
                break;
            case 1:
                newDuck = $("#black").clone(true);
                reverse(position, newDuck[0], ducks);
                ducks.append(newDuck[0]);
                break;
            case 2:
                newDuck = $("#gold").clone(true);
                reverse(position, newDuck[0], ducks);
                ducks.append(newDuck[0]);
                break;
            default:
            // code block
        }
        setTimeout(function() {
            newDuck[0].remove();
        }, 2000);
    }, speed);
    let timers = setInterval(function() {
        second--;
        if (second >= 0) {
            if (second < 10) {
                if (minute < 10) {
                    timer.innerText = `Timer 0${minute} : 0${second}`;
                } else {
                    timer.innerText = `Timer ${minute} : 0${second}`;
                }
            } else {
                if (minute < 10) {
                    timer.innerText = `Timer 0${minute} : ${second}`;
                } else {
                    timer.innerText = `Timer ${minute} : ${second}`;
                }
            }
        } else {
            if (minute >= 0 && second < 0) {
                minute--;
                second = 59;
                if (minute < 10) {
                    timer.innerText = `Timer 0${minute} : ${second}`;
                } else {
                    timer.innerText = `Timer ${minute} : ${second}`;
                }
            }
        }
        if (minute <= 0 && second <= 0) {
            console.log(minute + " : " + second);
            timer.innerText = `Timer 0${minute} : 0${second}`;
            clearInterval(timers);
            clearInterval(moveDucks);
            if (levelType === "level-2") {
                clearInterval(moveBomb);
            }

            /* Check Winner */
            let currentScore = JSON.parse(localStorage.getItem("player")).find(
                function(item) {
                    return (
                        item.playerName === currentPlayerName &&
                        item.level === levelType
                    );
                }
            ).score;

            if (currentScore - startScore >= 200) {
                //winner
                startScore = currentScore;
                $(function() {
                    let winnerAudio = document.getElementById("winner");
                    winnerAudio.currentTime = 0;
                    winnerAudio.play();
                });
            } else {
                //loser
                startScore = currentScore;
                $(function() {
                    let loser = document.getElementById("loser");
                    loser.currentTime = 0;
                    loser.play();
                });
            }
            swal(
                {
                    title: "Do you want to play again?",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonClass: "btn-primary",
                    cancelButtonClass: "btn-danger",
                    confirmButtonText: "Yes, play again",
                    cancelButtonText: "No, back to menu",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm) {
                    if (isConfirm) {
                        swal(
                            {
                                title: "Let's Play Again",
                                type: "success",
                                confirmButtonClass: "btn-primary",
                                confirmButtonText: "OK",
                                closeOnConfirm: true
                            },
                            function(isConfirm) {
                                if (isConfirm) {
                                    interval(
                                        ducks,
                                        name,
                                        levelType,
                                        currentPlayerName,
                                        startScore
                                    );
                                }
                            }
                        );
                    } else {
                        swal(
                            {
                                title: "See You Later " + name,
                                type: "warning",
                                confirmButtonClass: "btn-primary",
                                confirmButtonText: "OK",
                                closeOnConfirm: true
                            },
                            function(isConfirm) {
                                if (isConfirm) {
                                    $("#backToMenu")[0].click();
                                }
                            }
                        );
                    }
                }
            );
        }
    }, 1000);
}
window.addEventListener("load", function() {
    let namePlayer = document.getElementById("namePlayer");
    let level = document.getElementById("level");
    let scoreText = document.getElementById("scoreText");
    let score = document.getElementById("score");
    let ducks = document.getElementById("ducks");
    let audio = document.getElementById("audio");
    let audioExplosion = document.getElementById("audio2");
    let timer = document.getElementById("timer");
    let objStr = localStorage.getItem("player");
    let objStrPlayerName = localStorage.getItem("playerName");
    let objStrLevel = localStorage.getItem("level");
    let obj = JSON.parse(objStr);

    let search = obj.find(function(item) {
        return (
            item.playerName === objStrPlayerName && item.level === objStrLevel
        );
    });
    ducks.style.width = window.innerWidth + "px";
    ducks.style.height = window.innerHeight - 91 + "px";
    window.addEventListener("resize", function() {
        ducks.style.width = window.innerWidth + "px";
        ducks.style.height = window.innerHeight - 91 + "px";
    });
    swal(
        {
            title: "Are You ready to start?!",
            type: "info",
            showCancelButton: true,
            confirmButtonClass: "btn-primary",
            cancelButtonClass: "btn-danger",
            confirmButtonText: "Yes, continue",
            cancelButtonText: "No, back to menu",
            closeOnConfirm: false,
            closeOnCancel: false
        },
        function(isConfirm) {
            if (isConfirm) {
                swal(
                    {
                        title: "Welcome " + search.playerName,
                        text: "Let's Play",
                        type: "success",
                        confirmButtonClass: "btn-primary",
                        confirmButtonText: "OK",
                        closeOnConfirm: true
                    },
                    function(isConfirm) {
                        if (isConfirm) {
                            namePlayer.innerText = search.playerName;
                            level.innerText = search.level;
                            scoreText.innerText = "Score ";
                            score.innerText = search.score;
                            timer.innerText = "Timer 02 : 00";
                            interval(
                                ducks,
                                search.playerName,
                                objStrLevel,
                                objStrPlayerName,
                                search.score
                            );
                        }
                    }
                );
            } else {
                swal(
                    {
                        title: "See You Later " + search.playerName,
                        type: "warning",
                        confirmButtonClass: "btn-primary",
                        confirmButtonText: "OK",
                        closeOnConfirm: true
                    },
                    function(isConfirm) {
                        if (isConfirm) {
                            $("#backToMenu")[0].click();
                        }
                    }
                );
            }
        }
    );
    ducks.addEventListener("mousedown", function(e) {
        audio.currentTime = 0;
        audio.play();
        console.log(e.target.classList[0]);
        if (e.target.classList[0] === "duck") {
            duckDie(e.target, score);
            // click on bomb
        } else if (e.target.classList[0] === "bomb") {
            // get near Ducks
            let nearDucks = $("img.duck");
            for (let i = 0; i < nearDucks.length; i++) {
                let duckLeft = parseInt($(nearDucks[i]).css("left"));
                let duckWidth = parseInt($(nearDucks[i]).css("width"));
                let duckHeight = parseInt($(nearDucks[i]).css("height"));
                let duckTop = parseInt($(nearDucks[i]).css("top"));
                let bombLeft = parseInt($(e.target).css("left"));
                let bombTop = parseInt($(e.target).css("top"));
                let bombWidth = parseInt($(e.target).css("width"));
                let bombHeight = parseInt($(e.target).css("height"));
                if (
                    bombLeft - (duckLeft + duckWidth) <= 50 || // left
                    bombTop - (duckTop + duckHeight) <= 50 || // top
                    duckLeft - (bombLeft + bombWidth) <= 50 || //right
                    duckTop - (bombTop + bombHeight) <= 50 // bottom
                ) {
                    duckDie(nearDucks[i], score);
                }
            }
            audioExplosion.currentTime = 0;
            audioExplosion.play();
        }
        let objNew = {
            playerName: namePlayer.innerText,
            level: level.innerText,
            score: score.innerText
        };
        let searchItem = obj.findIndex(function(item) {
            return (
                item.playerName === objStrPlayerName &&
                item.level === objStrLevel
            );
        });
        console.log(searchItem);
        obj[searchItem] = objNew;
        let objString = JSON.stringify(obj);
        localStorage.setItem("player", objString);
    });
});

function duckDie(ducks, score) {
    let heightScr = $(window).height();
    ducks.src = "../images/die.png";
    ducks.style.width = "200px";
    let die = setInterval(function() {
        $(ducks).css("top", "+=10px");
        if (parseInt(ducks.style.top) > heightScr) {
            $(ducks).remove();
            clearInterval(die);
        }
    }, 10);
    // start Mohamed sabry elnagar
    switch (ducks.classList[1]) {
        case "white":
            score.innerText = parseInt(score.innerText) + 5;
            break;
        case "black":
            score.innerText = parseInt(score.innerText) - 10;
            break;
        case "gold":
            score.innerText = parseInt(score.innerText) + 10;
            break;
        default:
        // code block
    }
}
