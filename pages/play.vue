<template>
  <div class='play'>
    <MessageBox class="message-box" :msgViewed='msgViewed' @closeMsg='closeMsg' />
    <Game :state="state" class="dino" />
    <OptionList class="option-list" @viewMsg="viewMsg" />
  </div>
</template>

<script>
import OptionList from '~/components/play-views/option-list'
import MessageBox from '~/components/play-views/message-box'
import Game from '~/components/play-views/game'
export default { 
  data () {
    return {
      msgViewed: '',
      state: ''
    }
  },
  methods: {
    viewMsg(msgName){
      this.msgViewed = msgName;
      this.state = 'pause'
    },
    closeMsg(){
      this.msgViewed = '';
      this.state = 'restart'
    }
  },
  components: { 
    MessageBox, OptionList, Game 
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
  & .dino{
    #absolute-center();
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  & .option-list{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 2;
  }

}


</style>