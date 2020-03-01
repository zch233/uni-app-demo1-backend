<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="11">
        <el-card class="box-card">
          1
        </el-card>
      </el-col>
      <el-col :span="12" :offset="1">
        <el-card class="box-card">
          2
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
