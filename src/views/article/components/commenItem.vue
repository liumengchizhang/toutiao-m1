<template>
  <div class="commentItem">
    <van-cell>
      <div slot="icon">
        <van-image fit="cover" round :src="comment.aut_photo" />
      </div>
      <div slot="title" class="aut_name">{{ comment.aut_name }}</div>
      <div slot="default" class="vanCell">
        <van-button
          :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
          :class="{ liked: comment.is_liking }"
          :loading="commentLoading"
          @click="onCommentLike()"
        >
          {{ comment.like_count > 0 ? comment.like_count : '赞' }}
        </van-button>
      </div>
      <div slot="label">
        <p class="content">{{ comment.content }}</p>
        <div class="bottom-content">
          <span>{{ comment.pubdate | relativeTime }}</span>
          <span @click="$emit('reply-comment',comment)">回复{{ comment.reply_count }}</span>
        </div>
      </div>
    </van-cell>
  </div>
</template>
<script>
import { addCommentlke, deleteCommentlke } from '@/api/comment'
export default {
  name: 'commentItem',
  props: {
    comment: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      commentLoading: false
    }
  },
  methods: {
    async onCommentLike() {
      this.commentLoading = true
      console.log(this.comment)
      try {
        if (this.comment.is_liking) {
          await deleteCommentlke(this.comment.com_id)
        } else {
          await addCommentlke(this.comment.com_id)
        }
        this.$emit('handlecomment', this.comment)
      } catch (err) {
        console.log(err)
      }
      this.commentLoading = false
    }
  }
}
</script>
<style lang="less" scoped>
.commentItem {
  /deep/.van-image__img {
    width: 40px;
    height: 40px;
  }
  .aut_name {
    font-size: 14px;
    color: #406599;
    padding-left: 14px;
  }
  /deep/.van-icon {
    font-size: 14px;
  }
  .van-cell__value {
    font-size: 12px;
    flex: unset;
    position: absolute;
    top:5px;
    right: 16px;
  }
  .content {
    font-size: 16px;
    color: #222222;
    // width: 280px;
  }
  .bottom-content {
    font-size: 12px;
    color: #222222;
    span {
      padding-right: 20px;
    }
  }
  .van-button--default {
    border: none;
  }
  /deep/.liked {
    color: red;
  }
  .van-cell__value {
    flex: unset;
    .van-button {
      height: unset;
    }
  }
}
</style>
