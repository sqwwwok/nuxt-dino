import Phaser from 'phaser'
var assets;
var _gameState;
// {
//   state: 
//  'readying'||'start'||'running'||'pause'||'waiting'||'restart'||'over'||'ending' || 'prepare'
// }

var scene;
var player, platform, ufos, cursors;
var ufoGenerator;

/**
 * @Description: 在canvas中生成1902*1080的游戏
 * @Paraments: 
 ** canvas: 指定的canvas元素
 ** assets: playerImage, obsImage, groundImage, backgroundImage的src地址
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
          y: 2500
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
  this.load.spritesheet('player', assets.playerImage, { frameWidth: 32, frameHeight: 48 });
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
  var ufo = ufos.create(1366, Phaser.Math.Between(0, 700), 'ufo')
  ufo.setVelocityX(Phaser.Math.Between(-2000,-1000));
  ufo.setCollideWorldBounds(false);
  // ufo.allowGravity = false;
  ufoGenerator = setTimeout(createUFO, 2000)
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
  setTimeout(createUFO,2000);
  _gameState.state = 'running';
}
function runGame () {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-800);
  }  
}
function pauseGame () {
  clearTimeout(ufoGenerator);
  scene.physics.pause();
  _gameState.state = 'waiting';
}
function restartGame () {
  setTimeout(createUFO, 2000);
  scene.physics.resume();
  _gameState.state = 'running';
}

function overGame () {
  clearTimeout(ufoGenerator);
  // 暂停游戏 
  scene.physics.pause();
  // 将分数传出
  _gameState.state = 'ending';
}

export default main
