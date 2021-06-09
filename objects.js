class Ball {
    constructor() {
        this.y = height / 2;
        this.vel = 0;
        this.gravity = 0.75;
        this.x = width / 4;
        this.w = 30;
        this.playing = false;
        this.startingFrame = 0;
    }

    update() {
        if (this.playing) {
            this.vel += this.gravity;
            this.y += this.vel;
            if (this.y - this.w / 2 < 0) {
                this.y = this.w / 2;
                this.vel = 0;
            } else if (this.y + this.w / 2 > height) {
                this.y = height - this.w / 2;
            }
        }
    }
    show() {
        fill(255);
        ellipse(this.x, this.y, this.w);
    }

    flap() {
        this.vel = -15;
        if (!this.playing) {
            this.playing = true;
            this.startingFrame = frameCount;
        }
    }

    tally(other, score) {
        if (this.x > other.x && !other.scored) {
            other.scored = true;
            score.increment();
        }
    }
}

class Pipe {
    constructor(y) {
        this.x = width;
        this.vel = -5;
        this.w = 30;
        this.y = random(padding, height - padding);
        this.opening = 200;
        this.scored = false;
    }

    update(ball) {
        if (ball.playing) {
            this.x += this.vel;
        }
    }

    show() {
        fill(255);
        noStroke();

        // bottom
        let by = this.y + this.opening / 2;
        rect(this.x, by, this.w, height - by);

        // top
        let ty = this.y - this.opening / 2;
        rect(this.x, 0, this.w, ty);
    }
}

class Scoreboard {
    constructor() {
        this.score = 0;
    }
    increment() {
        this.score++;
    }
    show() {
        stroke(255);
        textSize(20);
        textAlign(CENTER);
        let position = 20;
        text(this.score, position, position, 20, 20);
    }
}
