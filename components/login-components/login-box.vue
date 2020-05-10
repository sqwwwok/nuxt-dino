<template>
  <div class="login-box">
    <input-box :inputinfo="username" @input="checkUsername" />
    <input-box :inputinfo="password" @input="checkPassword"/>
    <!-- <input-box :inputinfo="verification"/> -->
    <h3>{{ loginState }}</h3>
    <el-button 
    round type="primary" size="small" 
    :disabled="!formFinished" 
    @click="handleForm">Login</el-button>
  </div>
</template>

<script>
import username from '~/assets/images/login/username.png'
import password from '~/assets/images/login/password.png'
import inputBox from './input-box.vue'
import Axios from 'axios'

export default {
  data () {
    return {
      username:{
        src:username,
        type:'text',
        placeholder:"Username",
        value: "",
        tip: "",
        checked: false,
      },
      password:{
        src:password,
        type:'password',
        placeholder:"Password",
        value: "",
        tip: "",
        checked: false,
      },
      loginState: "",
    }
  },
  computed: {
    formFinished(){
      return this.username.checked&&this.password.checked
    }
  },
  methods:{
    checkUsername(){
      if(this.username.value===""){
        this.username.tip = "请输入用户名";
        this.username.checked = false;
      }else if(
        this.username.value.replace(/[\w\d_]*/g,'')
        || this.username.value.length<5
        || this.username.value.length>15
      ){
        this.username.tip = '输入的用户名不正确';
        this.username.checked = false;
      }else{
        this.username.tip = "";
        this.username.checked = true;
      } 
    },
    checkPassword(){
      if(this.password.value===""){
        this.password.tip = "请输入密码";
        this.password.checked = false;
      }else if (
        this.password.value.replace(/[\w\d_]*/g,'')
        || this.password.value.length<8
        || this.password.value.length>20
      ){
        this.password.tip = '输入的密码不正确';
        this.password.checked = false;
      }else{
        this.password.tip = "";
        this.password.checked = true;
      } 
    },
    handleForm(){
      // el-button的disable会阻止click事件，下一行可省略
      // if(!this.formFinished) return alert("请输入用户名和密码")
      Axios.get(`/login?username=${this.username.value}&password=${this.password.value}`)
      .then(res => this.handleResponse(res))
      .catch(err => this.loginState=`Something wrong: ${err}`);
      this.loginState = "Waiting for response..."
    },
    handleResponse (res) {
      if(res.status===200){
        this.loginState = "Login Successed";
        this.$store.commit({
          type: 'recordUser',
          username: res.data.username,
          historys: res.data.historys,
        });
        this.$router.push({path:'/'});
      }else if(res.status===205){
        this.loginState = "Login failed, check your password or username!"
      }
    },
  },
  components:{
    'input-box': inputBox,
  },
}
</script>

<style scoped>
  .login-box{
    display: grid;
    row-gap: 20px;
    padding-top: 20px;
  }
  button{
    height: 40px;
    width: 100px;
    font: 19px arial;
    margin: auto;
    margin-bottom: 8px;
}
</style>