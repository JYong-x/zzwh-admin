import { axios } from '@/utils/request'

const api = {
  list: '/api/v6/list',
  delete: '/api/v6/delete',
  add: '/api/v6/create'
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
