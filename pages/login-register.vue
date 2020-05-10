<template>
  <div class="switchbox" >
    <div class="option" @click="switchTo('login')">
      <a :class="{chosen:loginChosen}" class="login">Login</a>
    </div>
    <div class="option" @click="switchTo('register')">
      <a :class="{chosen:registerChosen}" class="register">Register</a>
    </div>
    <form class="form">
      <transition name='component-switch' mode='out-in'>
        <keep-alive>
          <component :is="componentId+'-box'"></component>
        </keep-alive>
      </transition>
    </form>
    
  </div>
</template>


<script>
import loginBox from '~/components/login-components/login-box';
import registerBox from '~/components/login-components/register-box'
export default {
  layout: 'home',
  data () {
    return {
      loginChosen: true,
      registerChosen: false,
      componentId: 'login',
    }
  },
  components:{
    'login-box':loginBox,
    'register-box':registerBox,
  },
  methods: {
    switchTo(descString){
      if(descString=='login'){
        this.loginChosen = true;
        this.registerChosen = false;
      }else{
        this.loginChosen = false;
        this.registerChosen = true;
      }
      this.componentId = descString;
    }
  }
}
</script>

<style>
.switchbox {
  background-color:#f5f5f5;
  display: inline-block;
  border: solid 3px;
  border-radius:10px;
}
.option{
  display: inline-block;
  width: 250px;
  font: 30px/50px times;
  background-color: Transparent;
  border-bottom: solid 3px ;
  cursor: pointer;
}
.login{
  border-top-left-radius: 10px;
  border-right: solid 3px;
}
.register{
  border-top-right-radius: 10px;
}
.chosen, a:hover{
  background-color:#409eff;
}
.component-switch-enter,.component-switch-leave-to{
  transform: translateX(70px);
  opacity: 0;
}
.component-switch-enter-active,.component-switch-leave-active{
  transition: all .5s;
}


</style>
