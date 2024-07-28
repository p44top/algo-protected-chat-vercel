import type { Message } from 'ai';
import { ChatMessage } from './chat-message';

export interface ChatList {
  messages: Message[];
}

export function ChatList({ messages }: ChatList) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="relative px-4 py-4 flex gap-4 flex-col">
      {messages.map((message, index) => (
        <div key={index}>
          <ChatMessage message={message} />
        </div>
      ))}
    </div>
  )
}
