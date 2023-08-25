<template>
  <div class="searchHistory">
    <van-cell title="搜索历史" center>
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <div v-if="isDelete">
          <span @click="$emit('clear-search-histotrie')">全部删除</span>
          &nbsp;&nbsp;
          <span @click="isDelete = false">完成</span>
        </div>
        <van-icon
          name="delete-o"
          class="search-icon"
          v-else
          @click="isDelete = true"
        />
      </template>
    </van-cell>
    <van-cell
      :title="item"
      cente
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="onSearchItemClick(item, index)"
    >
      <van-icon slot="right-icon" name="close" v-show="isDelete" />
    </van-cell>
  </div>
</template>
<script>
export default {
  name: 'searchHistory',
  props: {
    searchHistories: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      isDelete: false
    }
  },
  methods: {
    onSearchItemClick(item, index) {
      if (this.isDelete === true) {
        this.$emit('deleteSearchItem', index)
      } else {
        this.$emit('search', item)
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
