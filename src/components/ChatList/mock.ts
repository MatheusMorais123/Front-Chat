import { chatItemMock } from '../ChatItem/mock'
import { ChatListProps } from './types'

export const chatListMock: ChatListProps = {
  chatItems: Array(20).fill(chatItemMock),
  maxHeight: '500px',
}
