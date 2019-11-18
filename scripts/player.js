export class Player {
    constructor(ctex) {
        this.online = false;

        this.ctex = ctex;

        this.x = 0;
        this.y = 0;
        this.velX = 0;
        this.velY = 0;
        this.health = 100;
        this.speed = 1;
        this.img = new Image();
        this.img.src = "./assets/spaceship.png";
    }

    draw() {
        for (let x in this.ctex) {
            let ctx = this.ctex[x];
            ctx.fillStyle = "gold";
            ctx.drawImage(this.img, this.x, this.y);
        };
    }

    update() {
        this.x += this.velX * this.speed;
        this.y += this.velY * this.speed;
    }
}