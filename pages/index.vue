<template>
  <div class="index">
    <ul>
      <li v-for="button in buttonList" :key="button.id">
        <el-button @click="handleClick(button.text)"
        type="primary" class="button" round
        >
          {{ button.text }}
          <i class="el-icon-arrow-right"></i>
        </el-button>
      </li>
    </ul>
    <el-card class="index-content">
      <div slot="header">
        <span>{{ componentText }}</span>
      </div>
      <transition name="index-change" mode="out-in">
        <component 
        :is='componentText'
        ></component>
      </transition>
    </el-card>
  </div> 
</template>


<script>
import History from '~/components/index-content/History'
import Help from '~/components/index-content/Help'
import Feedback from '~/components/index-content/Feedback'
export default {
  layout: 'home',
  data () {
    return { 
      buttonList:[
        {text:'Play',id:0},
        {text:'History',id:1},
        {text:'Help', id:2},
        {text:'Feedback',id:3},
        {text:'Exit',id:4},
      ],
      componentText: 'History', 
    }
  },
  created(){
    if(this.$store.state.userData.historys.length===0){
      this.handleClick('Help');
    }
  },
  components: {
    History,Help,Feedback
  },
  methods: {
    handleClick(descString){
      if(descString==='Play'){
        this.$router.push('/play')
      }else if(descString==='Exit'){
        this.$confirm('Are you sure to exit?','',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          // exit
        })
      }else{
        this.componentText = descString;
      }
    }
  },
}
</script>

<style scoped>
ul{
  list-style: none;
  display: inline-block;
}
.button{
  font-size: 22px;
  width: 170px;
  margin-top: 40px;
  top: 50%;
  transform: translateY(-50%);
  }
.index-content{
  position: absolute;
  display: inline-block;
  margin-left: 130%;
  width: 500px;
}
.index-content .el-icon-circle-close{
  cursor: pointer;
  float: right;
}
.index-change-enter-active,.index-change-leave-active{
  transition: all .4s;
}
.index-change-enter,.index-change-leave-to{
  transform: translateX(150px);
  opacity: 0;
}
</style>