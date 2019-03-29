<template>
  <footer id="footer" class="footer">
    <div class="footer-div" v-for="(item,index) in navBar" :class="{'red':index === num}"
         @click="goToNavBar(index,item.url)">
      <i :class="item.icon"></i>
      <span>{{item.text}}</span>
    </div>
  </footer>
</template>
<script type="text/ecmascript-6">export default {
  name: 'ga-footer',
  data() {
    return {
      num: Number,
      navBar: [
        {"icon": "iconfont icon-shuju", "text": "数据", "url": "/"},
        {"icon": "iconfont icon-huabanfuben", "text": "报表", "url": "/ReportForm"}
      ]
    }
  },
  components: {},
  mounted() {
    this._getIndexUrl()

  },
  created() {

  },
  methods: {
    _getIndexUrl() {
      let Url = localStorage.getItem("IndexUrl");
      if (Url === null) {
        this.num = 0;
      } else {
        this.num = parseInt(Url);
      }

    },
    goToNavBar(index, url) {
      this.num = index;
      localStorage.setItem("IndexUrl", index);
      this.$router.push(url);
    }
  }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
  @import "../assets/less/base";

  #footer {
    width: 100%;
    position: fixed;
    z-index: 998;
    left: auto;
    bottom: 0;
    height: 70px;
    display: flex;
    border-top: 5px solid @color-F0;
    background-color: @color-white;
    .footer-div {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      .icon-huabanfuben,.icon-shuju {
        font-size: @font-size-large-xxxxxx;
      }
       span{
         font-size: @font-size-large;
       }
    }
    .red {
      color: @color-blue;
    }
  }

  @media only screen and (max-width:410px) {

    #footer {
      .footer-div {
        font-size: 12px;
      }
    }
  }



</style>
