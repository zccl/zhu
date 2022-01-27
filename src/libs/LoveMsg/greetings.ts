/**
 * @name greetings
 * @description 问候
 */
import API from '../../api/loveMsg'
import { wxNotify } from '../WxNotify'
import { greetingsTemplate } from './templates/greetingsT'
import dayjs from 'dayjs'

// 天气信息
const greetingsInfo = async () => {
  const date = dayjs().format('YYYY-MM-DD')
  const lunarInfo = await API.getLunarDate(date)
  const oneWord = await API.getOneWord()
  const template = greetingsTemplate({ lunarInfo, oneWord })
  console.log('greetingsInfo', template)

  // 发送消息
  await wxNotify(template)
}

// greetings
export const greetings = async () => {
  await greetingsInfo()
}
