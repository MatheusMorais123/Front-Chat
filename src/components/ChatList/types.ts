import { ChatItemProps } from '../ChatItem/types'

export type ChatListProps = {
  chatItems: ChatItemProps[]
  maxHeight?: string
}

export type ChatListRef = {
  toggleList: () => void
}
