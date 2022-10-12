import request from '@/utils/request'

export function alarmSearch(params) {
  return request({
    url: 'alarm/search',
    method: 'get',
    params
  })
}

export function alarmDeal(params) {
  return request({
    url: 'alarm/deal',
    method: 'post',
    data: JSON.stringify(params)
  })
}
