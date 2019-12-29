import {
  Room,
  Wechaty,
}             from 'wechaty'

import {
  log,
}                   from './config'

const CHATOPS_ROOM_TOPIC  = '奇绩创坛测试'
const CHATOPS_ROOM_ID     = '19783089510@chatroom'

let room: Room

export async function sendmes (
  bot: Wechaty,
  text: string,
): Promise<void> {
  log.info('chatops', 'chatops(%s)', text)

  if (!room) {
    let tryRoom = await bot.Room.find({ topic: CHATOPS_ROOM_TOPIC })
    if (!tryRoom) {
      tryRoom = bot.Room.load(CHATOPS_ROOM_ID)
    }

    room = tryRoom
  }

  await room.say(text)
}
