import Hapi, { Request, ResponseToolkit }    from '@hapi/hapi'
import {
  Wechaty, Message,
}               from 'wechaty'

import {
  log,
  PORT,
}             from './config'
import { chatops } from './chatops'
import { sendmes } from './sendmes'

let wechaty: Wechaty
let message: Message

async function chatopsHandler (request: Request, response: ResponseToolkit) {
  log.info('startWeb', 'chatopsHandler()')

  const payload: {
    chatops: string,
  } = request.payload as any

  await chatops(wechaty, payload.chatops)

  return response.redirect('/')
}

async function sendmesHandler (request: Request, response: ResponseToolkit) {
  log.info('startWeb', 'sendmesHandler()')

  const payload: {
    sendmes: string,
  } = request.payload as any

  await sendmes(message, payload.sendmes)

  return response.redirect('/')
}

export async function githubWebhookHandler (
  request: Request,
  response: ResponseToolkit,
) {
  log.info('startWeb', 'githubWebhookHandler()')

  const payload = request.payload as any

  log.verbose(JSON.stringify(payload))

  return response.response()
}

export async function startWeb (
  bot: Wechaty,
): Promise<void> {
  log.verbose('startWeb', 'startWeb(%s)', bot)

  let qrcodeValue : undefined | string
  let userName    : undefined | string

  wechaty = bot

  const server =  new Hapi.Server({
    port: PORT,
  })

  const FORM_HTML = `
    <form action="/chatops/" method="post">
      <label for="chatops">ChatOps: </label>
      <input id="chatops" type="text" name="chatops" value="Hello, BOT5.">
      <input type="submit" value="ChatOps">
    </form>
  `
  const handler = async () => {
    let html

    if (qrcodeValue) {

      html = [
        `<image src="https://phaedodata-1253507825.cos.ap-beijing.myqcloud.com/QijiBot/Wait.png" style="width:100%">`,
        '\n\n',
        '<div align="center">',
        '<image src="',
        'https://api.qrserver.com/v1/create-qr-code/?data=',
        encodeURIComponent(qrcodeValue),
        '">',
        '</div>',
      ].join('')

    } else if (userName) {
      let MessageList = await bot.Message.findAll()
      let MessageHtml = `以下是最新出现的一些聊天记录 <ol>`
      for (let mes of MessageList) {
        if (mes.from()?.name()!== userName) {
          const what = await mes.text()
          const who = await mes.from()?.name()
          const NewHTML = [
            `<form action="`,
            sendmes(mes, '已经收到'),
            `method="post">`,
            '<input type="submit" value="已经收到">',
            '</form>',
          ].join('')
          MessageHtml = MessageHtml + `<li> ${who} / ${what} </li>\n` + NewHTML
        }
        MessageHtml = MessageHtml + `</ol>`

        html = [
          `<image src="https://phaedodata-1253507825.cos.ap-beijing.myqcloud.com/QijiBot/InUse.png" style="width:100%">`,
          `<p> ${userName} 正在使用 </p>`,
          FORM_HTML,
          MessageHtml,
        ].join('')
      }
    } else {

      html = `<image src="https://phaedodata-1253507825.cos.ap-beijing.myqcloud.com/QijiBot/Black.png" style="width:100%">`

    }
    return html
  }

  server.route({
    handler,
    method : 'GET',
    path   : '/',
  })

  server.route({
    handler: chatopsHandler,
    method : 'POST',
    path   : '/chatops/',
  })

  server.route({
    handler: sendmesHandler,
    method : 'POST',
    path   : '/sendmes/',
  })

  bot.on('scan', qrcode => {
    qrcodeValue = qrcode
    userName    = undefined
  })
  bot.on('login', user => {
    qrcodeValue = undefined
    userName    = user.name()
  })
  bot.on('logout', () => {
    userName = undefined
  })

  await server.start()
  log.info('startWeb', 'startWeb() listening to http://localhost:%d', PORT)
}
