import { Friendship } from 'wechaty'

const NEW_FRIEND_GREETING = [
  '您好！我是奇绩创坛的尹伯昊[Hey]之后报名、面试的相关问题都可以问我。我们春季创业营会在2020年1月中旬开始邀请项目面试，越早填写报名表（apply.miracleplus.com）我们的团队会越早看到，如果您方便的话，可以最近准备填写完整和提交报名表啦。', '关注到您注册了我们春季创业营的报名表但是还没有填写完成，我们非常欢迎您的报名！并愿意与您一起走过早期创业的艰难。',
]

export class FriendshipManager {

  public static async autoProcessFriendship (friendship: Friendship) {
    const friendshipType = friendship.type()
    if (friendshipType === Friendship.Type.Receive) {
      await friendship.accept()
    } else if (friendshipType === Friendship.Type.Confirm) {
      const contact = friendship.contact()
      for (const greeting of NEW_FRIEND_GREETING) {
        await contact.say(greeting)
      }
    }
  }

}
