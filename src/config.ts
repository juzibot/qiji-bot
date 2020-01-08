/**
 * VERSION
 */
import readPkgUp from 'read-pkg-up'

import { KeywordRoomConfig, CRONConfig } from './schema'

export {
  log,
}               from 'brolog'

const pkg = readPkgUp.sync({ cwd: __dirname })!.packageJson
export const VERSION = pkg.version

/**
 * Env Vars
 */
export const PORT = process.env.PORT || 8788

export const CHATOPS_ROOM_TOPIC = '奇绩创坛测试' // 'BOT5 Club ChatOps'
export const CHATOPS_ROOM_ID = '19783089510@chatroom'

export const KEYWORD_ROOM_CONFIG: KeywordRoomConfig[] = [
  {
    cipherList: [
      'Qiji',
    ],
    rules: [],
    topic: 'ChatOps - Qiji BOT',
    welcomes: [
      '奇绩创坛运营群',
    ],
  },
]

// 定时任务测试
// # ┌────────────── second (optional)
// # │ ┌──────────── minute
// # │ │ ┌────────── hour
// # │ │ │ ┌──────── day of month
// # │ │ │ │ ┌────── month
// # │ │ │ │ │ ┌──── day of week
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// # * * * * * *
export const CRON_CONFIG: CRONConfig[] = [
  {
    reply: '新的一分钟开始了',
    time: '0 * * * * *',
  },
]
