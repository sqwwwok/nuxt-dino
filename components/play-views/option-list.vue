<template>
  <el-row class="container">
    <el-button 
      v-for="(buttonName,index) of buttons" 
      :key="index" 
      @click="$emit('query',buttonName)"
      type="info" size="middle" round>
      {{ buttonName }}
    </el-button>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      buttons: ['Character','Pocket','Skill','System']
    }
  }
}
</script>

<style scoped>
.container{
  display: flex;
  justify-content: space-around;
}
</style>