import request from '@/utils/request'

export function codeSearch(params) {
  return request({
    url: 'code/search',
    method: 'get',
    params
  })
}
export function codeDelete(params) {
  return request({
    url: 'code/delete',
    method: 'get',
    params
  })
}

export function codeModify(data) {
  return request({
    url: 'code/modify',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function codeAdd(data) {
  return request({
    url: 'code/add',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function getCodeList(params) {
  return request({
    url: 'code/list',
    method: 'get',
    params
  })
}
