<template>
  <van-button
    class="followButton"
    v-if="value"
    color="#f85959"
    slot="default"
    :loading="followLoading"
    round
    @click="onclickIsfollow"
    >已关注</van-button
  >
  <van-button
    class="followButton"
    v-else
    icon="plus"
    type="primary"
    slot="default"
    :loading="followLoading"
    round
    @click="onclickIsfollow"
    >关注</van-button
  >
</template>
<script>
import { followUserinfo, notFollowUserinfo } from '@/api/user'
export default {
  name: 'follow-user',
  props: {
    value: {
      type: Boolean,
      require: true
    },
    aut_id: {
      type: [Object, String, Number],
      require: true
    }
  },
  data() {
    return { followLoading: false }
  },
  methods: {
    async onclickIsfollow() {
      this.followLoading = true
      try {
        if (this.value) {
          const { data } = await notFollowUserinfo(this.aut_id.toString())

          console.log(data)
        } else {
          const { data } = await followUserinfo(this.aut_id.toString())

          console.log(data)
        }
        this.$emit('input', !this.value)
      } catch (err) {
        this.$toast(err.response.data.message)
        console.log(err)
      }
      this.followLoading = false
    }
  }
}
</script>
<style lang="less" scoped>
</style>
