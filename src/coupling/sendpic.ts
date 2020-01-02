import { getWechaty } from '../get-wechaty'
import { FileBox }  from 'file-box'

export async function sendpic (
  url: string,
  toId: string,
) {
  const name = process.env.WECHATY_NAME || 'heroku-wechaty'
  const bot = getWechaty(name)
  const contact = bot.Contact.load(toId)
  await contact.sync()
  const fileBox = FileBox.fromUrl(url)
  await contact.say(fileBox)
}
