<template>
  <div class="sidebar" @click="handleClick">
    <div class="icon-container" v-if="isPaused">
      <i class="el-icon-video-play"></i>
      <p>play</p>
    </div>
    <div class="icon-container" v-else>
      <i class="el-icon-video-pause"></i>
      <p>pause</p>
    </div>
    <div class="icon-container">
      <i class="el-icon-refresh-left"></i>
      <p>retry</p>
    </div>
    <div class="icon-container">
      <i class="el-icon-setting"></i>
      <p>setting</p>
    </div>
    <div class="icon-container">
      <i class="el-icon-circle-close"></i>
      <p>exit</p>
    </div>
  </div>
</template>

<script>
var map = new Map([
  ['el-icon-video-play', 'continue'],
  ['el-icon-video-pause', 'pause'],
  ['el-icon-refresh-left', 'replay'],
  ['el-icon-setting', 'setting'],
  ['el-icon-circle-close', 'exit'],
])
export default {
  props: {
    isPaused: Boolean
  },
  methods: {
    handleClick (event) {
      var icon = map.get(event.target.className)
      if(icon) this.$emit('iconClicked',icon);
    }
  }
}
</script>

<style lang='less' scoped>
.sidebar{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  
  & .icon-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    & i{
      cursor: pointer;
      font-size: 32px;
    }
    & p{
      text-align: center;
    }
  }
}
</style>