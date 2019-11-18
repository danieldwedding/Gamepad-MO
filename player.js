export class Player {
    constructor() {
        this.online = false;

        this.ctx1 = document.getElementById("canvas1").getContext("2d");
        this.ctx2 = document.getElementById("canvas2").getContext("2d");
        this.ctx3 = document.getElementById("canvas3").getContext("2d");
        this.ctx4 = document.getElementById("canvas4").getContext("2d");

        this.x = 0;
        this.y = 0;
        this.velX = 0;
        this.velY = 0;
        this.health = 100;
        this.speed = 1;
    }

    draw() {
        this.ctx1.fillStyle = "gold";
        this.ctx1.fillRect(this.x, this.y, 50, 50);
        this.ctx1.stroke();

        this.ctx2.fillStyle = "gold";

        this.ctx2.fillRect(this.x, this.y, 50, 50);
        this.ctx2.stroke();

        this.ctx3.fillStyle = "gold";


        this.ctx3.fillRect(this.x, this.y, 50, 50);
        this.ctx3.stroke();

        this.ctx4.fillStyle = "gold";


        this.ctx4.fillRect(this.x, this.y, 50, 50);
        this.ctx4.stroke();
    }

    update() {
        this.x += this.velX * this.speed;
        this.y += this.velY * this.speed;
    }
}