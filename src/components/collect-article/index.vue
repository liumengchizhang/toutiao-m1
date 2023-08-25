<template>
  <van-tabbar-item>
    <van-button
      :loading="loading"
      :icon="value ? 'star' : 'star-o'"
      slot="icon"
      class="iconContent"
      :class="{ active: value }"
      @click="onclickCollent"
    />
  </van-tabbar-item>
</template>
<script>
import { collect, deleteCollect } from '@/api/new'
export default {
  name: 'collectAcritle',
  components: {},
  props: {
    value: {
      type: Boolean,
      require: true
    },
    articleId: {
      type: [Number, String, Object],
      require: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async onclickCollent() {
      this.loading = true
      try {
        if (this.value) {
          // 点击取消对文章的收藏
          await deleteCollect(this.articleId)
        } else {
          // 对文章收藏
          await collect(this.articleId)
        }
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (err) {
        console.log(err);
        this.$toast('未知错误，请重试')
      }
      this.loading = false
    }
  }
}
</script>
<style lang="less" scoped>
.active {
  color: peru !important;
}
</style>
