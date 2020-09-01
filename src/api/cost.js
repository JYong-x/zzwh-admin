import { axios } from '@/utils/request'

const api = {
  costList: '/api/v3/list'
}

function getList (params, pagination) {
  return axios({
    url: `${api.costList}?page=${pagination.page}&pageSize=${pagination.pageSize}`,
    method: 'POST',
    data: params
  })
}

export default {
  getList
}
