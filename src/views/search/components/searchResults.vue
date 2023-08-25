<template>
  <div class="searchResults">
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="article in list"
        :key="article.art_id"
        :title="article.title"
        :to="{
          name: 'article',
          params: {
            articleId: list.art_id
          }
        }"
      />
    </van-list>
  </div>
</template>
<script>
import { getResultsList } from '@/api/search'
export default {
  name: 'searchRssult',
  props: {
    searchText: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      page: 1,
      per_page: 20
    }
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // 获取数据赋值给list
      try {
        const { data } = await getResultsList({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        this.$toast('获取搜索结果失败')
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
