<template>
  <div class="template">
    <header-nav></header-nav>
    <div class="contentDiv" ref="contentDivHeight">
      <div :class="{'contentLeft':this.left===true,'leftHide':this.left===false}">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
      <div :class="{'contentRight':this.right===true,'rightMoveHome':this.right===false}">
        <div class="contentLeftChange fl" @click="showHideLeft">
          <i class="iconfont icon-xiangzuo"></i>
        </div>
        <object classid="clsid:4F26B906-2854-11D1-9597-00A0C931BFC8"
                id="Pbd1"
                width="100%"
                height="100%">
          <param name="_cx" value="24262">
          <param name="_cy" value="16140">
          <param name="ServerIniURL" value>
          <param name="DisplayURL" :value="pdiUrl">
        </object>
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
  import URL from '../assets/js/URL'
  import headerNav from '../common/header'
  import footerNav from '../common/footer'
  import Loading from '../common/loading'
  import Modal from '../common/modal'
  import qs from 'qs'

  export default {
    name: 'ProductionExecution',
    data() {
      return {
        message: '',
        HideModal: true,
        img: "",
        pdiUrl:"",

        data: [
          {
            label: '一级 1',
            children: [
              {
                label: '二级 1-1',
                children: [
                  {label: '三级 1-1-1'}
                ]
              }
              ]
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
        left:true,
        right:true,
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

      //请求得到左侧树形导航
      this.getLeftList()


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

        }
      },


      handleNodeClick(data) {
        console.log(data);
      },


      getLeftList() {
        axios.post(" " + URL + "/api/HomeLeftNav")
          .then((res) => {
            console.log(res.data)

          })
          .catch((err) => {

          })
      },

      showHideLeft() {
        if(this.left===false){
          this.left=true;
          this.right=true;
        }
        else if(this.left===true){
          this.left=false;
          this.right=false;
        }
      }

    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../assets/less/base";

  .template {
    overflow-x: hidden;
    overflow-y: hidden;
    position: relative;
    .contentDiv {
      width: 100%;
      position: relative;
      .leftHide{
        position: relative;
        left:-200px;
        top: 0;
        width: 200px;
        height: 98%;
        border: 1px solid @color-background-dd;
        overflow-x:auto;
        overflow-y:auto;
        transition: all 1.5s;
      }
      .contentLeft{
        position: relative;
        left:0;
        top: 0;
        width: 200px;
        height: 100%;
        border: 1px solid @color-background-dd;
        overflow-x:auto;
        overflow-y:auto;
        transition: all 1.5s;

      }
      .contentRight{
        position:absolute;;
        top: 0;
        left: 200px;
        height: 100%;
        width: 99%;
        transition: all 1.5s;
      }
      .rightMoveHome{
        position:absolute;;
        top: 0;
        left:0;
        height: 100%;
        width: 100%;
        transition: all 1.5s;
      }
      .contentLeftChange{
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: @color-bg-lv;
        color: @color-white;
        border-radius: 50%;
        margin: 10px;
        cursor: pointer;
      }
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

