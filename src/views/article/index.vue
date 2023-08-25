<template>
  <div class="articleDetail">
    <!--头部导航栏 -->
    <van-nav-bar title="黑马头条" left-arrow @click-left="$router.back()" />
    <!-- /头部导航栏 -->
    <!--获取文章详情成功 -->
    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading size="24px" vertical color="#3296fa"
          >加载中...</van-loading
        >
      </div>
      <!-- /加载中 -->

      <!--文章内容  -->
      <div class="articleContent" v-else-if="articleDetail.title">
        <!-- 文章的标题 -->
        <h1 class="articleTitle">{{ articleDetail.title }}</h1>
        <!-- /文章的标题 -->

        <!-- 用户的信息 -->
        <van-cell
          :title="articleDetail.aut_name"
          size="large"
          :border="false"
          center
        >
          <div slot="label">{{ articleDetail.pubdate | relativeTime }}</div>
          <van-image
            round
            slot="icon"
            width="50px"
            height="50px"
            fit="cover"
            :src="articleDetail.aut_photo"
          />
          <followUser
            v-model="articleDetail.is_followed"
            :aut_id="articleDetail.aut_id"
          ></followUser>
        </van-cell>
        <!-- /用户的信息 -->

        <!-- 文章的内容 -->
        <div
          class="article-content markdown-body"
          v-html="articleDetail.content"
          ref="article-content"
        ></div>
        <!-- 文章内容 -->
        <van-divider>正文结束</van-divider>
        <!-- 评论回复 -->
        <commentlist
          :arctileId="articleId"
          @onloadSuccess="handle($event)"
          :list="commentlist"
          @reply-comment="onReplycomment($event)"
        ></commentlist>
        <van-tabbar v-model="active" safe-area-inset-bottom fixed border>
          <van-tabbar-item>
            <van-button
              type="default"
              slot="icon"
              round
              class="bottom-comment"
              @click="isPostShow = true"
              >写评论</van-button
            >
          </van-tabbar-item>
          <van-tabbar-item :badge="totalcomment">
            <van-button
              icon="comment-o"
              slot="icon"
              iconContent
              class="iconContent"
              info="4"
            />
          </van-tabbar-item>
          <collectArticle
            v-model="articleDetail.is_collected"
            :articleId="articleDetail.art_id"
          ></collectArticle>
          <likeArticle
            v-model="articleDetail.attitude"
            :articleId="articleDetail.art_id"
          ></likeArticle>
          <van-tabbar-item>
            <van-button icon="share-o" slot="icon" class="iconContent" />
          </van-tabbar-item>
        </van-tabbar>
      </div>

      <!-- /获取文章详情成功 -->

      <!--获取文章详情失败 404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p>该资源不存在或已经删除</p>
      </div>
      <!--/获取文章详情失败 404 -->

      <!-- 未知错误 -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p>内容加载失败</p>
        <van-button type="default" @click="loadArticleList"
          >点击重试</van-button
        >
      </div>
      <!-- /未知错误 -->
    </div>
    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <commentFile
        :articleId="articleId"
        @onSuccessPubilsh="onSuccessPubilsh($event)"
      ></commentFile>
    </van-popup>
    <!-- /发布评论 -->

    <!-- 评论回复 -->
    <van-popup
      v-model="isReplayShow"
      position="bottom"
      :style="{ height: '90%' }"
    >
      <!-- 当v-if时，dom元素节点被创建，反之，则被销毁
    弹出层是个懒加载,被创建的元素只是关闭和隐藏，并不会从新创建 -->
      <commentReply
        v-if="isReplayShow"
        :currentComment="currentComment"
        @close="isReplayShow = false"
        @commentCount="currentComment.reply_count++"
        :artId="articleId"
      ></commentReply>
    </van-popup>
    <!-- /评论回复 -->
  </div>
