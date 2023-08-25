<template>
  <!-- 搜索框部分 -->
  <div class="homePage">
    <van-nav-bar v-if="!search" fixed>
      <van-button round slot="title" to="search">
        <i slot="icon" class="iconfont icon-sousuo"></i>
        <span class="text">搜索</span>
      </van-button>
    </van-nav-bar>
    <div class="search-header" v-else>
      <van-field center>
        <i slot="left-icon" class="iconfont icon-sousuo"></i>
      </van-field>
    </div>
    <!-- 标签栏滚动 -->
    <van-tabs swipeable v-model="active">
      <van-tab v-for="item in channelList" :key="item.id" :title="item.name">
        <articleList :channel="item"></articleList>
      </van-tab>
      <div slot="nav-rigth" class="paplaceholder"></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="chiannelEditShowPopup = true"
      >
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 频道栏的编辑 -->
    <van-popup
      v-model="chiannelEditShowPopup"
      closeable
      close-icon-position="top-left"
      :style="{ height: '100%', width: '100%' }"
    >
      <channelEdit
        :channelEditarry.sync="channelList"
        :active="active"
        @changeChannel="changeChannel($event)"
        @updateActive="changeActive($event)"
        @deleteActive="deleteActive($event)"
      ></channelEdit>
    </van-popup>
    <!-- /频道栏的编辑的内容 -->
  </div>
</template>
<script>
import { getUserChannel } from '@/api/channels'
import { mapState, mapMutations } from 'vuex'
import articleList from './component/articleList.vue'
import channelEdit from './component/channelEdit.vue'
import { getItem } from '@/until/storage'
export default {
  name: 'shouyePage',
  components: {
    articleList,
    channelEdit
  },
  props: {},
  data() {
    return {
      search: false,
      chiannelEditShowPopup: false,
      active: 0
    }
  },
  created() {
    this.loadChannelList()
  },
  methods: {
    ...mapMutations(['getChannelsList']),
    async loadChannelList() {
      if (this.user) {
        try {
          const { data } = await getUserChannel()
          this.getChannelsList(data.data.channels)
        } catch (err) {
          this.$toast.fail('获取用户频道失败')
        }
      } else {
        if (getItem('TOKENCHANNEL')) {
          this.getChannelsList(getItem('TOKENCHANNEL'))
        } else {
          try {
            const { data } = await getUserChannel()
            this.getChannelsList(data.data.channels)
          } catch (err) {
            this.$toast.fail('获取用户频道失败')
          }
        }
      }
    },
    changeChannel(val) {
      this.channelList.push(val)
    },
    changeActive(val) {
      this.active = val
      this.chiannelEditShowPopup = false
    },
    deleteActive(index) {
      this.channelList.splice(index, 1)
      if (this.active > index) {
        this.active = this.active - 1
      }
    }
  },
  computed: {
    ...mapState(['channelList', 'user'])
  }
}
</script>
<style lang="less" scoped>
.homePage {
  padding-top: 90px;
  padding-bottom: 50px;

  .van-nav-bar {
    /deep/.van-nav-bar__title {
      max-width: unset !important;
    }

    .van-button {
      width: 278px;
      height: 32px;
      background-color: #5babfb;
      color: #fff;
      border: none;

      .iconfont {
        font-size: 16px;
      }

      .text {
        font-size: 14px;
      }
    }
  }

  .search-header {
    width: 375px;
    height: 48px;
    background-color: #3296fa;
    display: flex;
    justify-content: center;
    align-items: center;

    .van-cell {
      width: 278px;
      height: 32px;
      background-color: #5babfb;
      color: #fff;
      border: none;
      border-radius: 16px;
    }
  }

  // 标签栏滚动
  .van-tabs {
    /deep/.van-tabs__wrap {
      height: 42px;
      position: fixed;
      top: 46px;
      left: 0;
      z-index: 1;
      right: 0;

      .van-tab {
        min-width: 96px;
        border-right: 1px solid #edeff3;
        color: #777;
        font-size: 15px;
      }

      .van-tab--active {
        color: #333333;
      }

      .van-tabs__line {
        width: 16px;
        height: 3px;
        background-color: #3296fa;
        border-radius: 2px;
        bottom: 20px;
      }
    }
  }

  // 占位符
  .paplaceholder {
    flex-shrink: 0;
    width: 33px;
    height: 41px;
  }

  // 面包屑按钮
  .hamburger-btn {
    width: 33px;
    height: 41px;
    background-color: #ffffff;
    opacity: 0.9;
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    &::before {
      content: '';
      background: url(~@/assets/gradient-gray-line.png);
      width: 1px;
      height: 29px;
      position: absolute;
      left: 0;
      background-size: contain;
    }
  }

  .van-popup {
    /deep/ .van-popup__close-icon {
      // font-size: 14px;
      color: #222222;
    }
  }
}
</style>
