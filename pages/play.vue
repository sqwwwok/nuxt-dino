<template>
  <div class='play'>
    <Game :state="state" class="dino" />
  </div>
</template>

<script>
import Game from '~/components/play-views/game'
export default { 
  components: { 
    Game 
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

  & .dino{
    #absolute-center();
    width: 100%;
    height: 100%;
    z-index: 1;
  }

}


</style>