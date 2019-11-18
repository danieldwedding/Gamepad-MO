import { Console } from "./manager.js";
import { Player } from "./player.js";
import { Cursor } from "./cursor.js";
import { Bullet } from "./bullet.js";
import { Camera } from "./camera.js";
import { Monster } from "./monster.js";

let game_console = new Console();

let gpad = new Gamepad();

let canvas1 = document.getElementById("canvas1");
let canvas2 = document.getElementById("canvas2");
let canvas3 = document.getElementById("canvas3");
let canvas4 = document.getElementById("canvas4");

canvas1.style.display = "none";
canvas2.style.display = "none";
canvas3.style.display = "none";
canvas4.style.display = "none";

let camera1 = new Camera(canvas1.getContext("2d"));
let camera2 = new Camera(canvas2.getContext("2d"));
let camera3 = new Camera(canvas3.getContext("2d"));
let camera4 = new Camera(canvas4.getContext("2d"));


let players = [];
let cursors = [];
let bullets = [];
let monsters = [];

window.onload = () => {
    begin();
};

function begin() {
    canvas1.width = window.innerWidth;
    canvas1.height = window.innerHeight;
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;
    canvas3.width = window.innerWidth;
    canvas3.height = window.innerHeight;
    canvas4.width = window.innerWidth;
    canvas4.height = window.innerHeight;

    players.push(new Player());
    players.push(new Player());
    players.push(new Player());
    players.push(new Player());

    cursors.push(new Cursor());
    cursors.push(new Cursor());
    cursors.push(new Cursor());
    cursors.push(new Cursor());


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
    requestAnimationFrame(game);
}

function render() {
    canvas1.getContext("2d").clearRect(0, 0, window.innerWidth, window.innerHeight);
    canvas2.getContext("2d").clearRect(0, 0, window.innerWidth, window.innerHeight);
    canvas3.getContext("2d").clearRect(0, 0, window.innerWidth, window.innerHeight);
    canvas4.getContext("2d").clearRect(0, 0, window.innerWidth, window.innerHeight);

    canvas1.getContext("2d").fillRect(0, 0, window.innerWidth, window.innerHeight);
    canvas1.getContext("2d").fillStyle = "white";
    canvas2.getContext("2d").fillRect(0, 0, window.innerWidth, window.innerHeight);
    canvas2.getContext("2d").fillStyle = "silver";
    canvas3.getContext("2d").fillRect(0, 0, window.innerWidth, window.innerHeight);
    canvas3.getContext("2d").fillStyle = "teal";
    canvas4.getContext("2d").fillRect(0, 0, window.innerWidth, window.innerHeight);
    canvas4.getContext("2d").fillStyle = "navy";

    camera1.begin();
    camera2.begin();
    camera3.begin();
    camera4.begin();

    for (let player of players) {
        if (player.online) {
            player.update();
            player.draw();
        }
    }

    camera1.moveTo(players[0].x, players[0].y);
    camera2.moveTo(players[1].x, players[1].y);
    camera3.moveTo(players[2].x, players[2].y);
    camera4.moveTo(players[3].x, players[3].y);

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
        console.log(pos);

        monster.moveTo(pos.x, pos.y);
        monster.draw();
    }

    camera1.end();
    camera2.end();
    camera3.end();
    camera4.end();

    requestAnimationFrame(render);
}

function game() {

    requestAnimationFrame(game);
};

window.onresize = () => {
    canvas1.width = window.innerWidth;
    canvas1.height = window.innerHeight;
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;
    canvas3.width = window.innerWidth;
    canvas3.height = window.innerHeight;
    canvas4.width = window.innerWidth;
    canvas4.height = window.innerHeight;

    camera1.update();
    camera2.update();
    camera3.update();
    camera4.update();

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
            canvas1.style.display = "block";
            canvas2.style.display = "none";
            canvas3.style.display = "none";
            canvas4.style.display = "none";

            canvas1.width = window.innerWidth;
            canvas1.height = window.innerHeight;
            break;

        case 2:
            canvas2.style.display = "block";
            canvas3.style.display = "none";
            canvas4.style.display = "none";

            canvas1.width = window.innerWidth / 2;
            canvas1.height = window.innerHeight;

            canvas2.width = window.innerWidth / 2;
            canvas2.height = window.innerHeight;
            canvas2.style.right = "0px";

            break;

        case 3:
            canvas3.style.display = "block";
            canvas4.style.display = "none";

            canvas1.width = window.innerWidth / 2;
            canvas1.height = window.innerHeight / 2;

            canvas2.width = window.innerWidth / 2;
            canvas2.height = window.innerHeight / 2;
            canvas2.style.right = "0px";

            canvas3.width = window.innerWidth / 2;
            canvas3.height = window.innerHeight / 2;
            canvas3.style.left = "0px";
            canvas3.style.bottom = "0px";

            break;
        case 4:
            canvas4.style.display = "block";

            canvas1.width = window.innerWidth / 2;
            canvas1.height = window.innerHeight / 2;

            canvas2.width = window.innerWidth / 2;
            canvas2.height = window.innerHeight / 2;
            canvas2.style.right = "0px";
            canvas2.style.top = "0px";

            canvas3.width = window.innerWidth / 2;
            canvas3.height = window.innerHeight / 2;
            canvas2.style.left = "0px";
            canvas2.style.bottom = "0px";

            canvas4.width = window.innerWidth / 2;
            canvas4.height = window.innerHeight / 2;
            canvas2.style.right = "0px";
            canvas2.style.bottom = "0px";
            break;
    };
}

function generateMonsters() {
    let mon = new Monster();
    monsters.push(mon);

    console.log(`Monsters active: ${monsters.length}`);
    console.log(monsters);
};