</template>
<script>
import { getArticleDeatail } from '@/api/new'
// 图片的预览
import { ImagePreview } from 'vant'
import followUser from '@/components/follow-user'
import collectArticle from '@/components/collect-article'
import likeArticle from '@/components/like-article'
import commentlist from './components/commentList.vue'
import commentFile from './components/commentFile.vue'
import commentReply from './components/commentReply.vue'
export default {
  name: 'articleDetail',
  // 如果 props（在路由js文件中） 被设置为 true，route.params 将会被设置为组件属性。
  props: {
    articleId: {
      type: [Number, String, Object],
      require: true
    }
  },
  provide() {
    return {
      articleDetail: this.articleDetail
    }
  },
  components: {
    followUser,
    collectArticle,
    likeArticle,
    commentlist,
    commentFile,
    commentReply
  },
  data() {
    return {
      active: 0,
      articleDetail: {},
      loading: true,
      errStatus: 0,
      totalcomment: 0,
      isPostShow: false,
      commentlist: [],
      isReplayShow: false,
      currentComment: {}
    }
  },
  created() {
    this.loadArticleList()
  },
  methods: {
    async loadArticleList() {
      this.loading = true
      try {
        const { data } = await getArticleDeatail(this.articleId)
        // if (Math.random() > 0.5) {
        //   JSON.parse('12sddfdfdf')
        // }
        this.articleDetail = data.data
        setTimeout(() => {
          this.previewImage()
        }, 0)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        console.log(err)
        this.$toast('加载失败')
      }
      this.loading = false
      console.log(this.articleDetail.aut_id)
    },
    previewImage() {
      const artDocument = this.$refs['article-content']
      const imgs = artDocument.querySelectorAll('img')
      const images = []
      imgs.forEach((item, index) => {
        images.push(item.src)
        console.log(item)
        item.onclick = function() {
          console.log('1')
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    updateUserFollow() {
      this.articleDetail.is_followed = this.$event
    },
    handle(data) {
      this.totalcomment = data.total_count
      this.commentlist.push(...data.results)
    },
    onSuccessPubilsh(data) {
      this.commentlist.unshift(data.new_obj)
      this.isPostShow = false
      this.totalcomment++
    },
    // 回复评论的事件
    onReplycomment(comment) {
      this.isReplayShow = true
      this.currentComment = comment
    }
  }
}
</script>
<style lang="less" scoped>
@import url(../../../node_modules/github-markdown-css/github-markdown.css);
.articleDetail {
  .main-wrap {
    position: fixed;
    top: 48px;
    left: 0;
    right: 0;
    bottom: 44px;
    overflow-y: scroll;
  }
  .van-tabbar {
    height: 48px;
    padding-left: 10px;
    padding-right: 15px;
    /deep/ .van-button--default {
      color: #777;
      background-color: #fff;
    }
    /deep/ .iconContent {
      border: none;
      font-size: 20px;
      width: 30px;
    }
  }
  /deep/ .bottom-comment {
    width: 160px;
    height: 32px;
    border-radius: 16px;
    border: solid 1px #eeeeee;
    text-align: left;
    .van-button__content {
      justify-content: flex-start;
    }
  }

  .error-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 46px;
    .van-icon {
      font-size: 62px;
      color: #b4b4b4;
    }
  }
  .main-wrap {
    padding-top: 46px;
  }
  .articleContent {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 48px;
    background-color: #fff;
    overflow-y: scroll;
    .articleTitle {
      padding-left: 15px;
      font-family: MicrosoftYaHei-Bold;
      font-size: 20px;
      color: #3a3a3a;
    }
    .van-cell__label {
      color: #c2c2c2;
      font-size: 10px;
    }
    .van-cell__title {
      font-size: 12px;
    }
    .van-cell {
      color: #333;
    }
    .van-image {
      width: 35px;
      height: 35px;
      padding-right: 12px;
    }
    /deep/ .followButton {
      width: 85px;
      height: 29px;
      background-color: #3296fa;
      border-radius: 15px;
    }
    .article-content {
      padding: 0 10px;
      font-size: 16px;
      color: #333;
    }
    .cnblogs_code {
      margin-left: 0 !important;
    }
    /deep/ .van-info {
      position: absolute;
      top: 10px;
      right: 2px;
    }
  }
}
</style>
