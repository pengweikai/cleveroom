import request from '@/utils/request'

export function positionListTree() {
  return request({
    url: 'position/list/tree',
    method: 'get'
  })
}

export function positionListDevice(params) {
  return request({
    url: 'position/list_device',
    method: 'get',
    params
  })
}

export function positionCodeToList(params) {
  return request({
    url: 'position/list_positionId',
    method: 'get',
    params
  })
}
