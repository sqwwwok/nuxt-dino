<template>
  <el-form 
  label-position="top" 
  class="card-body"
  :model="formData">
    <el-form-item label="您遇见的问题或想提的建议">
      <el-input 
      type="textarea" 
      placeholder="Your advice"
      v-model="formData.advice">
      </el-input>
    </el-form-item>
    <el-form-item label="您的联系方式（方便问题的进一步解决）">
      <el-input
      placeholder="your contact"
      v-model="formData.contact">
      </el-input>
    </el-form-item>
    <el-form-item :label="submitInfo">
      <el-button 
      type="primary" 
      :disabled='!formData.advice'
      @click="handleForm(formData.advice,formData.contact)">
        Submit
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Axios from 'axios'
export default {
  data () {
    return {
      formData: {
        advice: '',
        contact: ''
      },
      submitInfo: ''
    }
  },
  methods: {
    handleForm (advice, contact) {
      Axios.get(`/advise?advice=${advice}&contact=${contact}`)
        .then(res => {
          if (res.status === 200) {
            this.submitInfo = '已经收到您的反馈，请耐心等待~'
          }
        })
        .catch(err => this.submitInfo = `Something wrong...${err}`)
    }
  }
}
</script>

<style scoped>
</style>