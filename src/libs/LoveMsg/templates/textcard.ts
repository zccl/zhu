/**
 * @description 文本卡片模板 title + description
 * https://open.work.weixin.qq.com/api/doc/90000/90135/90236
 */

/**
 * 卡片类型模板定义
 * 模板内容配置
 * 微信通知 textcard类型的description内容限制512个字节
 */

import dayjs from '../../../utils/dayjs'

// 相识的日子
const start_stamp = '2020-10-02'

export const textCardTemplate = (data: TextCardTemplateProps) => {
  const {
    area,
    date,
    weather,
    highest,
    lowest,
    wind,
    windsc,
    // air,
    // air_level,
    tips,
    humidity,
    // alarm,
    lunarInfo,
    week,
    oneWord,
  } = data

  // 今日、恋爱天数
  const today = `${date.replace('-', '年').replace('-', '月')}日`
  const dateLength = dayjs(date).diff(start_stamp, 'day')

  // 公历节日、农历节日和二十四节气
  const { festival, lunar_festival, jieqi, lubarmonth, lunarday } = lunarInfo
  const festival_info = festival ? `| ${festival}` : ''
  const lunar_festival_info = lunar_festival ? `| ${lunar_festival}` : ''
  const jieqi_info = jieqi ? `| ${jieqi}` : ''

  // 拼接内容
  let description = `${area} | ${today} | ${week} ${festival_info}
农历 | ${lubarmonth}${lunarday} ${lunar_festival_info} ${jieqi_info}
`

  // 添加预警天气
  //   if (alarm) {
  //     description += `
  // 有预警信息哦：${alarm.alarm_type} | ${alarm.alarm_level}预警\n`
  //   }

  /*   // 最高温度
  if (+highest.slice(0, -1) <= 10) {
    description += `
哈喽哈喽~这里是给猪的爱心提醒哦：
今日最高温度仅为🥶 ${highest}，可冷可冷了~
猪可要注意保暖哦~\n`
  }

  if (tips) {
    description += `
生活指数提示：${tips}`
  } */

  if (oneWord) {
    description += `
『 ${oneWord.hitokoto} 』
`
  }

  // 内容末尾，自定义
  description += `
  [ 点我-每天60秒读懂世界 ] ❤️ 🧡 💛 💚 💖`

  const title = `这是我们相识的第 ${dateLength} 天`

  return {
    msgtype: 'textcard',
    textcard: {
      title,
      description,
      //   url: 'https://api.lovelive.tools/api/SweetNothings',
      //   url: 'https://v1.jinrishici.com/all.svg',
      url: 'https://api.vvhan.com/api/60s', // 60s看世界
      btntxt: 'By成',
    },
  }
}
