<template>
  <div class="index">
    <header>
      <div class="headerTitle">
        <div class="headerTitleLogo">
          <img src="../assets/img/xf.png" alt="">
        </div>
        <div class="headerTitleText">
          <div class="headerTitleTextTop">湖北兴发化工集团股份有限公司</div>
          <div class="headerTitleTextBottom">PI实时数据分析系统</div>
        </div>
      </div>
    </header>
    <main>
      <div id="banner">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(item,index) in bannerImg" :key="item.id">
            <img :src="item.img"
                 style="width: 100%"
                 @click="showBanner(index,item.id,item.sindex)">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>
      </div>
      <div class="navigation">
        <div class="IconTemplate" v-for="(item , index) in iconData" @click="goToPage(index,item.url)">
          <i :class=" item.icon"></i>
          <span>{{item.text}}</span>
        </div>
      </div>
    </main>
    <footer-view></footer-view>
    <div class="loading-container" v-show="!img.length">
      <loading></loading>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import FooterView from '../common/footer';
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import Loading from '../common/loading';

  require('swiper/dist/css/swiper.css');

  export default {
    name: 'index',
    data() {
      return {
        img: '',
        iconData: [
          {"icon": "iconfont icon-huabanfuben", "text": "实时数据", "url": "/RealTimeData"},
          {"icon": "iconfont icon-tongjibaobiao", "text": "实时报表", "url": "/ReportForm"},
          {"icon": "iconfont icon-Processdefinition", "text": "流程图形", "url": "/PDIDiagram"},
        ],
        bannerImg: [
          {"img": require("../assets/img/1.jpg")},
          {"img": require("../assets/img/2.jpg")},
          {"img": require("../assets/img/3.jpg")}
        ],
        swiperOption: {
          direction: "horizontal",
          loop: true,
          pagination: ".swiper-pagination",
          prevButton: ".swiper-button-prev",
          nextButton: ".swiper-button-next",
          autoplay: 3000,
          autoplayDisableOnInteraction: false,
        }
      }
    },
    components: {FooterView, swiper, swiperSlide, Loading},
    mounted() {
    },
    created() {
      this.getAdminState()
      setTimeout(() => {
        this.getLoading();
      }, 1000);
    },
    methods: {
      //页面加载检查用户是否登陆，没有登陆就加载登陆页面
      getAdminState() {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo === null) {
          this.$router.push("/UserLogin")
        }
        else {

        }
      },



      getLoading() {
        this.img = ["1"]
      },

      goToPage(index,url){
        localStorage.setItem("IndexUrl", index+1);
        this.$router.push(url)
      }
    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../assets/less/base";

  .index {
    width: 100%;
    height: 100%;
    header{
      height: 80px;
      background-color: @color-white;
      .headerTitle{
        display: flex;
        align-items: center;
        justify-content: center;
        .headerTitleLogo{
          img{
            height:80px;
          }
        }
        .headerTitleText{
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          .headerTitleTextTop{
            font-size: @font-size-medium-x;
            margin-bottom: 5px;
            color: #25201E;
          }
          .headerTitleTextBottom{
            font-size: @font-size-medium;
            color: #25201E;
          }

        }

      }
    }
    .navigation{
      margin-top: 20px;
      .IconTemplate {
        float: left;
        width: 30%;
        height: 40%;
        margin-bottom: 5%;
        margin-left: 3%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        cursor: pointer;
        .icon-huabanfuben {
          display: block;
          background-color: #F56C6C;
          color: @color-white;
          border-radius: 20%;
          width: 60px;
          height: 60px;
          line-height: 60px;
          font-size: 300%;
          text-align: center;
        }
        .icon-tongjibaobiao {
          display: block;
          background-color: @color-bg-lan;
          color: @color-white;
          border-radius: 20%;
          width: 60px;
          height: 60px;
          line-height: 60px;
          font-size: 300%;
          text-align: center;
        }
        .icon-Processdefinition {
          display: block;
          background-color: @color-bg-cs;
          color: @color-white;
          border-radius: 20%;
          width: 60px;
          height: 60px;
          line-height: 60px;
          font-size: 300%;
          text-align: center;
        }
        .icon-zanting {
          display: block;
          background-color: #409EFF;
          color: @color-white;
          border-radius: 20%;
          width: 60px;
          height: 60px;
          line-height: 60px;
          font-size: 300%;
          text-align: center;
        }
        .icon-wancheng {
          display: block;
          background-color: #67C23A;
          color: @color-white;
          border-radius: 20%;
          width: 60px;
          height: 60px;
          line-height: 60px;
          font-size: 300%;
          text-align: center;
        }
        span {
          margin-top: 5%;
          color: #909399
        }
      }
    }

  }

  .loading-container {
    position: absolute;
    max-width: 640px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }


</style>
