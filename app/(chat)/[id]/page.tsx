

import { getChat } from '@/app/actions'
import { Chat } from '@/components/chat'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const chat = await getChat(params.id)
  return <Chat id={chat.id} initialMessages={chat.messages} />
}
