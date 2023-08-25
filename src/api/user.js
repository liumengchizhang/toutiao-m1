// 用户相关
import request from '@/until/request'
export const login = data => {
  return request({
    method: 'post',
    url: '/v1_0/authorizations',
    data: data
  })
}

export const getSmsCode = mobile => {
  return request({
    method: 'get',
    url: '/v1_0/sms/codes/' + mobile
  })
}

// 获取用户信息
export const getUserinfo = () => {
  return request({
    method: 'get',
    url: '/v1_0/user'
  })
}

// 关注
export const followUserinfo = id => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: id
    }
  })
}
// 取消关注
export const notFollowUserinfo = id => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${id}`
  })
}

// 获取用户资料
export const personalCenter = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}

// 更新用户资料
export const putPersonalinfo = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

// 更新用户的头像
export const putPersonalavatar = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
