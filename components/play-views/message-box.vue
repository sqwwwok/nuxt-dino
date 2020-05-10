<template>
  <div class="messages">
    <div class="start-card" v-show="startCard">
      Are you ready ?
      <br />
      <el-button class="start-button" type="primary" @click="startGame">
        Go!!!
      </el-button>
    </div>
    <el-card class="message-card" v-show="!startCard&&componentId">
      <div slot="header">
        <span>{{ componentId }}</span>
        <i class="close-icon el-icon-circle-close"
          @click="closeMessage"></i>
      </div>
      <transition name="message-change" mode="out-in">
        <component 
        :is='componentId'
        ></component>
      </transition>
    </el-card>   
  </div>   
</template>

<script>
import Character from '../message-content/Character'
import Pocket from '../message-content/Pocket'
import Skill from '../message-content/Skill'
import System from '../message-content/System'
export default {
  props: {
    startCard: Boolean,
    componentId: String
  },
  methods: {
    startGame(){
      this.$emit('start');
    },
    closeMessage(){
      this.$emit('closeMessage');
    }
  },
  components: {
    Character,Pocket,Skill,System 
  }
}
</script>

<style scoped>
.messages .start-card{
  font-size: 90px;
  width: max-content;
}
.messages .start-card .start-button{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 30px;
  font-size: 25px;
}
.messages .message-card .close-icon{
  float: right;
}
</style>