<template>
  <div
    class='play'
    @keydown.space="savePower" 
    @keyup.space="spring">
      <div
        class="play-main" 
        tabindex="-1">
        <obstacle-stick 
          v-for="obstacle in obstacles" 
          :key="obstacle.id" 
          v-bind="obstacle"
          @check='checkPosition'
          @destroy='destroyObstacle' />
        <div 
          class="player" 
          :style="{'bottom':playerPosition+'px',
          'height':PLAYER_HEIGHT+'px',
          'width':PLAYER_WIDTH+'%'}">
            <p v-show="typeof saveStart == 'number'">...</p>
            <img src='~assets/images/play/Mario.png'  />
        </div>
      </div>
      <option-list class="option-list" @query="changeMessage" />
      <message-box 
        class="message"
        :startCard="startCard" 
        :componentId="componentId"
        @start="restart"
        @closeMessage="changeMessage" />
  </div>
</template>

<script>
import OptionList from '~/components/play-views/option-list'
import Obstacle from '~/components/play-views/obstacle-stick'
import MessageBox from '~/components/play-views/message-box'
const OBSTACLE_CONFIG = {
  interval: 7000,
  minWidth: 10,   // percentage
  maxWidth: 11,   // percentage
  minHeight: 10,    // px
  maxHeight: 60,    // px
  minThickness: 10,   // px
  maxThickness: 40,   // px
  generate: true,
  moveSpeed: 1,
  move: {move: true}
},
OBSERVE_INTERVAL = 16,
SPRING_POWER = 0.004,
GRAVITY = 0.0008,
MAXHEIGHT = 2000,    // px
PLAYER_HEIGHT = 70,   // px
PLAYER_WIDTH = 4;   // percentage

// generate random obstacles
function generateRandom (start,end) {
  return Math.round(start + Math.random() * (end-start) )
}

export default { 
  data () {  
    return { 
      OBSTACLE_CONFIG,
      SPRING_POWER,
      OBSERVE_INTERVAL,
      GRAVITY,
      PLAYER_WIDTH,
      PLAYER_HEIGHT,
      MAXHEIGHT,
      obstacles: [],
      obstacleTimeout: 0,  // setTimeout()
      saveStart: 'prevent',   // 'ready' | Number | 'prevent'
      springAnimation: 0,   // requestAnimationFrame()
      playerPosition: 0,
      startCard: true,
      componentId: ''
    }
  },
  methods: {
    changeMessage(msg){
      this.componentId = msg;
    },
    restart () {
      this.componentId = '';
      this.startCard = false;
      this.obstacles = [];
      this.saveStart = 'ready';
      this.playerPosition = 0;
      this.OBSTACLE_CONFIG.move.move = true;
      this.OBSTACLE_CONFIG.generate = true;
      this.generateObs(); 
    },
    generateObs (config=this.OBSTACLE_CONFIG) {
      if(!config.generate) return 
      this.obstacles.push({
        width: generateRandom(config.minWidth,config.maxWidth),
        height: generateRandom(config.minHeight,config.maxHeight),
        thickness: generateRandom(config.minThickness,config.maxThickness),
        playerWidth: this.PLAYER_WIDTH,
        moveSpeed: this.OBSTACLE_CONFIG.moveSpeed,
        move: this.OBSTACLE_CONFIG.move,
        id: String(Math.random())
      })
      this.obstacleTimeout = setTimeout(this.generateObs,config.interval)
    },
    destroyObstacle () {
      this.obstacles.shift();
    },
    savePower () {
      if(this.saveStart==='ready'){
        this.saveStart = new Date().getTime();
      }
    },
    spring () {
      if(typeof this.saveStart !== 'number') return;
      var initialVelocity = (new Date().getTime() - this.saveStart) * SPRING_POWER;
      var vm = this, freeFallTime = 0;
      this.saveStart = 'prevent';
      (function setPosition () {
        freeFallTime += OBSERVE_INTERVAL;
        var position = initialVelocity*freeFallTime - GRAVITY*Math.pow(freeFallTime,2);
        // 截获<=0的position
        if(position<=0) position = 0;
        vm.playerPosition = position;
        vm.springAnimation = requestAnimationFrame(setPosition);
        vm.checkPosition(position)
      }) ()          
    },
    finishSpring () {
      cancelAnimationFrame(this.springAnimation);
      this.saveStart = 'ready';
    },
    checkPosition (position=this.playerPosition) {
      if(position===0) this.finishSpring()
      if(position>this.MAXHEIGHT) {
        this.overGame('你飞出了地球')
      }
      if(this.$store.state.defaultRanges.some(
        range => range.include(position,position+this.PLAYER_HEIGHT)
      )) this.overGame('你被撞死了');
    },
    overGame (deathReason) {
      this.finishSpring();
      this.saveStart = 'prevent'
      clearTimeout(this.obstacleTimeout);
      this.OBSTACLE_CONFIG.generate = false;
      this.OBSTACLE_CONFIG.move.move = false;
      this.$store.commit('clearAll');
      this.$confirm(deathReason,'是否重新开始',{
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'info'
      }).then(()=>{this.restart()})
        .catch(()=>{this.startCard = true});
    }
  },
  components: {
    'obstacle-stick': Obstacle,
    'message-box': MessageBox,
    'option-list': OptionList,
  }
}
</script>

<style scoped>
.play{
  position: relative;
  height: 100%
}
.play .play-main{
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 70px;
  border-top: solid 3px red;
}
.play .play-main .player{
  position: absolute;
  right: 50%;
}
.play .play-main .player img{
  width: 100%;
  height: 100%;
}
.play .option-list{
  position: absolute;
  width: 100%;
  height: 70px;
  bottom: 0px;
  border-top: solid black 5px;
  padding: 5px 0px;
}
.play .messages{
  position: absolute;
  left: 50%;
  bottom: 50%;
  transform: translateX(-50%);
  z-index: 1;
}
</style>