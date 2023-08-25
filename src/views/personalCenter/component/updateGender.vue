<template>
  <div class="updateGender">
    <van-nav-bar
      title="性别"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('closebtn')"
      @click-right="onUndateGender"
    />
    <van-picker
      :columns="columns"
      :default-index="value"
      @change="onchangeGender"
    />
  </div>
</template>
<script>
import { putPersonalinfo } from '@/api/user'
export default {
  name: 'updateGender',
  props: {
    value: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      gender: 0
    }
  },
  methods: {
    async onUndateGender() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0 // 持续展示 toast
      })
      try {
        const localGender = this.gender
        await putPersonalinfo({
          gender: localGender
        })
        this.$emit('closebtn')
        this.$emit('input', localGender)
        this.$toast.success('提示修改成功')
      } catch (err) {
        this.$toast.fail('更新用户性别失败')
      }
    },

    onchangeGender(picker, values, index) {
      this.gender = index
    }
  }
}
</script>
<style lang="less" scoped>
.updateGender {
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
