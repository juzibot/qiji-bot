import { VERSION } from '../config'

export async function onVersion (text: string) : Promise<string|null> {
  if (text.match(/^(ver|version|版本|你的版本|当前版本)$/)) {
    return `我的版本号是：${VERSION}`
  }
  return null
}