let leftCount = 0;
$(function() {
    setInterval(function() {
        leftCount -= 15;
        if (leftCount < -490) leftCount = window.innerWidth;
        // console.log(leftCount, window.innerWidth);
        $("#birds").css("left", leftCount + "px");
    }, 250); //birds
}); //load
