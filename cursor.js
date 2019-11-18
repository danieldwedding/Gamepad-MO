export class Cursor {
    constructor() {
        this.ctx1 = document.getElementById("canvas1").getContext("2d");
        this.ctx2 = document.getElementById("canvas2").getContext("2d");
        this.ctx3 = document.getElementById("canvas3").getContext("2d");
        this.ctx4 = document.getElementById("canvas4").getContext("2d");

        this.x = 0;
        this.y = 0;
        this.velX = 0;
        this.velY = 0;
        this.img = document.getElementById("cursor");

    }

    draw() {
        this.ctx1.drawImage(this.img, this.x, this.y);
        this.ctx2.drawImage(this.img, this.x, this.y);
        this.ctx3.drawImage(this.img, this.x, this.y);
        this.ctx4.drawImage(this.img, this.x, this.y);

    }

    update() {
        this.x += this.velX * 1.5;
        this.y += this.velY * 1.5;
    }
}