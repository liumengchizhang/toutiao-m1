<template>
  <div class="articleItme-container">
    <van-list>
      <van-cell
        :to="{
          name: 'article',
          params: {
            articleId: article.art_id
          }
        }"
      >
        <div slot="title" class="title van-multi-ellipsis--l2">
          {{ article.title }}
        </div>
        <div slot="label">
          <div v-if="article.cover.type === 3" class="cover-nowrap">
            <div
              v-for="(img, index) in article.cover.images"
              :key="index"
              class="cover-image-item"
            >
              <van-image class="image-item" :src="img" />
            </div>
          </div>
          <div class="lable-info-wrap">
            <span>{{ article.aut_name }}</span>
            <span>{{ article.comm_count }}评论</span>
            <span>{{ article.pubdate | relativeTime() }}</span>
          </div>
        </div>
        <div
          slot="default"
          v-if="article.cover.type === 1"
          class="single-cover"
        >
          <van-image
            fit="cover"
            :src="article.cover.images[0]"
            class="single-cover-img"
          />
        </div>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
export default {
  name: 'artcleItem',
  props: { article: { type: Object, require: true } },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.articleItme-container {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 116px;
    height: 74px;
    padding-left: 10px;
    .single-cover-img {
      width: 116px;
      height: 74px;
    }
  }
  .lable-info-wrap {
    span {
      font-size: 12px;
      color: #b4b4b4;
      &:not(:last-child) {
        padding-right: 10px;
      }
    }
  }
  .cover-nowrap {
    display: flex;
    padding: 16px 0;
    /deep/ .cover-image-item {
      flex: 1;
      height: 74px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .image-item {
        width: 100%;
        height: 74px;
      }
    }
  }
}
</style>
