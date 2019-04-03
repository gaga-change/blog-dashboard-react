import axios from 'axios'
const base = '/api'

// 响应拦截器
axios.interceptors.response.use(function (response) {
  let data = response.data
  return data
}, function (error) {
  return Promise.reject(error)
})

function listRest(name) {
  return (res) => ({
    page: res.page,
    data: res._embedded[name]
  })
}

export const tags = {
  post: params => axios.post(`${base}/tags`, params),
  delete: id => axios.delete(`${base}/tags/${id}`),
  put: params => axios.delete(`${base}/tags/${params.id}`, params),
  patch: params => axios.patch(`${base}/tags/${params.id}`, params),
  getList: params => axios.get(`${base}/tags`, { params }).then(listRest('tags')),
  getDetail: id => axios.get(`${base}/tags/${id}`),
}