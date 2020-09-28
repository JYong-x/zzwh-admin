import { axios } from '@/utils/request'

const api = {
  list: '/v7/list',
  delete: '/v7/delete',
  add: '/v7/create'
}

function getList () {
  return axios({
    url: `${api.list}`,
    method: 'GET'
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
