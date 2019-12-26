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
  const name = contact.name()

  // const mentionLisrt = await message.mention()

  if (room) {
    return
  }

  if (type === Message.Type.Text) {
    if (text.toLowerCase() === 'ding') {
      await message.say('dong')
      try {
        await contact.alias('lijiarui')
        console.log(`change ${contact.name()}'s alias successfully!`)
      } catch (e) {
        console.log(`failed to change ${contact.name()} alias!`)
      }
    }
  }

}
