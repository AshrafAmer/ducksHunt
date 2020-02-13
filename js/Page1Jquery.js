function createElement(tagName) {
    return document.createElement(tagName);
}
$(document).ready(function() {
    let startPlay = document.getElementById("startPlay");
    let level = document.querySelectorAll("input[class='level']");
    let levelValue = "level-1";
    let playerName = document.getElementById("playerName");
    let audio = document.getElementById("audio");
    let search;
    let arr = [];
    for (let i = 0; i < level.length; i++) {
        level[i].addEventListener("change", function(e) {
            levelValue = e.target.value;
        });
    }
    startPlay.addEventListener("click", function() {
        let isValid = playerName.value.match("^[a-zA-Z0-9]+$");
        console.log(isValid);
        if (isValid == null) {
            event.preventDefault();
            let span = $("<span />", { class: "messageError" });
            span.appendTo("#error");
            span.text("please enter your name just characters and numder");
            span.show(2000)
                .delay(3000)
                .hide(2000)
                .remove();
        } else {
            let obj = {
                playerName: playerName.value,
                level: levelValue,
                score: 0
            };
            let getPlayers = localStorage.getItem("player");
            let playerObj = JSON.parse(getPlayers);
            if (getPlayers !== null) {
                arr = playerObj;
                search = playerObj.find(function(item) {
                    return (
                        item.playerName === playerName.value &&
                        item.level === levelValue
                    );
                });
                localStorage.setItem("playerName", playerName.value);
                localStorage.setItem("level", levelValue);
            }
            console.log(search);
            console.log(arr);
            if (search === undefined) {
                arr.push(obj);
                let objString = JSON.stringify(arr);
                localStorage.setItem("playerName", playerName.value);
                localStorage.setItem("level", levelValue);
                localStorage.setItem("player", objString);
            }
        }
    });
    document.body.addEventListener("mouseup", function(e) {
        audio.currentTime = 0;
        audio.play();
        let img = createElement("img");
        img.style.position = "absolute";
        img.src = "images/22.png";
        img.style.width = "30px";
        img.style.height = "30px";
        img.style.left = e.x - 15 + "px";
        img.style.top = e.y - 15 + "px";
        document.body.appendChild(img);
        setTimeout(function() {
            img.remove();
        }, 2000);
    });
});
