import Phaser from 'phaser'
// 接收外部参数
var assets, __connector;

// 游戏参数
const  GRAVITY = 2000,
PLAYER_VX = 500,
PLAYER_VY = 1000,
UFO_INTERVAL_BASE = 4000,
UFO_ACC = 500,
UFO_INTERVAL_MIN = 500,
UFO_VX_MIN = 1500,
UFO_VX_MAX = 2500; 

// 游戏内部变量
// 封存所有的游戏状态
var __game = {
// 'readying' | 'start' | 'running' | 'pause' | 'waiting' | 'countinue' | 'over' | 'ending'  |  'prepare'
  state: 'prepare',
  score: 0,
};
var scene, cursors
var player, platform, ufos;
var ufoGenerator = 0,
ufoIncrement = 0;

/**
 * @Description: 启动1366*768的游戏
 * @Paraments: 
 ** canvas: 指定的canvas元素
 ** assets: playerImage, obsImage, groundImage, bgImage的src地址
 ** connector: connector.ouput作为游戏内部数据的输出口
 * @Return: 控制游戏状态的controller函数
 */
function main(canvasEl, {playerImage, obsImage, groundImage, bgImage}, connector) {
  assets = { playerImage, obsImage, groundImage, bgImage };
  connector.output = __game;
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
    scene: { preload, create, update }
  };
  new Phaser.Game(gameConfig);
  return gameController;
}

function gameController (state) {
  switch (state) {
    case 'start':
      if(__game.state==='readying'){
        startGame();
        __game.state = 'running';
      }
      break;
    case 'pause':
      if(__game.state==='running'){
        pauseGame();
        __game.state = 'waiting';
      } 
      break;
    case 'continue':
      if(__game.state==='waiting'){
        restartGame();
        __game.state = 'running';
      } 
      break;
    case 'replay':
      overGame();
      prepareGame();
      startGame();
      __game.state = 'running';
      break;
    case 'exit':
      overGame();
      prepareGame();
      __game.state = 'readying';
      break;
    default:
      break;
  }
}


// scene的附属函数
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
  platform.create(683, 737, 'ground').setScale(1).refreshBody();

  ufos = this.physics.add.group();

  this.physics.add.collider(player, platform);
  this.physics.add.collider(player, ufos, hitUFO, null, this);

  this.physics.pause();
  cursors = this.input.keyboard.createCursorKeys();

  __game.state = 'prepare';
}

function createUFO() {
  __game.score++;
  var ufo = ufos.create(1500, Phaser.Math.Between(0, 750), 'ufo')
  ufo.setVelocityX(Phaser.Math.Between(-UFO_VX_MAX,-UFO_VX_MIN));
  ufo.setCollideWorldBounds(false);
  // ufo.allowGravity = false;
  ufoGenerator = setTimeout(createUFO, UFO_INTERVAL_BASE-ufoIncrement)
  if(UFO_INTERVAL_BASE-ufoIncrement>UFO_INTERVAL_MIN) ufoIncrement+=UFO_ACC;
}

function hitUFO(player, ufo) {
  __game.state = 'over';
}

function update() {
  switch (__game.state) {
    case 'prepare':
      prepareGame();
      __game.state = 'readying';
      break;
    case 'start':
      startGame();
      __game.state = 'running';
      break;
    case 'running': 
      runGame();
      break;
    case 'pause': 
      pauseGame();
      __game.state = 'waiting';
      break;
    case 'countinue': 
      restartGame();
      __game.state = 'running';
      break;
    case 'over': 
      overGame();
      __game.state = 'ending';
      break;
    default:
      break;
  }
}

function prepareGame () {
  ufos.clear(true, true);
  player.setPosition(300, 450);
  __game.score = 0;
}
function startGame () {
  scene.physics.resume();
  ufoGenerator = setTimeout(createUFO,UFO_INTERVAL_BASE);
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
}
function restartGame () {
  ufoGenerator = setTimeout(createUFO, UFO_INTERVAL_BASE-ufoIncrement);
  scene.physics.resume();
}
function overGame () {
  clearTimeout(ufoGenerator);
  ufoIncrement = 0;
  player.anims.play('turn');
  // 暂停游戏 
  scene.physics.pause();
}

export default main
