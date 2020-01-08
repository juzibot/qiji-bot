import { finis }    from 'finis'
import { Wechaty }  from 'wechaty'

import {
  chatops,
}             from './coupling/chatops'
import {
  log,
  VERSION,
}             from './config'

const BOT_NAME = 'Qiji BOT'

const LOGIN_ANNOUNCEMENT  = `奇绩创坛小助手上线～\n${BOT_NAME} v${VERSION}`
const EXIT_ANNOUNCEMENT   = `奇绩创坛小助手下线～\n${BOT_NAME} v${VERSION}`

let bot: undefined | Wechaty

export async function startFinis (wechaty: Wechaty): Promise<void> {
  if (bot) {
    throw new Error('startFinis should only init once')
  }
  bot = wechaty

  bot.on('login',   _ => chatops(wechaty, LOGIN_ANNOUNCEMENT))
  bot.on('logout',  user => log.info('Finis', 'startFinis() bot %s logout', user))
}

/**
 *
 * SIGTERM
 *
 */
let FINIS_QUITING = false

finis(async (code, signal) => {
  if (!bot) {
    log.warn('Finis', 'finis() no bot set, NOOP')
    return
  }

  if (FINIS_QUITING) {
    log.warn('Finis', 'finis(%s, %s) called again when quiting... NOP', code, signal)
    return
  }

  FINIS_QUITING = true
  log.info('Finis', 'finis(%s, %s)', code, signal)

  if (bot.logonoff()) {
    log.info('Finis', 'finis() announce exiting')
    try {
      // log.level('silly')
      await chatops(bot, EXIT_ANNOUNCEMENT)
      log.info('startFinis', 'finis() chatops() done')
      await bot.say(EXIT_ANNOUNCEMENT)
      log.info('startFinis', 'finis() bot.say() done')
      await new Promise(resolve => setTimeout(resolve, 10 * 1000))
      log.info('startFinis', 'finis() sleep 10s done')
    } catch (e) {
      log.error('Finis', 'finis() exception: %s', e)
    }
  } else {
    log.info('Finis', 'finis() bot had been logout-ed')
  }

  setTimeout(() => {
    log.info('Finis', 'finis() hard exit')
    setImmediate(() => process.exit(code))
  }, 10 * 1000)
  log.info('Finis', 'finis() setTimeoutprocess.exit(), 10 * 1000)')

  try {
    log.info('Finis', 'finis() setTimeout() going to exit with %d', code)
    if (bot) {
      await bot.stop()
    }
  } catch (e) {
    log.error('Finis', 'finis() setTimeout() exception: %s', e)
  } finally {
    log.info('Finis', 'finis() soft exit')
    setImmediate(() => process.exit(code))
  }
})
