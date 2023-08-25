<template>
  <div class="updateBirthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('closebtn')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { putPersonalinfo } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'updateBirthday',
  props: {
    value: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0 // 持续展示 toast
      })
      try {
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        if (!currentDate.length) {
          this.$toast('昵称不能为空')
          return
        }
        await putPersonalinfo({
          birthday: currentDate
        })
        console.log(currentDate)
        this.$emit('closebtn')
        this.$emit('input', currentDate)
        this.$toast.success('提示修改成功')
      } catch (err) {
        this.$toast.fail('更新用户昵称失败')
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
