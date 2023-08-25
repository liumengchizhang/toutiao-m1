<template>
  <div class="personalCenter">
    <van-nav-bar
      title="个人中心"
      left-arrow
      @click-left="$router.back()"
      right-text="保存"
    />
    <input type="file" hidden ref="file" @change="onChangeAvatar" />
    <van-cell title="头像" value="内容" is-link>
      <van-image
        class="avatar"
        round
        fit="cover"
        :src="userInfo.photo"
        @click="$refs.file.click()"
      />
    </van-cell>
    <van-cell
      title="昵称"
      :value="userInfo.name"
      is-link
      @click="isUpdatenameShow = true"
    />
    <van-cell
      title="性别"
      :value="userInfo.gender === 0 ? '男' : '女'"
      is-link
      @click="isUpdategenderShow = true"
    />
    <van-cell
      title="生日"
      :value="userInfo.birthday"
      is-link
      @click="isUpdatebirthdayShow = true"
    />
    <!-- 更新昵称 -->
    <van-popup
      v-model="isUpdatenameShow"
      v-if="isUpdatenameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name
        @closebtn="isUpdatenameShow = false"
        v-model="userInfo.name"
      ></update-name>
    </van-popup>
    <!-- /更新昵称 -->

    <!-- 更新性别 -->
    <van-popup
      v-if="isUpdategenderShow"
      v-model="isUpdategenderShow"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <updateGender
        v-model="userInfo.gender"
        @closebtn="isUpdategenderShow = false"
      ></updateGender>
    </van-popup>
    <!-- /更新性别 -->
    <!-- 更新生日 -->
    <van-popup
      v-if="isUpdatebirthdayShow"
      v-model="isUpdatebirthdayShow"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <updateBirthday
        v-model="userInfo.birthday"
        @closebtn="isUpdatebirthdayShow = false"
      ></updateBirthday>
    </van-popup>
    <!-- /更新生日 -->
    <!-- 更新头像 -->
    <van-popup
      v-if="isUpdatePhotoShow"
      v-model="isUpdatePhotoShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <updatePhoto
        v-if="isUpdatePhotoShow"
        :img="img"
        @closebtn="isUpdatePhotoShow = false"
        @updatePhoto="userInfo.photo = $event"
      ></updatePhoto>
    </van-popup>
    <!-- /更新头像 -->
  </div>
</template>
<script>
import { personalCenter } from '@/api/user'
import updateName from './component/updateName.vue'
import updateGender from './component/updateGender.vue'
import updateBirthday from './component/updateBirthday.vue'
import updatePhoto from './component/updatePhoto.vue'
export default {
  components: { updateName, updateGender, updateBirthday, updatePhoto },
  name: 'personalCenter',
  data() {
    return {
      userInfo: {},
      isUpdatenameShow: false,
      isUpdategenderShow: false,
      isUpdatebirthdayShow: false,
      isUpdatePhotoShow: false,
      img: ''
    }
  },
  created() {
    this.getPersonInfo()
  },
  methods: {
    async getPersonInfo() {
      try {
        const { data } = await personalCenter()
        this.userInfo = data.data
        console.log(this.userInfo)
      } catch (err) {
        this.$toast.fail('获取用户信息失败')
      }
    },
    onChangeAvatar() {
      console.log(this.$refs.file.files)
      const file = this.$refs.file.files[0]
      const fileUrl = window.URL.createObjectURL(file)
      console.log(fileUrl)
      this.isUpdatePhotoShow = true
      this.img = fileUrl
    }
  }
}
</script>
<style lang="less" scoped>
.personalCenter {
  /deep/.van-nav-bar__text {
    color: #fff !important;
    font-size: 14px;
  }
  .avatar {
    width: 30px;
    height: 30px;
  }
  .van-popup {
    background-color: #f9f9f9;
  }
}
</style>
