import request from '@/utils/request'

export function getDeviceSum() {
  return request({
    url: 'device/sum',
    method: 'get'
  })
}
export function getDeviceCodeList() {
  return request({
    url: 'device_code/list',
    method: 'get'
  })
}
export function deviceSearch(params) {
  return request({
    url: 'device/search',
    method: 'get',
    params
  })
}
export function deviceModify(data) {
  return request({
    url: 'device/modify',
    method: 'post',
    data: JSON.stringify(data)
  })
}
