/**
 * 图文消息，一个图文消息支持1到8条图文
 */

interface ArticlesProps {
  title: string
  description: string
  url: string
  picurl: string
}

export const newsTemplate = (list: TodayHeadlines[]) => {
  let articles = [] as ArticlesProps[]

  // map
  if (list && Array.isArray(list)) {
    articles = list.map((n) => {
      return {
        title: n.title,
        description: n.description,
        url: n.url,
        picurl: n.picUrl,
      }
    })
    articles.unshift({
      title: '摸鱼日历',
      description: '摸鱼日记的描述',
      // url: 'https://api.vvhan.com/api/lolsk0in',//lol皮肤
      // url: 'https://api.vvhan.com/api/avatar', //各种头像
      url: 'https://api.vvhan.com/api/moyu', // 摸鱼日历图
      picurl: 'https://i.bmp.ovh/imgs/2022/01/03ce2238ad19eb4d.png',
    })
  }

  console.log(JSON.stringify(articles, null, 2))

  return {
    msgtype: 'news',
    news: {
      articles,
    },
  }
}
