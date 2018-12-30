"use strict"
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//snow info
var snowList;
var snowNumber = 20;
var minRadius = 5;
var maxRadius = 20;
var color = "rgba(255, 255, 255,0.9)";

InitializeSnow();
//main loop
function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    MoveAllSnow();
    drawAllSnow();
}

//==========================================================================================
//Draw Snow
//==========================================================================================
//initialize the snows and give them position
function InitializeSnow()
{
    snowList = [];
    //intialize snow
    for(var x = 0; x < snowNumber; ++x)
    {
        var xPos = Math.random() * canvas.width;
        var yPos = Math.random() * canvas.height;
        var snowRadius = Math.random() * (maxRadius - minRadius) + minRadius;
        var snow = {x: xPos, y: yPos, radius: snowRadius, downSpeed: GetDownSpeed()};
        snowList[x] = snow;
    }
}

function drawAllSnow()
{
    for(var x = 0; x < snowList.length; ++x)
    {
        var snow = snowList[x];
        drawASnow(snow.x, snow.y, snow.radius);
    }
}

function drawASnow(x, y, radius)
{
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.closePath();
    ctx.fill();
}

//==========================================================================================
//Animation
//==========================================================================================
var mouseX = 0;
var windStrength = 7;//how much snow moves on horizontal

document.addEventListener("mousemove", UpdateMousePos);

function GetDownSpeed()
{
    return 0.5 + Math.random() * 2;
}

function MoveAllSnow()
{
    for(var x = 0; x < snowList.length; ++x)
    {
        var snow = snowList[x];
        MoveASnow(snow);
    }
}

function MoveASnow(snow)
{
    //move snow down
    snow.y += snow.downSpeed;
    //if too low, recalculate position
    if(snow.y > canvas.height + 10)
    {
        snow.y = -10;
        snow.x = Math.random() * canvas.width;
        snow.downSpeed = GetDownSpeed();
    }
    //move snow x
    snow.x += (mouseX - screen.width/2)/screen.width * windStrength;
    //x overflow
    if(snow.x > canvas.width + 20)
    {
        snow.x = -10;
    }else if(snow.x < -20)
    {
        snow.x = canvas.width + 10;
    }
}

function UpdateMousePos(e)
{
    mouseX = e.clientX - canvas.offsetLeft;
}

setInterval(draw, 10);