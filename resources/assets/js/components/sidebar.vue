<template>
  <el-aside style="background-color: rgb(238, 241, 246)">
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
  </el-aside>
</template>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>
