<template>
  <div class="sidebar" @click="handleClick">
    <i class="el-icon-video-play" v-if="isPaused"></i>
    <i class="el-icon-video-pause" v-else></i>
    <i class="el-icon-refresh-left"></i>
    <i class="el-icon-setting"></i>
    <i class="el-icon-circle-close"></i>
  </div>
</template>

<script>
var map = new Map([
  ['el-icon-video-play', 'restart'],
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

<style scoped>
.sidebar{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
i{
  cursor: pointer;
  font-size: 32px;
  margin: 30px;
}
</style>