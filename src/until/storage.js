// 对请求头进行操作

// 增加
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.sessionStorage.setItem(key, value)
}
// 删除
export const removeItem = key => {
  window.sessionStorage.removeItem(key)
}
// 改正
// 获取
export const getItem = key => {
  const data = window.sessionStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
