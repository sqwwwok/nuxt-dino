<template>
  <div class='play'>
    <message-box class="message-box" :msgViewed='msgViewed' @closeMsg='closeMsg' />
    <div class="start-box" v-if="!isGameRunning">
      <p>Are you ready ?</p>
      <el-button type="primary" @click="startGame">Go!!!</el-button>
    </div>
    <dino :isRunning="isGameRunning" class="dino" />
    <option-list class="option-list" @viewMsg="viewMsg" />
  </div>
</template>

<script>
import OptionList from '~/components/play-views/option-list'
import MessageBox from '~/components/play-views/message-box'
import Dino from '~/components/play-views/dino'
export default { 
  data () {
    return {
      isGameRunning: false,
      msgViewed: '',
    }
  },
  methods: {
    startGame(){
      this.isGameRunning = !this.isGameRunning;
    },
    viewMsg(msgName){
      this.msgViewed = msgName; 
    },
    closeMsg(){
      this.msgViewed = '';
    }
  },
  components: { 
    'message-box':MessageBox,
    'option-list': OptionList, 
    'dino': Dino 
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

.play{
  position: relative;
  height: 100%;
  
  & .message-box{
    #absolute-center();
    z-index: 3;
  }
  & .start-box{
    #absolute-center();
    z-index: 2;
  }
  & .dino{
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  & .option-list{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }

}


</style>