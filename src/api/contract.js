import { axios } from '@/utils/request'

const api = {
  list: '/api/v2/list',
  delete: '/api/v2/delete'
}

function getList (params, pagination) {
  return axios({
    url: `${api.list}?page=${pagination.page}&pageSize=${pagination.pageSize}`,
    method: 'POST',
    data: params
  })
}
function deleteData (contractId) {
  return axios({
    url: `${api.delete}?id=${contractId}`,
    method: 'POST'
  })
}

export default {
  getList,
  deleteData
}
