import { Friendship } from 'wechaty'

const NEW_FRIEND_GREETING = [
  "你好！","这里是奇绩创坛！"
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
