/**
 * @name goodEvening
 * @description 说晚安
 */
import API from '../../api/loveMsg'
import { wxNotify } from '../WxNotify'

// 获今日取故事
const getStory = async () => {
  const res = await API.getStorybook()
  const template = {
    msgtype: 'text',
    text: {
      content: `给小猪的今日份睡前故事来喽：
🌑🌒🌓🌔🌕🌝😛\n
『${res.title}』
${res.content}`,
    },
  }

  await wxNotify(template)
}

// 执行函数
export const goodEvening = async () => {
  await getStory()
}
