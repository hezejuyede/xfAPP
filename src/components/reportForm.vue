<template>
  <div class="template">
    <header-nav></header-nav>
    <div class="contentDiv">
      <div class="contentTop" ref="contentTop">
        <div class="listSearch">
          <div class="listSearchSelect">
            <el-select
              v-model="select"
              clearable
              filterable
              allow-create
              default-first-option
              @change="changeSelect"
              placeholder="请输入或者选择变电站">
              <el-option
                v-for="item in selectOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="listSearchBtn">
            <el-button type="success" icon="search" @click="doSearch">查询</el-button>
          </div>
        </div>
      </div>
      <div class="contentBottom">
        <el-table class="tb-edit"
                  :data="tableData"
                  :header-cell-style="{background:'#A1D0FC',color:'rgba(0, 0, 0, 0.8)',fontSize:'14px'}"
                  border
                  @select="selectList"
                  highlight-current-row
                  style="width: 98%;margin: auto">
          <el-table-column
            type="selection"
            width="30">
          </el-table-column>
          <template v-for="(col ,index) in cols">
            <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
          </template>
        </el-table>
      </div>
    </div>
    <div class="upTop" ref="upTop" @click="upToTop">
      <i class="iconfont icon-xiangshang1"></i>
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
  import url from '../assets/js/URL'
  import headerNav from '../common/header'
  import footerNav from '../common/footer'
  import Loading from '../common/loading'
  import Modal from '../common/modal'

  export default {
    name: 'ProductionExecution',
    data() {
      return {
        message: '',
        HideModal: true,

        img: "",

        select: "",
        selectOptions: [],

        tableData: [],
        cols: [],
      }

    },
    components: {Loading, footerNav, Modal, headerNav},
    mounted() {
      this.showUp();
      this.showSearch();
      this.bianse();
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
      //改变数据瞬间显示数据
      loadingShowData(data) {
        let that = this;
        axios.all([
          axios.post(" " + url + "/api/showTableTitle", {"name": "yx"}),
          axios.post(" " + url + "/api/showContextList", {"id": this.select})
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
          axios.all([
            axios.post(" " + url + "/api/getSelect", {"id": ""}),
          ])
            .then(axios.spread(function (select) {
              that.select = select.data[0].id;
              that.selectOptions = select.data;
              that.loadingShowData(1);
            }));
        }
      },


      //改变下拉显示数据
      changeSelect() {
        if (this.select) {
          this.loadingShowData(this.select)
        }
        else {
          this.message = "下拉选择不能为空";
          this.HideModal = false;
          const that = this;
          function a() {
            that.message = "";
            that.HideModal = true;
          }
          setTimeout(a, 2000);

        }
      },

      //进行查询
      doSearch() {
        if (this.select) {
          this.loadingShowData(this.select)
        }
        else {
          this.message = "下拉选择不能为空";
          this.HideModal = false;
          const that = this;
          function a() {
            that.message = "";
            that.HideModal = true;
          }
          setTimeout(a, 2000);

        }
      },

      //选择
      selectList(val) {
        if (val.length) {
          let data = [];
          for (let i = 0; i < val.length; i++) {
            let a = val[i].id;
            data.push(a)
          }
          this.listData = data;
        }
      },

      //全选
      selectAll(val) {
        if (val.length) {
          let data = [];
          for (let i = 0; i < val.length; i++) {
            let a = val[i].id;
            data.push(a)
          }
          this.listData = data;
        }

      },


      //移动显示搜索框
      showSearch() {
        let search = this.$refs.contentTop;
        let searchHight = this.$refs.contentTop.offsetHeight;
        window.addEventListener('scroll', () => {
          let top = window.scrollY;
          if (top > searchHight) {
            search.style.width = "100%";
            search.style.position = "fixed";
            search.style.top = 0;
            search.style.zIndex = 999;
          } else if (top <= searchHight) {
            search.style.position = "";
          }
        })
      },

      //搜索框变色
      bianse() {
        let search = this.$refs.contentTop;
        let searchHight = this.$refs.contentTop.offsetHeight;
        window.addEventListener('scroll', () => {
          let top = window.scrollY;
          if (top > searchHight) {
            search.style.background = "rgba(216, 229, 246,1)"
          }
          else {
            let op = (top / searchHight) * 0.85;
            if (op > 0) {
              search.style.background = "rgba(216, 229, 246," + op + ")";
            }
            else {
              search.style.background = "rgba(216, 229, 246,1)"
            }
          }
        })

      },

      //显示向上按钮
      showUp() {
        let height = this.$refs.contentTop.offsetHeight;
        let upTop = this.$refs.upTop;
        window.addEventListener('scroll', () => {
          let top = window.scrollY;
          if (top >= height) {
            upTop.style.display = "block"
          }
          else if (top < height) {
            upTop.style.display = "none"
          }
        });

      },

      //点击向上
      upToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      },


    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../assets/less/base";

  .template {
    margin-bottom: 80px;
    .contentTop {
      height: 80px;
      width: 100%;
      background-color: #D8E5F6;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      .listSearch {
        width: 95%;
        display: flex;
        .listSearchSelect {
          flex: 3;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .listSearchBtn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          .el-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 35px;
            margin-left: 2%;
          }
        }

      }
    }
    .contentBottom {

    }

  }

  .upTop {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 50%;
    display: none;
    position: fixed;
    bottom: 80px;
    right: 20px;
    z-index: 999;
    background-color: @color-background-d;
    cursor: pointer;
    color: @color-white;
    i {
      font-size: @font-size-large-xxx;
    }

  }

  .container {
    .containerDiv {
      width: 95%;
      height: 70%;
      margin: 0 auto;
      .select {
        width: 16%;
        height: 50px;
        margin-left: 0.6%;
        .el-select {
          width: 100%;
          font-size: 12px;
        }

      }
    }
    .containerBtn {
      height: 20%;
      width: 95%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20%;
        height: 35px;
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
