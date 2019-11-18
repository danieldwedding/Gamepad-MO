export class Cursor {
    constructor(ctex) {
        this.ctex = ctex;

        this.x = 0;
        this.y = 0;
        this.velX = 0;
        this.velY = 0;
        this.img = document.getElementById("cursor");

    }

    draw() {
        for (let x in this.ctex) {
            let ctx = this.ctex[x];
            ctx.drawImage(this.img, this.x, this.y);
        }
    }

    update() {
        this.x += this.velX * 1.5;
        this.y += this.velY * 1.5;
    }
}