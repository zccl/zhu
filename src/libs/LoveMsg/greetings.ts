/**
 * @name greetings
 * @description 问候
 */
import API from '../../api/loveMsg'
import { wxNotify } from '../WxNotify'
import { greetingsTemplate } from './templates/greetingsT'

// 天气信息
const weatherInfo = async () => {
  const weather = await API.getWeather('云梦')
  const date = new Date().toLocaleDateString()
  console.log(date)
  console.log(weather.date)
  if (weather) {
    const lunarInfo = await API.getLunarDate(date)
    const oneWord = await API.getOneWord()
    const template = greetingsTemplate({ lunarInfo, oneWord })
    console.log('weatherInfo', template)

    // 发送消息
    await wxNotify(template)
  }
  return weather
}

// greetings
export const greetings = async () => {
  await weatherInfo()
}
