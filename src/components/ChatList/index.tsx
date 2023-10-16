import { forwardRef, useImperativeHandle, useState } from 'react'
import ChatItem from '../ChatItem'
import { ChatListProps, ChatListRef } from './types'
import * as S from './styles'

const ChatList = forwardRef<ChatListRef, ChatListProps>(function (
  { maxHeight = '350px', chatItems },
  ref,
) {
  const [open, setOpen] = useState(true)

  useImperativeHandle(ref, () => ({
    toggleList() {
      setOpen(!open)
    },
  }))

  return (
    <S.Wrapper maxHeight={maxHeight} isOpen={open}>
      <S.List>
        {chatItems.map((chatItem, index) => (
          <ChatItem
            key={index}
            chatRequester={chatItem.chatRequester}
            lastMessage={chatItem.lastMessage}
            newMessagesCount={chatItem.newMessagesCount}
          />
        ))}
      </S.List>
    </S.Wrapper>
  )
})

ChatList.displayName = 'ChatList'

export default ChatList
