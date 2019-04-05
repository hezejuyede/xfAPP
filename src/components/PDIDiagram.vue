<template>
  <div class="template">
    <header-nav></header-nav>
    <div class="contentDiv" ref="contentDivHeight">
      <div class="contentLeft">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
      <div class="contentRight">
      </div>
    </div>
    <Modal :msg="message"
           :isHideModal="HideModal"></Modal>
    <div class="loading-container" v-show="!img">
      <loading></loading>
    </div>
    <footer-nav></footer-nav>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import realTimeUrl from '../assets/js/realTimeUrl'
  import headerNav from '../common/header'
  import footerNav from '../common/footer'
  import Loading from '../common/loading'
  import Modal from '../common/modal'
  import qs from 'qs'
  import {getNowTime} from '../assets/js/api'

  export default {
    name: 'ProductionExecution',
    data() {
      return {
        message: '',
        HideModal: true,
        img: "",

        data: [
          {
            label: '一级 1',
            children: [{
              label: '二级 1-1',
              children: [{
                label: '三级 1-1-1'
              }]
            }]
          },
          {
            label: '一级 2',
            children: [{
              label: '二级 2-1',
              children: [{
                label: '三级 2-1-1'
              }]
            }, {
              label: '二级 2-2',
              children: [{
                label: '三级 2-2-1'
              }]
            }]
          },
          {
            label: '一级 3',
            children: [
              {
                label: '二级 3-1',
                children: [{
                  label: '三级 3-1-1'
                }]
              },
              {
                label: '二级 3-2',
                children: [{
                  label: '三级 3-2-1'
                }]
              }
            ]
          }
        ],

        defaultProps: {
          children: 'children',
          label: 'label'
        }


      }

    },
    components: {Loading, footerNav, Modal, headerNav},
    mounted() {
      this.setTableHeight();

    },
    computed: {

    },
    created() {
      //检索用户状态
      this.getAdminState();

      //让旋转图片旋转一秒钟
      setTimeout(() => {
        this.getLoading();
      }, 1000);


    },
    methods: {
      //旋转的图片
      getLoading() {
        this.img = ["1"]
      },

      //根据屏幕设置Table高度
      setTableHeight() {
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          var H = window.screen.height;
          let div = this.$refs.contentDivHeight;
          div.style.height = H - 150 + "px";
        }
        else {
          var h = document.body.clientHeight;
          let div = this.$refs.contentDivHeight;
          div.style.height = h - 150 + "px";
        }

      },


      //改变数据瞬间显示数据
      loadingShowData(data) {
        let that = this;
        axios.all([
          axios.post(" " + realTimeUrl + "/api/showTableTitle.ashx", qs.stringify({"name": "reportForm"})),
          axios.post(" " + realTimeUrl + "/api/showReportFormContextList.ashx", qs.stringify({
            "id": data,
            "time": this.time
          }))
        ])
          .then(axios.spread(function (title, table) {
            that.cols = title.data;
            that.tableData = table.data;
          }));
      },

      //页面加载检查用户是否登陆，没有登陆就加载登陆页面
      getAdminState() {
        const userInfo = sessionStorage.getItem("userInfo");
        if (userInfo === null) {
          this.$router.push("/userLogin")
        }
        else {
          let that = this;
          this.time = getNowTime();
          axios.all([
            axios.post(" " + realTimeUrl + "/api/getSelectReportForm.ashx"),
          ])
            .then(axios.spread(function (select) {
              that.select = select.data[0].id;
              that.selectOptions = select.data;
              that.loadingShowData(1);
            }));
        }
      },


      handleNodeClick(data) {
        console.log(data);
      }




    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../assets/less/base";

  .template {
    margin-bottom: 80px;
    .contentDiv {
      width: 100%;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }

  @media only screen and (max-width: 900px) {

  }


</style>

