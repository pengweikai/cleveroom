import Mock from 'mockjs'

export function getHomeTotal() {
  return [
    {
      title: '总设备数',
      value: Mock.mock('@natural(0, 9999999)'),
      color: Mock.mock('@hex'),
      data: [Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)')]
    },
    {
      title: '在线设备数',
      value: Mock.mock('@natural(0, 9999999)'),
      color: Mock.mock('@hex'),
      data: [Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)')]
    },
    {
      title: '离线设备数',
      value: Mock.mock('@natural(0, 9999999)'),
      color: Mock.mock('@hex'),
      data: [Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)')]
    },
    {
      title: '传感器数',
      value: Mock.mock('@natural(0, 9999999)'),
      color: Mock.mock('@hex'),
      data: [Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)')]
    },
    {
      title: '控制设备数',
      value: Mock.mock('@natural(0, 9999999)'),
      color: Mock.mock('@hex'),
      data: [Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)')]
    },
    {
      title: '非控制设备数',
      value: Mock.mock('@natural(0, 9999999)'),
      color: Mock.mock('@hex'),
      data: [Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)'), Mock.mock('@integer(1, 120)')]
    }
  ]
}

export function getHomeDetailItem() {
  return [
    {
      name: '总设备数',
      value: Mock.mock('@natural(0, 999999)'),
      color: '#ec407a'
    },
    {
      name: '在线设备数',
      value: Mock.mock('@natural(0, 999999)'),
      color: '#ab47bc'
    },
    {
      name: '离线设备数',
      value: Mock.mock('@natural(0, 999999)'),
      color: '#2196f3'
    },
    {
      name: '传感器数',
      value: Mock.mock('@natural(0, 999999)'),
      color: '#009688'
    },
    {
      name: '控制设备数',
      value: Mock.mock('@natural(0, 999999)'),
      color: '#009688'
    },
    {
      name: '非控制设备数',
      value: Mock.mock('@natural(0, 999999)'),
      color: '#009688'
    }
  ]
}

const rankList = []
const count = 30
for (let i = 0; i < count; i++) {
  rankList.push(Mock.mock({
    name: '@cname',
    value: '@natural(0, 9999999)',
    avatar: 'https://avatars.githubusercontent.com/u/' + '@natural(1000000, 9999999)'
  }))
}
export function getHomeInvestmentRank() {
  return rankList
}
