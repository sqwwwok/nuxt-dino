<template>
  <div class="game-container">
    <div class="ready-box" v-if="gameState.state==='readying'">
      <p>Are you ready ?</p>
      <el-button type="primary" @click="changeGameState('start')">Go!!!</el-button>
    </div>
    <div class="over-box" v-if="gameState.state==='ending'">
      <p>You lose!</p>
      <p>Final score: {{gameState.score}}</p>
      <el-button type="primary" @click="changeGameState('prepare')">Try again</el-button>
    </div>
    <canvas ref="canvas" class="game"></canvas>
  </div>
</template>

<script>
import Mario from '~/assets/images/play/player.png'
import Ground from '~/assets/images/play/ground.png'
import UFO from '~/assets/images/play/ufo.png'
import Background from '~/assets/images/play/background.png'
import game from '~/scripts/game'
export default {
  props: {
    state: String
  },
  data(){
    return {
      gameState: {
        state: 'readying',
        score: 0
      }
    }
  },
  mounted(){
    game(
      this.$refs.canvas, 
      {
        playerImage: Mario,
        obsImage: UFO,
        groundImage: Ground,
        bgImage: Background
      },
      this.gameState
    );
    this.scaleCanvas();
    window.onresize = ()=>{
      this.scaleCanvas();
    }
  },
  methods: {
    scaleCanvas(){
      // width/height
      const rate = 1366 / 768;
      var canvasEl = this.$refs.canvas,
      screenHeight = window.innerHeight,
      screenWidth = window.innerWidth;
      // 全屏
      canvasEl.style.height = screenHeight + 'px';
      canvasEl.style.width = screenWidth + 'px';
      // 自适应
      // if(screenWidth > screenHeight*rate){
      //   canvasEl.style.height = screenHeight + 'px';
      //   canvasEl.style.width = (screenHeight*rate) + 'px';
      // }else{
      //   canvasEl.style.width = screenWidth +'px';
      //   canvasEl.style.height = (screenWidth/rate) + 'px'
      // }

    },
    changeGameState(state){
      this.gameState.state = state;
    }
  },
  watch: {
    state: function (val, oldVal) {
      if(val==='restart'){
        this.changeGameState('restart');
      }else if(val==='pause'){
        this.changeGameState('pause');
      }
    }
  }

}
</script>

<style lang='less' scoped>
#absolute-center{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
#title{
  text-align: center;
  font-size: 80px;
  #absolute-center();
}
.game-container{
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ready-box{
  color: white;
  #title()
}
.over-box{
  color: red;
  #title()
}
.game{
  margin: auto;
}
</style>