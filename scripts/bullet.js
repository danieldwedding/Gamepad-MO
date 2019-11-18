export class Bullet {
    constructor(ctex, x, y, dirX, dirY) {
        this.ctex = ctex;

        this.x = x;
        this.y = y;
        this.dirX = dirX;
        this.dirY = dirY;

        this.life = 3;
    }

    draw() {
        for (let x in this.ctex) {
            let ctx = this.ctex[x];
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.fillStyle = "orange";
            ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    update() {
        this.x += this.dirX / 30;
        this.y += this.dirY / 30;
    }
}