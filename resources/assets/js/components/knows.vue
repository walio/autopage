<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="knowsid" label="id" width="180"></el-table-column>
    <el-table-column prop="knowslevel" label="名称" width="180"></el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
  </el-table>
</template>
<script>
export default {
  mounted() {
    function getQueryString(name) {
      let reg = `(^|&)${name}=([^&]*)(&|$)`
      let r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    }
    console.log(123)
    this.$http('/knows?id='+getQueryString("knowsid")).then((res)=>{
      console.log(res)
    })

  },
  data() {
    return {
      knowslevel1: "知识类",
      knowslevel2: "知识体",
      knowslevel3: "知识域",
      knowslevel4: "知识子域",
      tableData:[{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  methods: {
    getknowsdetail(knowsid){
      $http.get("knows?id="+knowsid).then((response)=>(
        console.log(response)
      ))
    }
  }
}
</script>
