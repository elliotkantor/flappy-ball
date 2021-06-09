/// <reference path="/Users/elliotkantor/Documents/Coding/javascript/p5js/TSDef/p5.global-mode.d.ts" />
"use strict";

let ball;
let pipes = [];
let frameFreq = 70;
let score;
let padding = 150;
let y_locs = [];

// function newPipe() {
//     // add a new random y location
//     // can only be delta pixels from the last location
//     padding;
//     let delta = 250;
//     let last_loc = y_locs[y_locs.length - 1];
//     let upper = min(padding, last_loc - random(delta));
//     let lower = min(height - padding, last_loc + random(delta));

//     // new pipe height is in random valid range
//     y_locs.push(random(lower, upper));
//     let new_loc = y_locs[y_locs.length - 1];
//     // add new pipe to list
//     pipes.push(new Pipe(new_loc));
// }

function setup() {
    y_locs = [random(padding, height - padding)];
    createCanvas(400, 600);
    ball = new Ball();
    score = new Scoreboard();
    y_locs.push(random(padding, height - padding));
    pipes.push(new Pipe(y_locs[y_locs.length - 1]));
    // newPipe();
}

function draw() {
    background(51);
    ball.update();
    ball.show();
    score.show();
    if (pipes.length > 0) {
        if (frameCount % frameFreq == 0) {
            y_locs.push(random(padding, height - padding));
            pipes.push(new Pipe(y_locs[y_locs.length - 1]));
            // newPipe();
        }
    }
    for (let pipe of pipes) {
        pipe.update();
        pipe.show();
        ball.tally(pipe, score);
    }
}

function keyPressed() {
    if (key === " ") {
        ball.flap();
    }
}
