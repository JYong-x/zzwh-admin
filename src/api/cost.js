import { axios } from '@/utils/request'

const api = {
  list: '/api/v3/list',
  delete: '/api/v3/delete',
  add: '/api/v3/create'
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

function addData (data) {
  return axios({
    url: `${api.add}`,
    method: 'POST',
    data: data
  })
}

export default {
  getList,
  deleteData,
  addData
}
