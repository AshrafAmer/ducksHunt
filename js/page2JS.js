function random(min, max) {
    let minNum = Math.floor(min);
    let maxNum = Math.floor(max);
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}
function createElement(tagName) {
    return document.createElement(tagName);
}
/* ----------------------------------------- Start Mohamed Farag ------------------------------------------- */
function createImg(position, source, ducks, color, level) {
    let increase;
    let timeSpeed;
    if (level === "level-1") {
        increase = 10;
        timeSpeed = 20;
    } else {
        increase = 15;
        timeSpeed = 10;
    }
    let scrWidth = $(window).width();
    let duck = $("<img />", {
        id: color,
        class: `duck ${color} target fly`,
        src: `../images/${source}`
    });
    if (position === 0) {
        $(duck).css({
            transform: "rotateY(180deg)",
            left: "-200px",
            top: random(0, parseInt($(ducks).height()) - 200) + "px"
        });
        let move = setInterval(function() {
            $(duck).css("left", `+=${increase}px`);
            if (parseInt($(duck).css("left")) > scrWidth) {
                $(duck).remove();
                clearInterval(move);
            }
        }, timeSpeed);
    } else {
        $(duck).css({
            right: "-200px",
            top: random(0, parseInt($(ducks).height()) - 200) + "px"
        });
        let move = setInterval(function() {
            $(duck).css("right", `+=${increase}px`);
            if (parseInt($(duck).css("right")) > scrWidth) {
                $(duck).remove();
                clearInterval(move);
            }
        }, timeSpeed);
    }
    $(duck).prependTo($(ducks));
}
/* ----------------------------------------- end Mohamed Farag ------------------------------------------- */
// start Ashraf
let moveBomb;
function bombInterval(ducks) {
    /* Bomb Code */
    let scrHeight = $(window).height();
    moveBomb = setInterval(function() {
        //Creation
        let bombImg = $(
            `<img class="bomb target" style="left:${Math.random() * 1000}px">`
        );
        bombImg.attr("src", "../images/bomb.png");
        bombImg.appendTo(ducks);
        let move = setInterval(function() {
            //Move
            bombImg.css("top", "+=1px");
            if (
                parseInt(bombImg.css("top") + bombImg.css("width")) > scrHeight
            ) {
                bombImg.remove();
                clearInterval(move);
            }
        }, 1); //bombs
    }, 15000); //[endCode]
}
// end Ashraf
/* ----------------------------------------- Start Mohamed Farag ------------------------------------------- */
function interval(ducks, name, _levelType, _player, _score) {
    // start Ashraf
    let startScore = _score;
    let currentPlayerName = _player;
    let levelType = _levelType;
    // end Ashraf
    // Start Mohamed sabry elnagar
    let minute;
    let second;
    let speed;
    if (levelType === "level-1") {
        minute = 1;
        second = 0;
        speed = 1000;
    } else {
        minute = 2;
        second = 0;
        speed = 300;
    }
    // end Mohamed sabry elnagar

    let imgSource = ["duckWhite.gif", "duckBlack.gif", "duckGold.gif"];
    let moveDucks = setInterval(function() {
        let position = random(0, 1);
        let randomColor = random(0, 2);
        switch (randomColor) {
            case 0:
                createImg(position, imgSource[0], ducks, "white", levelType);
                break;
            case 1:
                createImg(position, imgSource[1], ducks, "black", levelType);
                break;
            case 2:
                createImg(position, imgSource[2], ducks, "gold", levelType);
                break;
            default:
            // code block
        }
    }, speed);
    // Start Mohamed sabry elnagar
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
            /* Start Ashraf */
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
                                    if (levelType === "level-2") {
                                        bombInterval(ducks);
                                    }
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
            /* end Ashraf */
        }
    }, 1000);
    // End Mohamed sabry elnagar
}
/* ----------------------------------------- end Mohamed Farag ------------------------------------------- */
window.addEventListener("load", function() {
    // start Mohamed sabry elnagar
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
    ducks.style.width = $(window).width() + "px";
    ducks.style.height = $(window).height() - 91 + "px";
    window.addEventListener("resize", function() {
        ducks.style.width = $(window).width() + "px";
        ducks.style.height = $(window).height() - 91 + "px";
    });
    swal(
        {
            title: "Are you ready to start ?!",
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
                            timer.innerText = "Timer 01 : 00";
                            interval(
                                ducks,
                                search.playerName,
                                objStrLevel,
                                objStrPlayerName,
                                search.score
                            );
                            if (objStrLevel === "level-2") {
                                timer.innerText = "Timer 02 : 00";
                                bombInterval(ducks);
                            }
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
            // end Mohamed sabry elnagar
        }
    );
    /* ----------------------------------------- Start Mohamed Farag ------------------------------------------- */
    ducks.addEventListener("mousedown", function(e) {
        let target = e.target;
        // start Mohamed sabry elnagar
        audio.currentTime = 0;
        audio.play();
        // end Mohamed sabry elnagar
        if (target.classList[0] === "duck") {
            duckDie(target, score);
            // click on bomb
        } else if (target.classList[0] === "bomb") {
            // get near Ducks
            let nearDucks = $("img.duck");
            let bombLeft = parseInt($(e.target).css("left"));
            let bombTop = parseInt($(e.target).css("top"));
            // let bombWidth = parseInt($(e.target).css("width"));
            // let bombHeight = parseInt($(e.target).css("height"));

            for (let i = 0; i < nearDucks.length; i++) {
                let duckLeft = parseInt($(nearDucks[i]).css("left"));
                // let duckWidth = parseInt($(nearDucks[i]).css("width"));
                // let duckHeight = parseInt($(nearDucks[i]).css("height"));
                let duckTop = parseInt($(nearDucks[i]).css("top"));
                // console.log(
                //     Math.abs(bombLeft - duckLeft),
                //     Math.abs(bombTop - duckTop),
                //     Math.abs(duckLeft - bombLeft),
                //     Math.abs(duckTop - bombTop)
                // );
                if (
                    Math.abs(bombLeft - duckLeft) < 50 || // left
                    Math.abs(bombTop - duckTop) < 50 || // top
                    Math.abs(duckLeft - bombLeft) < 50 || //right
                    Math.abs(duckTop - bombTop) < 50 // bottom
                ) {
                    duckDie(nearDucks[i], score);
                }
            }
            // start Mohamed sabry elnagar
            audioExplosion.currentTime = 0;
            audioExplosion.play();
            // end Mohamed sabry elnagar
            $(target).attr("src", "../images/bombAfter.png");
            $(target).addClass("bombAfter");
            setTimeout(function() {
                $(target).remove();
            }, 500);
        }
        // end Ashraf
        // start Mohamed sabry elnagar
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
        // end Mohamed sabry elnagar
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
    // end Mohamed sabry elnagar
}
/* ----------------------------------------- End Mohamed Farag ------------------------------------------- */
