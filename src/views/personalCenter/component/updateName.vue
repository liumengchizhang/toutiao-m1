<template>
  <div class="unpdateName">
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('closebtn')"
      @click-right="onUpdateFinish"
    />
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="10"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>
<script>
import { putPersonalinfo } from '@/api/user'
export default {
  name: 'updateName',
  props: {
    value: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      message: this.value
    }
  },
  methods: {
    async onUpdateFinish() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0 // 持续展示 toast
      })
      try {
        const localName = this.message
        if (!localName.length) {
          this.$toast('昵称不能为空')
          return
        }
        await putPersonalinfo({
          name: this.message
        })
        this.$emit('closebtn')
        this.$emit('input', this.message)
        this.$toast.success('提示修改成功')
      } catch (err) {
        this.$toast.fail('更新用户昵称失败')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.unpdateName {
  /deep/.van-nav-bar {
    background-color: #fff !important;
    .van-nav-bar__text {
      color: blue !important;
    }
    .van-nav-bar__left {
      color: blue !important;
    }
    .van-nav-bar__title {
      color: #323233 !important;
    }
  }
  /deep/.van-icon-cross:before {
    content: unset;
  }
}
</style>
