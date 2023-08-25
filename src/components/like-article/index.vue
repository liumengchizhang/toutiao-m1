<template>
  <van-tabbar-item>
    <van-button
      :loading="loading"
      :icon="value === 1 ? 'good-job' : 'good-job-o'"
      slot="icon"
      class="iconContent"
      :class="{ active: value === 1 }"
      @click="onclickLike"
    />
  </van-tabbar-item>
</template>
<script>
import { likeArticle, deleteLikeArticle } from '@/api/new'
export default {
  name: 'likeAcritle',
  components: {},
  props: {
    value: {
      type: Number,
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
    async onclickLike() {
      this.loading = true
      try {
        if (this.value === 1) {
          // 点击取消对文章的点赞
          await deleteLikeArticle(this.articleId)
          this.$emit('input', -1)
        } else {
          // 对文章点赞
          await likeArticle(this.articleId)
          this.$emit('input', 1)
        }
        this.$toast.success(this.value === 1 ? '取消点赞' : '点赞成功')
      } catch (err) {
        console.log(err)
        this.$toast('未知错误，请重试')
      }
      this.loading = false
    }
  }
}
</script>
<style lang="less" scoped>
.active {
  color: red !important;
}
</style>
