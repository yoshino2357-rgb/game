const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let bullets = [];
let enemies = [];
let score =0;
let gameOver = false;

//自機の設定
let player = {
    x: canvas.width / 2 - 20,
    y: canvas.height - 60,
    width: 40,
    height: 40,
    speed: 5,
};

//敵の配列
function spawnEnemy() {
    enemies.push({
        x: Math.random() * (canvas.width - 40),
        y: -40,
        width: 40,
        height: 40,
        speed: 0.5
    });
}
setInterval(spawnEnemy, 400);

//敵を動かす
function moveEnemies() {
    for (let i = 0; i <enemies.length; i++) {
        enemies[i].y += enemies[i].speed;

        //画面から出たら削除
        if (enemies[i].y > canvas.height) {
            enemies.splice(i, 1);
            i--;
        }
    }
}

//敵を描画する
function drawEnemies() {
    ctx.fillStyle = "red";
    for (let e of enemies) {
        ctx.fillRect(e.x, e.y, e.width, e.height);
    }
}
function checkCollision() {
    for (let i = 0; i < bullets.length; i++) {
        for (let j = 0; j < enemies.length; j++) {

            let b = bullets[i];
            let e = enemies[j];

            if(
                b.x < e.x + e.width &&
                b.x + b.width > e.x &&
                b.y < e.y + e.height &&
                b.y + b.height > e.y
            ) {
                //当たったら両方消す
                bullets.splice(i, 1);
                enemies.splice(j, 1);
                score += 10
                i--;
                break;
            }
        }
    }
    if (checkPlayerHit()) {
    gameOver = true
    }
}

function checkPlayerHit() {
    for (let e of enemies) {
        if (
            player.x < e.x + e.width &&
            player.x + player.width > e.x &&
            player.y < e.y + e.height &&
            player.y + player.height > e.y
        ) {
            return true;
        }
    }
    return false;
}
//キー入力
let keys = {};

document.addEventListener("keydown" , (e) => {
   keys[e.key] = true;
   console.log(e.key);

    //スペースキーで弾を撃つ
    if (e.key === " "||e.key === "Space") {
        bullets.push({
            x: player.x + player.width / 2 -2,
            y: player.y,
            width: 4,
            height: 10,
            speed: 5
        });
        console.log("弾の数:", bullets.length);
    }
});
document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

//自機を動かす
function movePlayer(){
    if (keys["ArrowLeft"] && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys["ArrowRight"] && player.x < canvas.width - player.width) {
        player.x +=player.speed;
    }
}

//自機を描く
function drawPlayer() {
    ctx.fillStyle = "cyan";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

//弾を動かす
function moveBullets() {
    for (let i= 0; i < bullets.length; i++) {
        bullets[i].y -= bullets[i].speed;

        //画面外に出た弾を削除
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
            i--;
        }
    }
}

//弾を描画する
function drawBullets(){
    ctx.fillStyle = "yellow";
    for (let b of bullets) {
        ctx.fillRect(b.x, b.y, b.width, b.height);
    }
}
//メイングループ
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    movePlayer();
    moveBullets();
    moveEnemies();
    checkCollision();

    drawPlayer();
    drawBullets();
    drawEnemies();
    drawScore();

    requestAnimationFrame(gameLoop);
    if (gameOver) {
    ctx.fillStyle = "white",
    ctx.font = "40px Arial",
    ctx.fillText("Game Over", canvas.width / 2 - 120, canvas.height / 2);
    return;
    }
}

gameLoop();
