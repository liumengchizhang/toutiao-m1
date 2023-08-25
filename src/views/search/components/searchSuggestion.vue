<template>
  <div class="searchSuggtion">
    <van-cell
      icon="search"
      center
      v-for="(text, index) in suggesiton"
      :key="index"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="htmlHighLight(text)"></div>
    </van-cell>
  </div>
</template>
<script>
import { getSuggestionList } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'searchSuggestion',
  props: {
    searchText: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      suggesiton: []
    }
  },
  // 监听搜索框内容的变化
  watch: {
    searchText: {
      handler: debounce(function(value) {
        this.loadSuggestionList(value)
      }, 1000),
      // 该回调将会在侦听开始之后立即调用
      immediate: true
    }
  },
  methods: {
    async loadSuggestionList(p) {
      try {
        const { data } = await getSuggestionList(p)
        this.suggesiton = data.data.options
      } catch (err) {
        this.$toast('获取搜索建议失败,请稍后重试')
        console.log(err)
      }
    },
    htmlHighLight(text) {
      // 定义正则表达式
      const reg = new RegExp(this.searchText, 'gi')
      return (
        text.replace(
          reg,
          `<span style="color:#3296fa;">${this.searchText}</span>`
        ) || {}
      )
    }
  }
}
</script>
<style lang="less" scoped></style>
