<template>
  <div class="login-container">
    <van-nav-bar title="登录" class="a1">
      <van-icon slot="left" name="cross" @click="$router.back()"/>
    </van-nav-bar>
    <!-- 提交表单 -->
    <van-form @submit="onSubmit" ref="userFormRef">
      <van-field v-model="user.mobile" name="mobile" placeholder="请输入手机号" type="number" :rules="userFormRules.mobile"
        maxlength="11">
        <template #left-icon>
          <i class="iconfont icon-shouji"></i>
        </template>
      </van-field>
      <van-field v-model="user.code" name="code" type="number" placeholder="请输入验证码" :rules="userFormRules.code"
        maxlength="6">
        <template #left-icon>
          <i class="iconfont icon-yanzhengma"></i>
        </template>
        <template #button>
          <van-count-down :time="60000" v-if="isCountDown" format="ss 秒" @finish="isCountDown = false" />
          <van-button size="small" type="primary" round class="send-page-yzm" @click="onSendSms" native-type="button"
            v-else>获取验证码</van-button>
        </template>
      </van-field>
      <div>
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { login, getSmsCode } from '@/api/user'
export default {
  data() {
    return {
      name: 'LoginPage',
      user: {
        mobile: '',
        code: ''
      },
      isCountDown: false,
      userFormRules: {
        // 手机号的验证规则
        mobile: [
          { required: true, message: '请填写手机号' },
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: '请输入正确的手机号'
          }
        ],
        // 验证码的验证规则
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '请输入6位验证码' }
        ]
      }
    }
  },
  methods: {
    // 点击登陆的方法
    async onSubmit() {
      // 请提示对话框
      this.$toast.loading({
        message: '加载中...',
        // 禁用背景点击
        forbidClick: true,
        // 持续时间，默认是2000，如果为0则持续显示
        duration: 0
      })
      // 发起登陆的请求
      try {
        const { data: res } = await login(this.user)
        this.$store.commit('getState', res.data)
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          return this.$toast.fail('验证码或手机号错误')
        }
        this.$toast.fail('登录失败，请稍后重试')
      }
    },

    // 点击获取验证码的功能
    async onSendSms() {
      // 手机号的验证
      try {
        await this.$refs.userFormRef.validate('mobile')
      } catch (err) {
        return console.log('验证失败' + err)
      }
      this.isCountDown = true

      // 验证码请求
      try {
        await getSmsCode(this.user.mobile)
        this.$toast.success('获取验证码成功')
      } catch (err) {
        this.isCountDown = false
        if (err.response.status === 429) {
          return this.$toast('访问过于频繁,请稍后重试')
        } else if (err.response.status === 400) {
          return this.$toast('手机号错误，请重新输入')
        } else {
          return this.$toast('获取验证码失败')
        }
      }
    }
  }
}
</script>
<style lang="less">
.iconfont {
  font-size: 19px;
  color: #666;
}

.van-button--info {
  background-color: #6db4fb;
  border: none;
  border-radius: 5px;
  margin: 27px 14px;
  width: 347px;
  height: 44px;
}

.send-page-yzm {
  width: 76px;
  height: 23px;
  background-color: #ededed;
  font-size: 11px;
  color: #666666;
  border: none;
  line-height: 18px;
}
</style>
