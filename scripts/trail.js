export class Trail {
    constructor(ctex, x, y) {
        this.ctex = ctex;
        this.x = x;
        this.y = y;
        this.life = 1;

        setInterval(() => {
            if (this.life > 0) {
                switch (this.life) {
                    case 1:
                        this.life = .50;
                        break;

                    case .50:
                        this.life = .25;
                        break;

                    case .25:
                        this.life = 0;
                        break;
                }
            }
        }, 1000);
    }

    draw() {
        for (let x in this.ctex) {
            let ctx = this.ctex[x];
            ctx.fillStyle = "aqua";
            ctx.fillRect(this.x, this.y, 10, 10, this.life);
        }
    }
}