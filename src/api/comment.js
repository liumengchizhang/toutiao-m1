import request from '@/until/request'
// 获取新闻推荐
export const getCommentList = params => {
  return request({
    method: 'get',
    url: '/v1_0/comments',
    params
  })
}

// 对评论点赞
export const addCommentlke = target => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}
// 取消评论点赞
export const deleteCommentlke = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}

// 评论文章
export const commentPublish = data => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
