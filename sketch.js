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
    if (!ball.failed) {
        if (ball.playing) {
            if ((frameCount - ball.startingFrame) % frameFreq == 0) {
                pipes.push(new Pipe(random(padding, height - padding)));
            }
        } else {
            text("Press SPACE to start.", width / 2, height / 3);
        }
    } else {
        noStroke();
        fill(255, 0, 0);
        textStyle(BOLD);
        textSize(30);
        text("GAME OVER.", width / 2, height / 2);
        textSize(15);
        text("You scored: " + score.score, width / 2, height / 2 + 50);
    }

    for (let pipe of pipes) {
        pipe.update(ball);
        pipe.show();
        ball.tally(pipe, score);
        if (ball.checkCollision(pipe)) {
            for (let p of pipes) {
                p.moving = false;
            }
            break;
        }

        // remove pipes every so often
        if (pipe.x + pipe.w + 10 < 0 && pipes.length > 50) {
            pipes.splice(pipes.indexOf(pipe), 40);
            continue;
        }
    }
}

function keyPressed() {
    if (key === " ") {
        ball.flap();
    }
}
