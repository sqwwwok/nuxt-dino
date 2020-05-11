<template>
  <transition name="msg-show">
    <el-card class="message-card" v-show="msgViewed" >
    <div slot="header">
      <span>{{ msgViewed }}</span>
      <i class="close-icon el-icon-circle-close"
        @click="closeMsg"></i>
    </div>
    <transition name="msg-change" mode="out-in">
      <component :is='msgViewed'></component>
    </transition>
    </el-card>    
  </transition>
</template>

<script>
import Character from './message-content/Character'
import Pocket from './message-content/Pocket'
import Skill from './message-content/Skill'
import System from './message-content/System'
export default {
  props: ['msgViewed'],
  methods: {
    closeMsg(){
      this.$emit('closeMsg');
    }
  },
  components: {
    Character,Pocket,Skill,System 
  }
}
</script>

<style scoped>
.msg-show-enter-active, .msg-show-leave-active{
  transition: all 1s;
}
.msg-show-enter, .msg-show-leave-to{
  transform: translateX(-100px);
  opacity: 0;
}
.msg-change-enter-active, .msg-change-leave-active{
  transition: all 2s;
}
.msg-change-enter, .msg-change-leave-to{
  opacity: 0;
  transform: translateY(-500px);
}
</style>