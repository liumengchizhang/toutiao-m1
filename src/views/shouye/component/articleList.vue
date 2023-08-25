<template>
  <div class="articleList">
    <!-- 最外侧层是下拉刷新 -->
    <van-pull-refresh
      v-model="refreshing"
      :success-text="successText"
      @refresh="onRefresh"
      :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getNewsList } from '@/api/new'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  name: 'articleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pre_timestamp: null,
      error: false,
      refreshing: false,
      successText: '刷新成功'
    }
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // 1.请求获取数据
      try {
        const { data } = await getNewsList({
          channel_id: this.channel.id,
          timestamp: this.pre_timestamp || Date.now()
        })
        // if (Math.random() > 0.5) {
        //   JSON.parse('ASSDD')
        // }
        // 2.把请求结果数据放到List数组中s
        const results = data.data.results
        this.list.push(...results)
        // 3.本次数据加载结束后要把加载状态设置为结束
        this.loading = false
        // 4.判断数据是否加载完成
        if (results.length) {
          this.pre_timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    // 下拉刷新
    async onRefresh() {
      // 清空列表数据
      try {
        const { data } = await getNewsList({
          channel_id: this.channel.id,
          timestamp: this.pre_timestamp || Date.now()
        })
        // if (Math.random() > 0.5) {
        //   JSON.parse('ASSDD')
        // }
        // 2.把请求结果数据放到List数组中s
        const results = data.data.results
        this.list.unshift(...results)
        // 3.本次数据属刷新加载结束后要把加载状态设置为结束
        this.successText = `刷新加载成功,本次刷新了${results.length}数据`
        this.refreshing = false
        // 4.判断数据是否加载完成
        if (results.length) {
          this.pre_timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.successText = '刷新失败'
        this.refreshing = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.articleList {
  height: 79vh;
  overflow-y: auto;
}
</style>
