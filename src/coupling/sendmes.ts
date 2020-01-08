import { getWechaty } from '../get-wechaty'

export async function sendmes (
  text: string,
  toId: string,
) {
  const name = process.env.WECHATY_NAME || 'heroku-wechaty'
  const bot = getWechaty(name)
  // const type = message.type()
  // if (type === Message.Type.Text) {
  //   await message.say(text)
  // }
  const contact = bot.Contact.load(toId)
  await contact.sync()
  await contact.say(text)
}
