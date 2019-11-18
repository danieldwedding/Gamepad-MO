export class Bullet {
    constructor(x, y, dirX, dirY) {
        this.ctx1 = document.getElementById("canvas1").getContext("2d");
        this.ctx2 = document.getElementById("canvas2").getContext("2d");
        this.ctx3 = document.getElementById("canvas3").getContext("2d");
        this.ctx4 = document.getElementById("canvas4").getContext("2d");

        this.x = x;
        this.y = y;
        this.dirX = dirX;
        this.dirY = dirY;

        this.life = 3;
    }

    draw() {
        this.ctx1.fillRect(this.x, this.y, 20, 20);
        this.ctx2.fillRect(this.x, this.y, 20, 20);
        this.ctx3.fillRect(this.x, this.y, 20, 20);
        this.ctx4.fillRect(this.x, this.y, 20, 20);

    }

    update() {
        this.x += this.dirX / 3;
        this.y += this.dirY / 3;
    }
}