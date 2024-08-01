'use client'

import type { Message } from 'ai'
import { ChatMessage } from './chat-message'
import { useEffect, useMemo, useRef } from 'react'
import { getContent, getMessage, getSystem } from '@/lib/chat-api/parse'

export interface ChatList {
  messages: Message[]
  isLoading?: boolean
  onExit: () => Promise<void>
}

const USER_COMMAND = ['상황극 시작', '상황극 종료', 'Hint', '링크를 클릭한다']
export function ChatList({ onExit, isLoading, messages }: ChatList) {
  const isAlreadySend = useRef(false)
  const filteredMessages = useMemo(
    () =>
      messages
        .filter(({ role, content }) => {
          if (role === 'user') return !USER_COMMAND.includes(content)
          if (getSystem(role))
            return getMessage(content) || getContent(content) || false
          return false
        })
        .map(val =>
          val.role === 'user'
            ? val
            : ({
                ...val,
                content: getMessage(val.content) || getContent(val.content)
              } as Message)
        ),
    [messages]
  )
  useEffect(() => {
    if (!isLoading && filteredMessages.length > 5 && !isAlreadySend.current) {
      onExit()
      isAlreadySend.current = true
    }
  }, [filteredMessages, isLoading, onExit])

  if (!filteredMessages.length) return <></>
  return (
    <div className="relative p-4 flex gap-4 flex-col">
      {filteredMessages.map((message, index) => (
        <div key={index}>
          <ChatMessage message={message} onExit={onExit} />
        </div>
      ))}
    </div>
  )
}
