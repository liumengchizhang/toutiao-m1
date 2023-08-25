<template>
  <div class="commentFile">
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
      class="publish-content"
    />
    <van-button
      class="publishBtn"
      @click="onCommentPublish"
      :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>
<script>
import { commentPublish } from '@/api/comment'
export default {
  name: 'commentFile',
  props: {
    articleId: {
      type: [String, Number, Object],
      require: true
    },
    artId: {
      type: [Number, String, Object],
      require: true
    }
  },
  inject: ['articleDetail'],
  data() {
    return {
      message: ''
    }
  },
  methods: {
    async onCommentPublish() {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await commentPublish({
          target: this.articleId,
          content: this.message,
          art_id: this.artId ? this.artId.toString() : null
        })
        console.log(data)
        this.$emit('onSuccessPubilsh', data.data)
        this.message = ''
        this.$toast.success('发布评论成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail(err.response.data)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.commentFile {
  .publish-content {
    padding-right: 60px;
  }
  .publishBtn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    border: none;
    height: 20px;
    color: #8bb9e4;
  }
}
</style>
