/**
 * @description 文本卡片模板 title + description
 * https://open.work.weixin.qq.com/api/doc/90000/90135/90236
 */

/**
 * 卡片类型模板定义
 * 模板内容配置
 * 微信通知 textcard类型的description内容限制512个字节
 */

export const textCardTemplateW = (data: TextCardTemplateProps) => {
  const {
    area,
    weather,
    highest,
    lowest,
    wind,
    windsc,
    humidity,
    loveW,
    type
  } = data

  // 拼接内容
  let description = `\天气：${weather} | 温度：${lowest} ~ ${highest} | ${wind}：${windsc} | 湿度：${humidity}%\n `
  // 添加预警天气
  //   if (alarm) {
  //     description += `
  // 有预警信息哦：${alarm.alarm_type} | ${alarm.alarm_level}预警\n`
  //   }

  // 最高温度
  if (+highest.slice(0, -1) < 10) {
    description += `
哈喽哈喽~这里是给猪的爱心提醒哦：
今日最高温度仅为🥶 ${highest}，可冷可冷了~
猪可要注意保暖哦~\n`
  } else if (+highest.slice(0, -1) >= 30) {
    description += `
哈喽哈喽~这里是给猪的爱心提醒哦：
今日最高温度有🥵 ${highest}，可热可热了~如有需要记得擦防晒霜~猪可要注意避免热到中暑哟~\n`
  }

  /* if (tips) {
    description += `
  生活指数提示：${tips}`
  } */

  if (loveW) {
    description += `
『 ${loveW.hitokoto} 』
`
  }

  // 内容末尾，自定义
  description += `
  [ 点我-有惊喜~ ] ❤️ 🧡 💛 💚 💖`

  const title = `${area}${type ? '明日' : '今日'}天气状况：`

  return {
    msgtype: 'textcard',
    textcard: {
      title,
      description,
      // url: 'https://api.lovelive.tools/api/SweetNothings',
      url: 'https://api.vvhan.com/api/acgimg', // 二次元动漫壁纸
      // url: 'https://www.dmoe.cc/random.php', // 二次元动漫壁纸
      // url: 'https://api.vvhan.com/api/60s', // 60s看世界
      btntxt: 'By成'
    }
  }
}
