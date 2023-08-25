<template>
  <div class="channelEditContainer">
    <van-cell :border="false">
      <div slot="title" class="mychannel-title">我的频道</div>
      <van-button
        plain
        type="danger"
        size="small"
        round
        class="channelEdit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for="(item, index) in channelEditarry" :key="item.id">
        <span
          slot="text"
          :class="{ active: index === active }"
          class="myEdit"
          @click="onEditChannel(item, index)"
          >{{ item.name }}</span
        >
        <van-icon
          name="close"
          slot="icon"
          v-show="isEdit && !flexIndex.includes(item.id)"
        />
      </van-grid-item>
    </van-grid>
    <van-cell :border="false">
      <div slot="title" class="mychannel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid" direction="horizontal">
      <van-grid-item
        v-for="item in recommendChannel"
        :key="item.id"
        :text="item.name"
        class="recommebdGrid-item"
        icon="plus"
        @click="onaddChannels(item)"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
import {
  getAllsChannels,
  getaddUserChannels,
  deleteUserChannels
} from '@/api/channels'
import { mapState } from 'vuex'
import { setItem, getItem } from '@/until/storage'
export default {
  name: 'channelEditList',
  props: {
    channelEditarry: {
      type: Array,
      require: true
    },
    active: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      allChannels: [],
      isEdit: false,
      flexIndex: [0]
    }
  },
  computed: {
    recommendChannel() {
      return this.allChannels.filter(item => {
        return !this.channelEditarry.find(mychannel => {
          return item.id === mychannel.id
        })
      })
    },
    ...mapState(['user'])
  },
  created() {
    this.getAllschannel()
  },
  methods: {
    async getAllschannel() {
      try {
        const { data: res } = await getAllsChannels()
        console.log(res)
        this.allChannels = res.data.channels
      } catch (err) {
        console.log('错误' + err)
      }
    },
    async onaddChannels(mychannel) {
      console.log(mychannel)
      this.$emit('changeChannel', mychannel)
      // 数据持久化处理
      if (this.user) {
        // 如果用户登录了.调用接口
        console.log(mychannel.id, this.channelEditarry.length)
        const channels = {
          id: mychannel.id,
          seq: this.channelEditarry.length
        }
        try {
          const { data } = await getaddUserChannels(channels)
          console.log(data)
        } catch (err) {
          this.$toast.fail('频道添加失败')
        }
      } else {
        // 如果用户没有登录 把数据存储到本地
        setItem('TOKENCHANNEL', this.channelEditarry)
      }
    },
    onEditChannel(item, index) {
      if (this.isEdit) {
        if (this.flexIndex.includes(item.id)) {
          return
        }
        this.$emit('deleteActive', index)
        // 处于编辑状态
        // 删除我的频道
        // 数据持久化
        if (this.user) {
          try {
            const { data } = deleteUserChannels(item.id)
            console.log(data)
          } catch (err) {
            this.$toast.fail('删除数据失败')
          }
        } else if (getItem('TOKENCHANNEL')) {
          setItem('TOKENCHANNEL', this.channelEditarry)
        }
      } else {
        // 处于完成状态,需要切换频道
        this.$emit('updateActive', index)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.channelEditContainer {
  margin-top: 44px;

  .van-cell {
    .mychannel-title {
      font-size: 16px;
      color: #333333;
    }

    .channelEdit-btn {
      border-radius: 10px;
      width: 50px;
      height: 25px;
      color: #f85a5a;
      background-color: #fff;
      font-size: 14px;
      border: 1px solid #f85a5a;
    }
  }

  .myEdit {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #222222;
    white-space: nowrap;
  }

  /deep/ .van-grid-item__content {
    width: 80px;
    height: 43px;
    background-color: #f4f5f6;
    border-radius: 3px;

    .van-grid-item__text {
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #222222;
      white-space: nowrap;
      margin-left: 2px;
    }

    .active {
      color: #f85a5a;
    }

    .van-grid-item__icon-wrapper {
      position: unset;
    }
  }

  .recommend-grid {
    .recommebdGrid-item {
      /deep/ .van-grid-item__icon {
        font-size: 12px;
      }
    }
  }

  /deep/ .van-icon-close {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 12px;
    color: #cacaca;
  }
}
</style>
