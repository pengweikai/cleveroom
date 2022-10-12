import request from '@/utils/request'

export function getRegionMsg(params) {
  return request({
    url: 'visual/region',
    method: 'get',
    params
  })
}
export function getRegionTotalMsg(params) {
  return request({
    url: 'visual/regionTotal',
    method: 'get',
    params
  })
}

export function getLastConsume(params) {
  return request({
    url: 'visual/lastConsume',
    method: 'get',
    params
  })
}

