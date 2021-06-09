class Ball {
    constructor() {
        this.y = height / 2;
        this.vel = 0;
        this.gravity = 0.75;
        this.x = width / 4;
        this.w = 30;
        this.playing = false;
        this.startingFrame = 0;
        this.failed = false;
    }

    update() {
        if (this.playing || this.failed) {
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
        if (!this.failed) {
            fill(255);
        } else {
            fill(255, 0, 0);
        }
        ellipse(this.x, this.y, this.w);
    }

    flap() {
        if (!this.failed) {
            this.vel = -15;
        }
        if (!this.playing) {
            this.playing = true;
            this.startingFrame = frameCount;
        }
    }

    tally(other, score) {
        if (this.x > other.x + other.w && !other.scored) {
            other.scored = true;
            score.increment();
        }
    }

    checkCollision(other) {
        if (this.x > other.x && this.x < other.x + other.w) {
            if (this.y < other.top || this.y > other.bottom) {
                this.loseGame();
                return true;
            }
        }
        return false;
    }

    loseGame() {
        //
        this.failed = true;
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
        this.moving = true;
    }

    update(ball) {
        if (ball.playing && this.moving) {
            this.x += this.vel;
        }
    }

    show() {
        fill(255);
        noStroke();

        // top
        this.top = this.y - this.opening / 2;
        rect(this.x, 0, this.w, this.top);

        // bottom
        this.bottom = this.y + this.opening / 2;
        rect(this.x, this.bottom, this.w, height - this.bottom);
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
        fill(255);
        textSize(20);
        textAlign(CENTER);
        let position = 20;
        text(this.score, position, position, 20, 20);
    }
}
