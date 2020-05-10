<template>
  <div class="card-body">
    <el-table
    :data="historys"
    style="width:100%">
      <el-table-column
      prop="time"
      label="Time">
      </el-table-column>
      <el-table-column
      prop="score"
      label="Score">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    const historys = this.$store.state.userData.historys
    return { historys }
  }
}
</script>

<style>
</style>