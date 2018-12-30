"use strict"
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//main loop
function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnow()
{
    ctx.beginPath();
    ctx.rect(0,0, canvas.width/2, canvas.height/2);
    ctx.fillstyle = "black";
    ctx.closePath();
    ctx.fill();
}

setInterval(draw, 10);