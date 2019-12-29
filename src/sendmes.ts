import {
  Message,
}             from 'wechaty'

export async function sendmes (
  message: Message,
  text: string,
) {
  const type = message.type()
  if (type === Message.Type.Text) {
    await message.say(text)
  }
}

