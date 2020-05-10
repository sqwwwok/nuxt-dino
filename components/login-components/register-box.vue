<template>
  <div class="login-box">
    <input-box :inputinfo="username" @input="checkUsername" />
    <input-box :inputinfo="password" @input="checkPassword"/>
    <input-box :inputinfo="passwordConfirmed" @input="confirmPassword(password.value)" />
    <input-box :inputinfo="email" @input="checkEmail" />
    <h3>{{ registerState }}</h3>
    <el-button 
    round type="primary" size="small" 
    :disabled="!formFinished" 
    @click="handleForm">Register</el-button>
    <!-- <input-box :inputinfo="verification" /> -->
  </div>
</template>

<script>
import inputBox from './input-box.vue'
import username from '~/assets/images/login/username.png'
import password from '~/assets/images/login/password.png'
import email from '~/assets/images/login/email.png'
import axios from 'axios'
export default {
  data () {
    return {
      username:{
        src:username,
        type:'text',
        placeholder:"Username",
        tip: "5-15位，可包含数字，字母，下划线",
        value: "",
        checked: false,
      },
      password:{
        src:password,
        type:'password',
        placeholder:"Password",
        tip: "8-20位，只能包含数字，字母，下划线",
        value: "",
        checked: false,
      },
      passwordConfirmed: {
        src: password,
        type: "password",
        placeholder: "Confirm your password",
        tip: "请再次输入密码",
        value: "",
        checked: false,
      },
      email:{
        src:email,
        type:'email',
        placeholder:'some@example.com',
        tip: "请输入验证邮箱",
        value:"",
        checked: false,
      },
      registerState: ""
    }
  },
  computed: {
    formFinished(){
      return this.username.checked
        &&this.password.checked
        &&this.passwordConfirmed.checked
        &&this.email.checked
    }
  },
  methods: {
    checkUsername(){
      if(
        this.username.value.replace(/[\w\d_]*/g,'')
        || this.username.value.length<5
        || this.username.value.length>15
      ){
        this.username.tip = "5-15位，只能包含数字，字母，下划线";
        this.username.checked = false;
      }else{
        axios.get(`/check?username=${this.username.value}`)
          .then(res=>{
            if(res.status==200){
              this.username.tip = '';
              this.username.checked = true;
            }else if(res.status==205){
              this.username.tip = '抱歉，该用户名已被使用';
              this.username.checked = false;
            }
          })
          .catch(err=>{
            this.username.tip = `网络请求出现问题：${err}`;
            this.username.checked = false;
          })
      } 
    },
    checkPassword(){
      if(
        this.password.value.replace(/[\w\d_]*/g,'')
        || this.password.value.length<8
        || this.password.value.length>20
      ){
        this.password.tip = "8-20位，只能包含数字，字母，下划线";
        this.password.checked = false;
      }else{
        this.password.tip = '';
        this.password.checked = true;
      }  
    },
    confirmPassword(correctPasswordValue){
      if(this.passwordConfirmed.value===''){
        this.passwordConfirmed.tip = "请再次输入密码";
        this.checked = false;
      }else if(this.passwordConfirmed.value===correctPasswordValue){
        this.passwordConfirmed.tip = "";
        this.passwordConfirmed.checked = true;
      }else{
        this.passwordConfirmed.tip = "两次输入的密码不一致";
        this.passwordConfirmed.checked = false;
      }
    },
    checkEmail(){
      if(this.email.value===''){
        this.email.tip = '请输入验证邮箱';
        this.email.checked = false;
      }else if(
        /^[\w\d]+@[\w\d]+\.[\w]+$/g.test(this.email.value)
        && this.email.value.length < 20
      ){
        this.email.tip = "";
        this.email.checked = true;
      }else{
        this.email.tip = "电子邮件地址错误";
        this.email.checked = false;
      }
    },
    handleForm () {
      const username = this.username.value,
        password = this.password.value,
        email = this.email.value;
      axios({
        method: 'get',
        url: '/register',
        params:{username,password,email}
      }).then(res=>{
        this.handleResponse(res);
      }).catch(err=>{
        this.registerState=`Something wrong: ${err}`
      });
      this.registerState = "Waiting for response..."
    },
    handleResponse(res){
      if(res.status===200){
        this.loginState = "Register Successed";
        this.$store.commit({
          type: 'recordUser',
          username: res.data.username,
          historys: [],
        });
        this.$router.push({path:'/home/index'});
      }else if(res.status===205){
        this.loginState = "Register Failed, check your password or username!"
      }
    }
  },
  components: {
    'input-box': inputBox
  }
}
</script>

<style scoped>
  .login-box{
    display: grid;
    row-gap: 13px;
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