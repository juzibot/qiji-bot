import {
  log,
  Message,
  Wechaty,
}             from 'wechaty'

export default async function onMessage (
  this    : Wechaty,
  message : Message,
): Promise<void> {
  log.info('on-message', 'onMessage(%s)', message)

  await dingDong.call(this, message)
}

async function dingDong (
  this: Wechaty,
  message: Message,
) {
  log.info('on-message', 'dingDong()')

  const text = message.text()
  const type = message.type()
  const room = message.room()
  const contact = message.from()

  if (room) {
    return
  }

  if (type === Message.Type.Text) {
    if (text.match(/^准备/i) || text.match(/^马上/i) || text.match(/^最近/i) || text.match(/^很快/i)) {
      await message.say('[Hey]嗯嗯，那您报名期间有什么问题可以随时联系我。')
      await message.say('期待在创业营见到您！')
      if (contact) {
        await contact.alias('核心-' + contact.name())
      }
    }
  }

}
