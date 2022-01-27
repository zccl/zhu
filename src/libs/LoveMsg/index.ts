/**
 * @name loveMsg
 * @description 入口
 */
import dotenv from 'dotenv'
import { goodMorning } from './goodMorning'
import { greetings } from './greetings'
import { goodAfternoon } from './goodAfternoon'
import { goodEvening } from './goodEvening'
import { moyu } from './moyu'
dotenv.config()

const { MESSAGE_TYPE } = process.env

export default function main() {
  if (MESSAGE_TYPE === 'goodAfternoon') {
    // 午安
    goodAfternoon()
  } else if (MESSAGE_TYPE === 'goodEvening') {
    // 晚安
    goodEvening()
  } else if (MESSAGE_TYPE === 'greetings') {
    // 晚安
    greetings()
  } else if (MESSAGE_TYPE === 'moyu') {
    // 摸鱼
    moyu()
  } else {
    // 早安
    goodMorning()
  }
}
