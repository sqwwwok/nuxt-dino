<template>
  <div class='main'>
    <div class="game-name">Adventure</div>
    <nuxt class="index-or-login" />
  </div>
</template>

<script>
	export default {}
</script>

<style scoped>
.main {
	position: relative;
  background: url('~assets/images/bg.png'); 
	height: 100%;
}
.game-name{
  color: black;
  font: 800 60px times,arial;
  position: absolute;
  left: 25%;
  top: 40px;
  transform: translateX(-50%);
  text-shadow: 5px 5px 5px #409eff;
}
.index-or-login{
  position: absolute;
  left: 25%;
  top: 150px;
  transform: translateX(-50%);
}
</style>
