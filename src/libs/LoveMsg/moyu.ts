/**
 * @name moyu
 * @description 摸鱼人
 */
import API from '../../api/loveMsg'
import { wxNotify } from '../WxNotify'
import { newsTemplate } from './templates/news'

// 获取新闻
const getNews = async () => {
  try {
    const todayTopNews = await API.getTianTopNews()
    let result: any = []
    const len = todayTopNews.length

    if (len >= 7) {
      result = todayTopNews.slice(0, 7)
    }

    const template = newsTemplate(result)
    await wxNotify(template)
  } catch (error) {
    console.log('moyu', error)
  }
}

// 执行函数
export const moyu = async () => {
  await getNews()
}
