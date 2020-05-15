<template>
  <div class="setting-box">
    <div class="header">
      <div class="title">Setting</div>
      <i class="el-icon-circle-close close" @click="cancelChange"></i>
    </div>
    <div class="body">
      <div class="settings">
        <div class="setting" v-for="setting in currentSetting" :key="setting.name">
          <div class="name">{{ setting.name }}</div>
          <el-switch class="switch"
            v-model="setting.value"
            active-color="#409EFF"></el-switch>
        </div>
      </div>
      <div class="buttons">
        <el-button type="primary" @click="uploadChange">Apply</el-button>
        <el-button type="info" @click="cancelChange">Cancel</el-button>
      </div>
    </div>
  </div>
</template>

<script>
var defaultSetting = [
  {name: 'Full Screen', value: false},
  {name: 'BGM', value: false},
];
export default {
  props: {
    originSetting: Array
  },
  data (){
    return {
      defaultSetting,
      currentSetting: JSON.parse(JSON.stringify(this.originSetting))
    }
  },
  methods: {
    uploadChange () {
      this.$emit('changeSetting',JSON.parse(JSON.stringify(this.currentSetting)));
    },
    cancelChange () {
      this.$emit('changeSetting',null)
    }
  }
}
</script>

<style lang="less" scoped>
.setting-box{
  padding: 20px;
  border-radius: 20px;
  background-color: #eff8e7;
  & .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 2px black;
    margin-bottom: 40px;
    & .title{
      font-size: 35px;
    }
    & .close{
      cursor: pointer;
      font-size: 35px;
    }
  }
  & .body{
    & .settings{
      display: grid;
      gap: 20px;
      & .setting{
        display: grid;
        grid-template-columns: 2fr 1fr;
        & .name{
          text-align: center;
        }
      }
    }
    & .buttons{
      margin-top: 40px;
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>