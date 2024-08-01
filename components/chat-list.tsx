'use client'

import type { Message } from 'ai'
import { ChatMessage } from './chat-message'
import { useEffect } from 'react'

export interface ChatList {
  messages: Message[]
  onExit: () => Promise<void>
}

export function ChatList({ onExit, messages }: ChatList) {
  useEffect(() => {
    if (messages.length > 20) {
      onExit()
    }
  }, [messages, onExit])

  if (!messages.length) return <></>
  return (
    <div className="relative p-4 flex gap-4 flex-col">
      {messages.map((message, index) => (
        <div key={index}>
          <ChatMessage message={message} onExit={onExit} />
        </div>
      ))}
    </div>
  )
}
