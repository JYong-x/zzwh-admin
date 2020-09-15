import { axios } from '@/utils/request'

const api = {
  list: '/v2/list',
  delete: '/v2/delete',
  add: '/v2/create'
}

function getList (params, pagination) {
  return axios({
    url: `${api.list}?page=${pagination.page}&pageSize=${pagination.pageSize}`,
    method: 'GET',
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
