import { Bullet } from "./bullet";

export class Monster {
    constructor() {
        this.x = 0;
        this.y = 0;

        this.ctx1 = document.getElementById("canvas1").getContext("2d");
        this.ctx2 = document.getElementById("canvas2").getContext("2d");
        this.ctx3 = document.getElementById("canvas3").getContext("2d");
        this.ctx4 = document.getElementById("canvas4").getContext("2d");

        this.velX = 0;
        this.velY = 0;
        this.health = 100;
    }

    draw() {
        this.ctx1.fillStyle = "red";
        this.ctx1.fillRect(this.x, this.y, 50, 50);
        this.ctx2.fillStyle = "red";
        this.ctx2.fillRect(this.x, this.y, 50, 50);
        this.ctx3.fillStyle = "red";
        this.ctx3.fillRect(this.x, this.y, 50, 50);
        this.ctx4.fillStyle = "red";
        this.ctx4.fillRect(this.x, this.y, 50, 50);
    }

    update() {
        this.x += this.velX;
        this.y += this.velY;
    }

    moveTo(x, y) {
        let SPEED = 1;
        // subtract (= difference vector)
        var dx = x - this.x;
        var dy = y - this.y;

        // normalize (= direction vector)
        // (a direction vector has a length of 1)
        var length = Math.sqrt(dx * dx + dy * dy);
        if (length) {
            dx /= length;
            dy /= length;
        }

        // move
        // delta is the elapsed time in seconds
        // SPEED is the speed in units per second (UPS)
        this.x += dx * SPEED;
        this.y += dy * SPEED;
    }

    getClosestPlayer(players) {
        let distance = null;
        let pos = {
            x: 0,
            y: 0
        };

        for (let player of players) {
            if (player.online) {
                if (distance == null) {
                    distance = Math.sqrt((player.x - this.x) ^ 2 + (player.y - this.y) ^ 2);
                    pos.x = player.x;
                    pos.y = player.y;
                } else {
                    let dist = Math.sqrt((player.x - this.x) ^ 2 + (player.y - this.y) ^ 2);
                    if (dist < distance) {
                        distance = dist;
                        pos.x = player.x;
                        pos.y = player.y;
                    }
                }
            }
        }

        return pos;
    }
}