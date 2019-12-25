const process = require('process')
const tencentcloud = require('tencentcloud-sdk-nodejs')

const TbpClient = tencentcloud.tbp.v20190627.Client
const models = tencentcloud.tbp.v20190627.Models

const Credential = tencentcloud.common.Credential
const ClientProfile = tencentcloud.common.ClientProfile
const HttpProfile = tencentcloud.common.HttpProfile

export async function talkTBP (text: string): Promise<string | null> {

  let cred = new Credential(process.env.TBP_SecretId, process.env.TBP_SecretKey)
  let httpProfile = new HttpProfile()
  httpProfile.endpoint = 'tbp.tencentcloudapi.com'
  let clientProfile = new ClientProfile()
  clientProfile.httpProfile = httpProfile
  let client = new TbpClient(cred, 'ap-beijing', clientProfile)

  let req = new models.TextProcessRequest()

  let params = JSON.stringify({
    'BotEnv': 'release',
    'BotId': process.env.TBP_BotId,
    'InputText': text,
    'TerminalId': '1',
  })
  req.from_json_string(params)

  return new Promise(resolve => {
    client.TextProcess(req, (errMsg: any, response: any) => {

      if (errMsg) {
        // console.log(errMsg)
        resolve(null)
      }

      let ret = response.to_json_string()
      let obj: any = JSON.parse(ret)
      resolve(obj['ResponseMessage']['GroupList'][0]['Content'])
    })
  })

}