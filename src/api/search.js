import request from '@/until/request'
// 获取新闻推荐
export const getSuggestionList = q => {
  return request({
    method: 'get',
    dateType: 'json',
    async: true,
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
export const getResultsList = params => {
  return request({
    dateType: 'json',
    async: true,
    method: 'get',
    url: '/v1_0/search',
    params
  })
}

// 获取用户搜索历史
