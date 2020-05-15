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
    <transition name='setting'>
      <Setting class="setting-box"
        v-if="isSettingOpen"
        :originSetting="gameConfig" 
        @changeSetting="handleSetting" />
    </transition>
    <Sidebar class="sidebar" :isPaused="gameConnector.output.state === 'waiting'" @iconClicked='handleIconClicked' />
  </div>
</template>

<script>
import player from '~/assets/images/play/player.png'
import ground from '~/assets/images/play/ground.png'
import ufo from '~/assets/images/play/ufo.png'
import bg from '~/assets/images/play/background.png'
import game from '~/scripts/game'
import Sidebar from '~/components/play-views/sidebar'
import Setting from '~/components/play-views/setting'
export default {
  components: { Sidebar, Setting },
  data(){
    return {
      gameConnector: {
        input: {
          config: {}
        },
        output: {
          state: '',
          score: 0,
        }
      },
      gameController: function(state){},
      gameConfig: [
        {name: 'Full Screen', value: false},
        {name: 'BGM', value: false},
      ],
      isSettingOpen: false,
    }
  },
  mounted(){
    var assets = {
      playerImage: player,
      obsImage: ufo,
      groundImage: ground,
      bgImage: bg
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
      if(this.gameConfig[0].value){
        canvasEl.style.height = screenHeight + 'px';
        canvasEl.style.width = screenWidth + 'px';
      }else{
        if(screenWidth > screenHeight*rate){
          canvasEl.style.height = screenHeight + 'px';
          canvasEl.style.width = (screenHeight*rate) + 'px';
        }else{
          canvasEl.style.width = screenWidth +'px';
          canvasEl.style.height = (screenWidth/rate) + 'px'
        }        
      }
    },
    changeGameState(state){
      this.gameController(state);
    },
    handleIconClicked(icon){
      this.changeGameState(icon);
      if(icon==='setting'){
        this.isSettingOpen = !this.isSettingOpen;
      }
    },
    handleSetting(setting){
      if(setting){
        this.gameConfig = setting;
        this.scaleCanvas();
      }
      this.isSettingOpen = false;
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
  & .setting-box{
    #absolute-center-box();
    z-index: 2;
    width: 50%;
  }
}

.setting-enter-active, .setting-leave-active{
  transition: all .3s ease;
}
.setting-enter, .setting-leave-to{
  opacity: 0;
  transform: translateX(100px);
}
</style>