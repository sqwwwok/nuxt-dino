import Phaser from 'phaser'
// 接收外部参数
var assets, _gameState;
{
  state: 'readying'||'start'||'running'||'pause'||'waiting'||'restart'||'over'||'ending' || 'prepare';
  score: 0;

}

// 游戏参数
const  GRAVITY = 2000,
PLAYER_VX = 500,
PLAYER_VY = 1000,
UFO_INTERVAL_BASE = 4000,
UFO_ACC = 500,
UFO_INTERVAL_MIN = 500,
UFO_VX_MIN = 1000,
UFO_VX_MAX = 2000; 

// 游戏内部变量
var scene;
var player, platform, ufos, cursors;
var ufoGenerator = 0,
ufoIncrement = 0;

/**
 * @Description: 启动1366*768的游戏
 * @Paraments: 
 ** canvas: 指定的canvas元素
 ** assets: playerImage, obsImage, groundImage, bgImage的src地址
 ** gameState: 游戏的state
 * @Return: null
 */
function main(canvasEl, {playerImage, obsImage, groundImage, bgImage}, gameState) {
  assets = {
    playerImage,
    obsImage,
    groundImage,
    bgImage
  };
  _gameState = gameState;
  var gameConfig = {
    type: Phaser.CANVAS,
    width: 1366,
    height: 768,
    canvas: canvasEl,
    customEnvironment: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {
          y: GRAVITY
        },
        debug: false
      }
    },
    scene: {
      preload,
      create,
      update
    }
  };
  new Phaser.Game(gameConfig);
}

function preload() {
  this.load.spritesheet('player', assets.playerImage, { frameWidth: 48, frameHeight: 72 });
  this.load.image('ground', assets.groundImage);
  this.load.image('ufo', assets.obsImage);
  this.load.image('bg', assets.bgImage)
}

function create() {
  scene = this;
  this.add.image(683, 384, 'bg');

  player = this.physics.add.sprite(300, 450, 'player');
  player.setCollideWorldBounds(true);
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('player', {
      start: 0,
      end: 3
    }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'turn',
    frames: [{
      key: 'player',
      frame: 4
    }],
    frameRate: 20
  });
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('player', {
      start: 5,
      end: 8
    }),
    frameRate: 10,
    repeat: -1
  });

  platform = this.physics.add.staticGroup();
  platform.create(683, 730, 'ground').setScale(1).refreshBody();

  ufos = this.physics.add.group();

  this.physics.add.collider(player, platform);
  this.physics.add.collider(player, ufos, hitUFO, null, this);

  this.physics.pause();
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  switch (_gameState.state) {
    case 'prepare':
      prepareGame();
      break;
    case 'start':
      startGame();
      break;
    case 'running': 
      runGame();
      break;
    case 'pause': 
      pauseGame();
      break;
    case 'restart': 
      restartGame();
      break;
    case 'over': 
      overGame();
      break;
    default:
      break;
  }
}

function createUFO() {
  _gameState.score++;
  var ufo = ufos.create(1366, Phaser.Math.Between(0, 750), 'ufo')
  ufo.setVelocityX(Phaser.Math.Between(-UFO_VX_MAX,-UFO_VX_MIN));
  ufo.setCollideWorldBounds(false);
  // ufo.allowGravity = false;
  ufoGenerator = setTimeout(createUFO, UFO_INTERVAL_BASE-ufoIncrement)
  if(UFO_INTERVAL_BASE-ufoIncrement>UFO_INTERVAL_MIN) ufoIncrement+=UFO_ACC;
}

function hitUFO(player, ufo) {
  overGame();
}

function prepareGame () {
  ufos.clear(true, true);
  player.setPosition(300, 450);
  _gameState.state = 'readying'
}
function startGame () {
  scene.physics.resume();
  setTimeout(createUFO,UFO_INTERVAL_BASE);
  _gameState.state = 'running';
}
function runGame () {
  if (cursors.left.isDown) {
    player.setVelocityX(-PLAYER_VX);
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(PLAYER_VX);
    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-PLAYER_VY);
  }  
}
function pauseGame () {
  clearTimeout(ufoGenerator);
  scene.physics.pause();
  _gameState.state = 'waiting';
}
function restartGame () {
  setTimeout(createUFO, UFO_INTERVAL_BASE-ufoIncrement);
  scene.physics.resume();
  _gameState.state = 'running';
}
function overGame () {
  clearTimeout(ufoGenerator);
  ufoIncrement = 0;
  player.anims.play('turn');
  // 暂停游戏 
  scene.physics.pause();
  // 将分数传出
  _gameState.state = 'ending';
}

export default main
