import request from '@/until/request'
// 获取用户的频道
export const getUserChannel = () => {
  return request({
    method: 'get',
    url: '/v1_0/user/channels'
  })
}

// 获取所有频道
export const getAllsChannels = () => {
  return request({
    method: 'get',
    url: '/v1_0/channels'
  })
}
// 增加用户频道
export const getaddUserChannels = channels => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channels]
    }
  })
}

// 删除用户指定的频道
export const deleteUserChannels = id => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${id}`
  })
}
