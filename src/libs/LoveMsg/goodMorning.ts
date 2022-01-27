/**
 * @name goodMorning
 * @description 说早安
 */
import API from '../../api/loveMsg'
import { wxNotify } from '../WxNotify'
import { textTemplate } from './templates/text'
import { textCardTemplateW } from './templates/textcardW'

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
  const date = new Date().toLocaleDateString()
  if (weather) {
    const loveW = await API.getLoveW()
    const isHoliday = await API.getIsHoliday(date)
    const templateW = textCardTemplateW({ ...weather, loveW, isHoliday })
    console.log('weatherInfoW', templateW)

    // 发送消息
    await wxNotify(templateW)
  }
  return weather
}

// goodMorning
export const goodMorning = async () => {
  const weather = await weatherInfo()
  await goodWord(weather)
}
