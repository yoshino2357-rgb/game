const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

//自機の設定
let player = {
    x: canvas.width / 2 - 20,
    y: canvas.height - 60,
    width: 40,
    height: 40,
    speed: 5,
};

//キー入力
let keys = {};

document.addEventListener("keydown" , (e) => {
    keys[e.key] = true;
});
document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

//自機を動かす
function movePlayer(){
    if (keys["Arrowleft"] && player.x > 0) {
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

//メイングループ
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    movePlayer();
    drawPlayer();

    requestAnimationFrame(gameLoop);
}

gameLoop();