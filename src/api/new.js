import request from '@/until/request'
// 获取新闻推荐
export const getNewsList = params => {
  return request({
    method: 'get',
    url: '/v1_0/articles/',
    params
  })
}

// 获取新闻详情

export const getArticleDeatail = articleId => {
  return request({
    method: 'get',
    url: `/v1_0/articles/${articleId}`
  })
}
// 收藏文章
export const collect = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

// 取消收藏
export const deleteCollect = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}

// 点赞文章
export const likeArticle = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}

// 取消点赞
export const deleteLikeArticle = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}
