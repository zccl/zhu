/**
 * @description 纯文本模板-企业微信消息通知
 * https://open.work.weixin.qq.com/api/doc/90000/90135/90236
 */

import dayjs from '../../../utils/dayjs'
// import dayjs, { weekToday } from '../../../utils/dayjs'

export const textTemplate = (data: TextTemplateProps) => {
  const {
    caiHongpi,
    sayLove,
    songLyrics,
    oneMagazines,
    netEaseCloud,
    oneWord,
    dayEnglish,
    isHoliday,
    weather,
  } = data

  let text = '早安呀，可爱的猪~\n'

  // 工作日/休息日，需要排除节假日
  // const week = weekToday()
  if (isHoliday?.isnotwork === 0) {
    text += `
如果我猪已经起床啦！向你说早安呦~，记得吃早饭呀😆\n
嗯哼哼~今天可是工作日！上班别迟到了哦~\n`
  } else {
    text += `
如果我小猪还没起床！就我等着小猪起床给我说早安呦🤣
嗯哼~，既然今天是休息日，就再睡会懒觉~没关系啦~😝\n`
  }

  if (weather) {
    // 生活指数提示：
    text += `
生活指数提示：${weather.tips}\n`
  }

  // 添加笑话
  if (caiHongpi) {
    //     text += `
    // 彩虹屁：
    text += `
${caiHongpi.content}\n`
  }

  if (sayLove) {
    text += `
${sayLove.content}\n`
  }

  // 诗句
  if (songLyrics) {
    text += `
『${songLyrics.source}』${songLyrics.content}\n`
  }

  if (oneMagazines) {
    text += `
『ONE杂志』${oneMagazines.word}\n`
  }

  if (netEaseCloud) {
    text += `
『网易云音乐热评』${netEaseCloud.content}——${netEaseCloud.source}\n`
  }

  // 添加一句一言
  if (oneWord) {
    text += `
『一言』${oneWord.hitokoto}\n`
  }

  // 每日英语
  if (dayEnglish) {
    text += `
『每日英语（${dayjs(dayEnglish.date).format('ll')}』${dayEnglish.content}`
  }

  return {
    msgtype: 'text',
    text: {
      content: text,
    },
  }
}
