import { Console } from "./scripts/manager.js";
import { Player } from "./scripts/player.js";
import { Cursor } from "./scripts/cursor.js";
import { Bullet } from "./scripts/bullet.js";
import { Camera } from "./scripts/camera.js";
import { Monster } from "./scripts/monster.js";
import { Trail } from "./scripts/trail.js";

let game_console = new Console();

let gpad = new Gamepad();

let canvases = [document.getElementById("canvas1"), document.getElementById("canvas2"), document.getElementById("canvas3"), document.getElementById("canvas4")];
let ctex = [];

for (let canvas of canvases) {
    canvas.style.display = "none";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctex.push(canvas.getContext("2d"));
}

let cameras = [];

for (let ctx of ctex) {
    cameras.push(new Camera(ctx));
};

let players = [];
let cursors = [];
let bullets = [];
let monsters = [];
let trails = [];


window.onload = () => {
    begin();
};

function begin() {
    for (let x = 0; x < 4; x++) {
        players.push(new Player(ctex));
        cursors.push(new Cursor(ctex));
    }

    gpad.on('connect', e => {
        players[e.index].online = true;
        cursors[e.index].online = true;
        console.log(`Controller ${e.index + 1} has been connected`);
        updateSplitscreen();
    });


    gpad.on('disconnect', e => {
        players[e.index].online = false;
        cursors[e.index].online = false;
        console.log(`Controller ${e.index + 1} has been disconnected`);
        updateSplitscreen();
    });

    for (let x in game_console.buttons) {
        let button = game_console.buttons[x];

        gpad.on('press', button, (e) => {
            if (players[e.player].online) {

                if (button == "button_1") {
                    players[e.player].speed = 2.5;
                    trails.push(new Trail(ctex, players[e.player].x, players[e.player].y));
                }

                if (button == "shoulder_bottom_right") {
                    bullets.push(new Bullet(players[e.player].x, players[e.player].y, cursors[e.player].x - players[e.player].x, cursors[e.player].y - players[e.player].y));
                };

                if (e.value) {
                    if (button == "stick_axis_left") {
                        players[e.player].velX = Math.round(e.value[0]);
                        players[e.player].velY = Math.round(e.value[1]);
                    } else if (button == "stick_axis_right") {
                        cursors[e.player].velX = Math.round(e.value[0]);
                        cursors[e.player].velY = Math.round(e.value[1]);
                    }
                }
            }
        });

        gpad.on('hold', button, (e) => {
            if (players[e.player].online) {

                if (button == "button_1") {
                    players[e.player].speed = 2.5;
                    trails.push(new Trail(ctex, players[e.player].x, players[e.player].y));
                }

                if (e.value) {
                    if (button == "stick_axis_left") {
                        players[e.player].velX = Math.round(e.value[0]);
                        players[e.player].velY = Math.round(e.value[1]);
                    } else if (button == "stick_axis_right") {
                        cursors[e.player].velX = Math.round(e.value[0]);
                        cursors[e.player].velY = Math.round(e.value[1]);
                    }
                }
            }
        });

        gpad.on('release', button, (e) => {
            if (players[e.player].online) {


                if (button == "button_1") {
                    players[e.player].speed = 1;
                }

                if (e.value) {
                    if (button == "stick_axis_left") {
                        players[e.player].velX = Math.round(e.value[0]);
                        players[e.player].velY = Math.round(e.value[1]);
                    } else if (button == "stick_axis_right") {
                        cursors[e.player].velX = Math.round(e.value[0]);
                        cursors[e.player].velY = Math.round(e.value[1]);
                    }
                }
            }
        });
    }

    generateMonsters();

    setInterval(generateMonsters, 30000);
    setInterval(() => {
        for (let bullet of bullets) {
            bullet.life--;
        }
    }, 1000);

    requestAnimationFrame(render);
}

function render() {
    for (let x in ctex) {
        let ctx = ctex[x];
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        switch (x) {
            case 1:
                ctx.fillStyle = "white";
                break;

            case 2:
                ctx.fillRect = "silver";
                break;

            case 3:
                ctx.fillStyle = "teal";
                break;

            case 4:
                ctx.fillStyle = "navy";
                break;
        }

        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }

    for (let x in cameras) {
        let camera = cameras[x];
        camera.begin();
        camera.moveTo(players[x].x, players[x].y);
    }

    for (let player of players) {
        if (player.online) {
            player.update();
            player.draw();
        }
    }

    for (let cursor of cursors) {
        if (cursor.online) {
            cursor.update();
            cursor.draw();
        }
    }

    for (let bullet of bullets) {
        if (bullet.life > 0) {
            bullet.update();
            bullet.draw();
        }
    };

    for (let monster of monsters) {
        let pos = monster.getClosestPlayer(players);
        monster.moveTo(pos.x, pos.y);
        monster.draw();
    }

    for (let trail of trails) {
        if (trail.life > 0) {
            trail.draw();
        }
    }

    for (let camera of cameras) {
        camera.end();
    }

    requestAnimationFrame(render);
}

window.onresize = () => {
    for (let canvas of canvases) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    for (let camera of cameras) {
        camera.update();
    }

    updateSplitscreen();

}

function updateSplitscreen() {
    let count = 0;

    for (let x in players) {
        if (players[x].online) {
            count++;
        }
    }

    switch (count) {
        case 1:
            canvases[0].style.display = "block";
            canvases[1].style.display = "none";
            canvases[2].style.display = "none";
            canvases[3].style.display = "none";

            canvases[0].width = window.innerWidth;
            canvases[0].height = window.innerHeight;
            break;

        case 2:
            canvases[1].style.display = "block";
            canvases[2].style.display = "none";
            canvas4.style.display = "none";

            canvases[0].width = window.innerWidth / 2;
            canvases[0].height = window.innerHeight;

            canvases[1].width = window.innerWidth / 2;
            canvases[1].height = window.innerHeight;
            canvases[1].style.right = "0px";

            break;

        case 3:
            canvases[2].style.display = "block";
            canvases[3].style.display = "none";

            canvases[0].width = window.innerWidth / 2;
            canvases[0].height = window.innerHeight / 2;

            canvases[1].width = window.innerWidth / 2;
            canvases[1].height = window.innerHeight / 2;
            canvases[1].style.right = "0px";

            canvases[2].width = window.innerWidth / 2;
            canvases[2].height = window.innerHeight / 2;
            canvases[2].style.left = "0px";
            canvases[2].style.bottom = "0px";

            break;
        case 4:
            canvases[3].style.display = "block";

            canvases[0].width = window.innerWidth / 2;
            canvases[0].height = window.innerHeight / 2;

            canvases[1].width = window.innerWidth / 2;
            canvases[1].height = window.innerHeight / 2;
            canvases[1].style.right = "0px";
            canvases[1].style.top = "0px";

            canvases[2].width = window.innerWidth / 2;
            canvases[2].height = window.innerHeight / 2;
            canvases[1].style.left = "0px";
            canvases[1].style.bottom = "0px";

            canvases[3].width = window.innerWidth / 2;
            canvases[3].height = window.innerHeight / 2;
            canvases[1].style.right = "0px";
            canvases[1].style.bottom = "0px";
            break;
    };
}

function generateMonsters() {
    let mon = new Monster();
    monsters.push(mon);
};