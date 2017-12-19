<template>
<el-row>
<el-col :span="3" :offset="3">
    <el-menu>
        <el-submenu index="1">
          <template slot="title">试题管理</template>
          <el-menu-item index="1-1">科目管理</el-menu-item>
          <el-menu-item index="1-2">题型管理</el-menu-item>
          <el-menu-item index="1-2">有效题目管理</el-menu-item>
          <el-menu-item index="1-2">停用题目管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">试卷管理</template>
          <el-menu-item index="1-1">试卷类型</el-menu-item>
          <el-menu-item index="1-2">随机组卷</el-menu-item>
          <el-menu-item index="1-2">试卷列表</el-menu-item>
        </el-submenu>

    </el-menu>
</el-col>
<el-col :span="6" :offset="1" class="toolbar">
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>活动管理</el-breadcrumb-item>
  <el-breadcrumb-item>{{test}}</el-breadcrumb-item>
  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
  </el-breadcrumb>
</el-col>
</el-row>
</template>

<script>
  export default {
    data() {
      return {
        test: "dfdf"
      }
    }
  };
</script>
<style scoped>

</style>
