<template>
  <div class="toutiao_container">
    <router-view></router-view>
    <van-tabbar class="layout_tabbar" route>
      <van-tabbar-item to="/home">
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/wenda">
        <i slot="icon" class="iconfont icon-wenda"></i>
        <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="iconfont icon-shipin"></i>
        <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="iconfont icon-wode"></i>
        <span>{{ $store.state.user ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: 'layoutView'
    }
  }
}
</script>
<style lang="less" scoped>
.toutiao_container {
  .layout_tabbar {
    i.iconfont {
      font-size: 20px;
    }

    span {
      font-size: 10px;
    }
  }
}
</style>
