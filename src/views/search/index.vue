<template>
  <div class="searchIndex">
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#3296fa"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <SearchResults v-if="isResultShow" :searchText="searchText" />
    <!-- /搜索结果 -->
    <!-- 搜索建议 -->
    <SearchSuggestion
      :searchText="searchText"
      v-else-if="searchText"
      @search="onSearch"
    />
    <!-- /搜索建议 -->

    <!-- 搜索历史 -->
    <SearchHistory
      v-else
      :searchHistories="searchHistories"
      @deleteSearchItem="deleteSearchItem($event)"
      @clear-search-histotrie="searchHistories = []"
      @search="onSearch($event)"
    />
    <!-- /搜索历史 -->
  </div>
</template>
<script>
import SearchResults from './components/searchResults.vue'
import SearchSuggestion from './components/searchSuggestion.vue'
import SearchHistory from './components/searchHistory.vue'
import { getItem, setItem } from '@/until/storage'
export default {
  components: { SearchHistory, SearchSuggestion, SearchResults },
  name: 'search',
  data() {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: getItem('TOUTIAO-SEARCH-HISTORIES') || []
    }
  },
  methods: {
    onSearch(val) {
      this.searchText = val
      this.$toast(val)
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.push(val)
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    },
    deleteSearchItem(index) {
      this.searchHistories.splice(index, 1)
    }
  },
  watch: {
    searchHistories(val) {
      setItem('TOUTIAO-SEARCH-HISTORIES', val)
    }
  }
}
</script>
<style lang="less" scoped>
.searchIndex {
  padding-top: 54px;
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>
