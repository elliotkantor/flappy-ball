/// <reference path="/Users/elliotkantor/Documents/Coding/javascript/p5js/TSDef/p5.global-mode.d.ts" />
"use strict";

let ball;
let pipes = [];
let frameFreq = 70;
let score;
let padding = 150;

function setup() {
    createCanvas(400, 600);
    ball = new Ball();
    score = new Scoreboard();
    pipes.push(new Pipe(random(padding, height - padding)));
}

function draw() {
    background(51);
    ball.update();
    ball.show();
    score.show();
    if (ball.playing) {
        if ((frameCount - ball.startingFrame) % frameFreq == 0) {
            pipes.push(new Pipe(random(padding, height - padding)));
        }
    }
    for (let pipe of pipes) {
        pipe.update(ball);
        pipe.show();
        ball.tally(pipe, score);
    }
}

function keyPressed() {
    if (key === " ") {
        ball.flap();
    }
}
