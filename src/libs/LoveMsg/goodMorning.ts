/**
 * @name goodMorning
 * @description 说早安
 */
import API from '../../api/loveMsg'
import { wxNotify } from '../WxNotify'
import { textTemplate } from './templates/text'
import { textCardTemplateW } from './templates/textcardW'
import { textCardTemplate } from './templates/textcard'

// 美丽短句
const goodWord = async (weather: Weather) => {
  try {
    // 并行请求，优响相应
    const dataSource = await Promise.allSettled([
      API.getSaylove(), // 土味情话
      API.getCaihongpi(), // 彩虹屁
      API.getOneWord(), // 一言
      API.getSongLyrics(), // 最美宋词
      API.getOneMagazines(), // one杂志
      API.getNetEaseCloud(), // 网易云热评
      API.getDayEnglish(), // 每日英语
      API.getIsHoliday(new Date().toLocaleDateString()), // 每日英语
    ])

    // 过滤掉异常数据
    const [
      sayLove,
      caiHongpi,
      oneWord,
      songLyrics,
      oneMagazines,
      netEaseCloud,
      dayEnglish,
      isHoliday,
    ] = dataSource.map((n) => (n.status === 'fulfilled' ? n.value : null))

    // 对象写法
    const data: any = {
      sayLove,
      caiHongpi,
      oneWord,
      songLyrics,
      oneMagazines,
      netEaseCloud,
      dayEnglish,
      isHoliday,
      weather,
    }

    const template = textTemplate(data)
    console.log('goodWord', template)

    wxNotify(template)
  } catch (error) {
    console.log('goodWord:err', error)
  }
}

// 天气信息
const weatherInfo = async () => {
  const weather = await API.getWeather('云梦')
  if (weather) {
    const loveW = await API.getLoveW()
    const lunarInfo = await API.getLunarDate(weather.date)
    const isHoliday = await API.getIsHoliday(weather.date)
    const oneWord = await API.getOneWord()
    const templateW = textCardTemplateW({ ...weather, loveW, lunarInfo, isHoliday, oneWord })
    console.log('weatherInfoW', templateW)
    const template = textCardTemplate({ ...weather, loveW, lunarInfo, isHoliday, oneWord })
    console.log('weatherInfo', template)

    // 发送消息
    await wxNotify(templateW)
    await wxNotify(template)
  }
  return weather
}

// goodMorning
export const goodMorning = async () => {
  const weather = await weatherInfo()
  await goodWord(weather)
}
