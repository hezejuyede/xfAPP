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
              placeholder="请选择查询的数据">
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
                  @row-click="doSeeCurve"
                  highlight-current-row
                  style="width: 98%;margin: auto">
          <template v-for="(col ,index) in cols">
            <el-table-column align="center" :prop="col.prop" :label="col.label"></el-table-column>
          </template>
        </el-table>
      </div>
    </div>
    <div class="upTop" ref="upTop" @click="upToTop">
      <i class="iconfont icon-xiangshang1"></i>
    </div>
    <Curve
      :xData="xData"
      :yData="yData"
      :isHideCurve="isHideCurve"
      :name="name"
      v-on:modalClose="modalClose"
      v-on:doSearchData="doSearchData"></Curve>
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
  import Curve from '../common/curve'
  import qs from 'qs'


  export default {
    name: 'ProductionExecution',
    data() {
      return {
        message: '',
        HideModal: true,
        isHideCurve: true,


        img: "",
        tag: "",

        select: "",
        selectOptions: [],

        tableData: [],
        cols: [],


        name: "",
        xData: [],
        yData: []
      }

    },
    components: {Loading, footerNav, Modal, headerNav, Curve},
    mounted() {
      this.showUp();
      this.showSearch();
      this.bianse();
    },
    computed: {},
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
          axios.post(" " + realTimeUrl + "/api/showTableTitle.ashx", qs.stringify({"name": "realTime"})),
          axios.post(" " + realTimeUrl + "/api/showContextList.ashx", qs.stringify({"id": data}))
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
          this.$router.push("/UserLogin")
        }
        else {
          let that = this;
          axios.all([
            axios.post(" " + realTimeUrl + "/api/getRealTimeSelect.ashx"),
          ])
            .then(axios.spread(function (select) {
              that.select = select.data[0].id;
              that.selectOptions = select.data;
              that.loadingShowData(1);
            }));
        }
      },


      //关闭曲线页面
      modalClose(val) {
        this.isHideCurve = val;
      },

      //查看曲线
      doSeeCurve(row, column, event) {
        this.tag = row.tag;
        if (this.tag) {
          axios.post(" " + realTimeUrl + "/api/getNowRealTimeCure.ashx", qs.stringify({
            "tag": this.tag
          }))
            .then((res) => {

              let a = [];
              let b = [];
              for (let i = 0, l = res.data.xData.length; i < l; i++) {
                a.push(res.data.xData[i])
              }
              for (let i = 0, l = res.data.yData.length; i < l; i++) {
                b.push(res.data.yData[i])
              }

              this.xData = a;
              this.yData = b;
              this.name = res.data.name;
              console.log(this.xData);
              console.log(this.yData);
              console.log(this.name);
              setTimeout(()=>{
                this.isHideCurve = false;
              },4000)

            })
            .catch((err) => {

              console.log(err)
            });
        }
        else {
          this.message = "该数据没有找出测点";
          this.HideModal = false;
          const that = this;

          function a() {
            that.message = "";
            that.HideModal = true;
          }

          setTimeout(a, 2000);
        }
      },


      //根据数据进行曲线查询
      doSearchData(val) {
        if (val) {
          axios.post(" " + realTimeUrl + "/api/getRealTimeCure.ashx", qs.stringify({
            "startTime": val.startTime,
            "endTime": val.endTime
          }))
            .then((res) => {
              this.xData = res.data.xData;
              this.yData = res.data.yData;
              this.name = res.data.name;
              this.isHideCurve = true;
            })
            .catch((err) => {
              console.log(err)
            });
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
    width: 100%;
    height: 100%;
    background-color: #d93f30;

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
