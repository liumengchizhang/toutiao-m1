<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      error-text="加载评论失败，请稍后重试"
      :error="error"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
      <commenItemVue
        :comment="item"
        v-for="(item, index) in list"
        :key="index"
        @handlecomment="handlecomment($event)"
        @reply-comment="$emit('reply-comment', $event)"
      ></commenItemVue>
    </van-list>
  </div>
</template>
<script>
import { getCommentList } from '@/api/comment'
import commenItemVue from './commenItem.vue'
export default {
  name: 'comment-list',
  props: {
    arctileId: {
      type: [Number, String, Object],
      require: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validator(value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  components: {
    commenItemVue
  },
  data() {
    return {
      loading: false,
      finished: false,
      error: false,
      offset: null,
      limit: 10
    }
  },
  created() {
    this.loading = true
    this.onLoad()
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // 1.请求获取数据
      // 2.将数据设置为false
      // 3.将loading设置为false
      // 4.判断是否还有数据
      //  有就更新获取下一个的页码，没有就就直接完成
      try {
        const { data } = await getCommentList({
          type: this.type,
          source: this.arctileId.toString(),
          offset: this.offset,
          limit: this.limit
        })
        const { results } = data.data
        this.$emit('onloadSuccess', data.data)
        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.finished = true
        this.loading = false
      }
    },
    handlecomment(comment) {
      comment.is_liking = !comment.is_liking
      if (comment.is_liking) {
        comment.like_count++
      } else {
        comment.like_count--
      }
    }
  }
}
</script>
