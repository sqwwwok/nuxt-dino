<template>
  <div class="game-container">
    <div class="ready-box" v-if="gameConnector.output.state==='readying'">
      <p>Are you ready ?</p>
      <el-button type="primary" @click="changeGameState('start')">Go!!!</el-button>
    </div>
    <div class="over-box" v-if="gameConnector.output.state==='ending'">
      <p>You lose!</p>
      <p>Final score: {{gameConnector.output.score}}</p>
      <el-button type="primary" @click="changeGameState('replay')">Try again</el-button>
    </div>
    <canvas ref="canvas" class="game"></canvas>
    <Sidebar class="sidebar" :isPaused="gameConnector.output.state === 'waiting'" @iconClicked='handleIconClicked' />
  </div>
</template>

<script>
import Mario from '~/assets/images/play/player.png'
import Ground from '~/assets/images/play/ground.png'
import UFO from '~/assets/images/play/ufo.png'
import Background from '~/assets/images/play/background.png'
import game from '~/scripts/game'
import Sidebar from '~/components/play-views/sidebar'
export default {
  components: { Sidebar },
  data(){
    return {
      gameConnector: {
        output: {
          state: '',
          score: 0,
        }
      },
      gameController: function(state){return}
    }
  },
  mounted(){
    var assets = {
      playerImage: Mario,
      obsImage: UFO,
      groundImage: Ground,
      bgImage: Background
    };
    this.gameController = game(this.$refs.canvas, assets, this.gameConnector);
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
      // canvasEl.style.height = screenHeight + 'px';
      // canvasEl.style.width = screenWidth + 'px';
      // 自适应
      if(screenWidth > screenHeight*rate){
        canvasEl.style.height = screenHeight + 'px';
        canvasEl.style.width = (screenHeight*rate) + 'px';
      }else{
        canvasEl.style.width = screenWidth +'px';
        canvasEl.style.height = (screenWidth/rate) + 'px'
      }

    },
    changeGameState(state){
      this.gameController(state);
    },
    handleIconClicked(icon){
      this.changeGameState(icon);
    }
  }
}
</script>

<style lang='less' scoped>
#absolute-center-box{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
#center-title{
  text-align: center;
  font-size: 80px;
  #absolute-center-box();
}

.game-container{
  position: relative;
  overflow: hidden;
  height: 100%;
  margin: auto;
  width: max-content;
  & .ready-box{
    color: white;
    #center-title()
  }
  & .over-box{
    color: #f56c6c;
    #center-title()
  }
  & .sidebar{
    position: absolute;
    left: 0;
    top: 0;
    height: 90%;
  }
}

</style>