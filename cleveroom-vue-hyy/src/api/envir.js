import request from '@/utils/request'

export function sensorDataSearch(params) {
  return request({
    url: 'sensor_data/search',
    method: 'get',
    params
  })
}

export function sensorDataShow(params) {
  return request({
    url: 'sensor_data/show',
    method: 'get',
    params
  })
}
