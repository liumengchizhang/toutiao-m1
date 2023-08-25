<template>
  <div class="my-container">
    <!-- 未登录状态 -->
    <div class="header not-login" v-if="!user">
      <div class="login-btn" @click="$router.push('/login')" clickable>
        <img src="~@/assets/mobile.png" class="mobile-img" />
        <span class="text">登陆 / 注册</span>
      </div>
    </div>
    <!-- /未登录状态 -->
    <!-- 登录状态 -->
    <div class="header logined" v-if="user">
      <div class="base-info">
        <div class="avatar">
          <van-image fit="cover" round :src="userInfo.photo" />
          <span class="text">{{ userInfo.name }}</span>
        </div>
        <div class="edit-btn">
          <van-button size="mini" round to="personalCenter"
            >编辑资料</van-button
          >
        </div>
      </div>
      <div class="data-status">
        <div class="item">
          <div class="count">{{ userInfo.art_count }}</div>
          <div class="name">头条</div>
        </div>
        <div class="item">
          <div class="count">{{ userInfo.follow_count }}</div>
          <div class="name">关注</div>
        </div>
        <div class="item">
          <div class="count">{{ userInfo.fans_count }}</div>
          <div class="name">粉丝</div>
        </div>
        <div class="item">
          <div class="count">{{ userInfo.like_count }}</div>
          <div class="name">获赞</div>
        </div>
      </div>
    </div>
    <!--/登录状态  -->
    <!-- 导航 -->
    <!-- grid宫格导航 -->
    <van-grid column-num="2">
      <van-grid-item>
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item>
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- /导航 -->
    <!-- 页面导航-->

    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell
      title="退出登录"
      class="loginout"
      v-if="user"
      clickable
      @click="loginout"
    />
  </div>
</template>
<script>
import { getUserinfo } from '@/api/user'
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      name: 'myPage',
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapMutations(['getState']),
    //  点击退出登录
    loginout() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '确认退出吗'
        })
        .then(() => {
          console.log('确认')
          this.getState(null)
        })
        .catch(() => {
          console.log('取消')
        })
    },
    // 获取用户信息
    async loadUserInfo() {
      try {
        const { data: res } = await getUserinfo()
        this.userInfo = res.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  created() {
    if (this.user) {
      this.loadUserInfo()
    }
  }
}
</script>
<style lang="less" scoped>
.my-container {
  .header {
    background-image: url(~@/assets/banner.png);
    background-size: cover;
    height: 183px;
  }

  // 未登录
  .not-login {
    display: flex;
    align-items: center;
    justify-content: center;

    .login-btn {
      width: 88px;
      height: 72px;
      display: flex;
      flex-direction: column;

      .mobile-img {
        width: 66px;
        height: 66px;
        margin-bottom: 8px;
      }

      .text {
        font-size: 14px;
        color: #fff;
        letter-spacing: 1px;
      }
    }
  }

  // 登录
  .logined {
    .base-info {
      // background-color: pink;
      height: 135px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 41px 17px 28px 16px;
      box-sizing: border-box;

      .avatar {
        display: flex;
        align-items: center;

        .van-image {
          height: 66px;
          width: 66px;
          border: 4px solid #fff;
        }

        .text {
          margin-left: 11px;
          font-size: 15px;
          color: #fff;
        }
      }

      .van-button {
        width: 58px;
        height: 17px;
        background-color: #fff;
        color: #666;
        font-family: MicrosoftYaHei;
        letter-spacing: 0px;
      }
    }

    .data-status {
      // background-color: rgb(130, 203, 56);
      height: 50px;
      display: flex;
      align-items: center;
      text-align: center;

      .item {
        height: 50px;
        flex: 1;

        .count {
          font-size: 18px;
          color: #fff;
          font-family: ArialMT;
        }

        .name {
          font-size: 12px;
          font-family: MicrosoftYaHei;
          color: #fff;
        }
      }
    }
  }

  // 导航
  .van-grid {
    .van-grid-item {
      margin-bottom: 5px;

      .icon-shoucang {
        font-size: 23px;
        color: #eb5253;
      }

      .icon-lishi {
        font-size: 23px;
        color: #ff9d1d;
      }

      .text {
        font-family: MicrosoftYaHei;
        font-size: 14px;
        letter-spacing: 0px;
        color: #333333;
      }
    }
  }

  // 页面导航
  .van-cell {
    font-family: MicrosoftYaHei;
    font-size: 15px;
    color: #333333;
  }

  .loginout {
    text-align: center;
    margin-top: 5px;
    font-family: MicrosoftYaHei;
    font-size: 15px;
    color: #d86262;
    box-sizing: border-box;
  }
}
</style>
