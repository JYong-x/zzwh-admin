import { axios } from '@/utils/request'

const api = {
  list: '/api/v5/list',
  delete: '/api/v5/delete',
  add: '/api/v5/create'
}

function getList (params, pagination) {
  return axios({
    url: `${api.list}?page=${pagination.page}&pageSize=${pagination.pageSize}`,
    method: 'POST',
    data: params
  })
}

export default {
  getList
}
