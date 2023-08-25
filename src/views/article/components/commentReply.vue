<template>
  <div class="commentReply">
    <van-nav-bar
      :title="
        currentComment.reply_count > 0
          ? `${currentComment.reply_count}条回复`
          : '0条回复'
      "
      class="nav-bar"
    >
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <div class="post-wrap">
      <commenItem :comment="currentComment"></commenItem>
      <van-cell title="全部评论" />
      <commentList
        :arctileId="currentComment.com_id"
        type="c"
        @onloadSuccess="handle($event)"
        :list="commentlist"
      ></commentList>
    </div>
    <div class="post-btn">
      <van-button
        round
        size="small"
        class="write-btn"
        @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <van-popup v-model="isPostShow" position="bottom">
      <commentFile
        v-if="isPostShow"
        @onSuccessPubilsh="onSuccessPubilsh($event)"
        :articleId="currentComment.com_id"
        :artId="artId"
      ></commentFile>
    </van-popup>
  </div>
</template>
<script>
import commenItem from './commenItem.vue'
import commentList from './commentList.vue'
import commentFile from './commentFile.vue'
export default {
  name: 'commentReply',
  components: {
    commenItem,
    commentList,
    commentFile
  },
  props: {
    currentComment: {
      type: Object,
      require: true
    },
    artId: {
      type: [Number, String, Object],
      require: true
    }
  },
  data() {
    return {
      commentlist: [],
      isPostShow: false
    }
  },
  methods: {
    handle(data) {
      console.log(this.artId)
      this.totalcomment = data.total_count
      this.commentlist.push(...data.results)
    },
    onSuccessPubilsh(data) {
      this.commentlist.unshift(data.new_obj)
      this.isPostShow = false
      this.$emit('commentCount', this.currentComment)
    }
  }
}
</script>
<style lang="less" scoped>
.commentReply {
  /deep/.nav-bar {
    background-color: unset !important;
    .van-nav-bar__title {
      color: black !important;
    }
    .van-icon {
      color: #4190fd !important;
    }
  }
  .post-wrap {
    position: fixed;
    top: 124px;
    bottom: 44px;
    right: 0;
    left: 0;
    overflow-y: scroll;
  }
  .post-btn {
    position: fixed;
    height: 44px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    border-top: 1px solid #d8d8d8;
    display: flex;
    justify-content: center;
    align-items: center;
    .van-button {
      width: 60%;
    }
  }
}
</style>
