<template>
  <div class="updateshow">
    <img :src="img" alt="" ref="img" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('closebtn')">取消</div>
      <div class="confirm" @click="onUpdateavatar">完成</div>
    </div>
  </div>
</template>
<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { putPersonalavatar } from '@/api/user'
export default {
  name: 'updatePhoto',
  props: {
    img: {
      type: [String, Object],
      require: true
    }
  },
  data() {
    return {
      cropper: {}
    }
  },
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      initialAspectRatio: 1,
      aspectRatio: 1,
      background: false
    })
  },
  methods: {
    onUpdateavatar() {
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.updatephoto(blob)
      })
    },
    // 更新用户头像的请求
    async updatephoto(blob) {
      this.$toast.loading({
        message: '更新中....',
        forbidClick: true,
        duration: 0
      })
      const formData = new FormData()
      formData.append('photo', blob)
      try {
        const { data } = await putPersonalavatar(formData)
        this.$emit('closebtn')
        this.$emit('updatePhoto', data.data.photo)
        this.$toast.success('更新头像成功')
      } catch (err) {
        this.$toast.fail('更新头像失败')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.updateshow {
  background-color: #3f3d3d;
  height: 100%;
  .toolbar {
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    // padding: 0 10px;

    .cancel,
    .confirm {
      width: 45px;
      height: 45px;
      color: #fff;
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  img {
    max-width: 100%;
  }
}
</style>
