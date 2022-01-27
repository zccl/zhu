/**
 * @description 文本卡片模板 title + description
 * https://open.work.weixin.qq.com/api/doc/90000/90135/90236
 */

/**
 * 卡片类型模板定义
 * 模板内容配置
 * 微信通知 textcard类型的description内容限制512个字节
 */

import dayjs, { weekToday } from '../../../utils/dayjs'

// 相识的日子
const start_stamp = '2020-10-02'

export const greetingsTemplate = (data: GreetingsTemplateProps) => {
  const { lunarInfo, oneWord } = data
  console.log(lunarInfo)

  // 今日、恋爱天数
  const date = new Date().toLocaleDateString()
  const week = weekToday()
  const today = `${date.replace('/', '年').replace('/', '月')}日`
  const dateLength = dayjs(date).diff(start_stamp, 'day')

  // 公历节日、农历节日和二十四节气
  const { festival, lunar_festival, jieqi, lubarmonth, lunarday } = lunarInfo
  const festival_info = festival ? `| ${festival}` : ''
  const lunar_festival_info = lunar_festival ? `| ${lunar_festival}` : ''
  const jieqi_info = jieqi ? `| ${jieqi}` : ''

  // 拼接内容
  let description = `${today} | ${week} ${festival_info}
农历 | ${lubarmonth}${lunarday} ${lunar_festival_info} ${jieqi_info}
`

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
