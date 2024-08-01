'use client'

import { useEffect, useState } from 'react'
import { ChatProfileHeader } from './chat-profile-header'
import { Chat } from './chat'
import { getChat, readChatID } from '@/app/actions'
import type { Chat as ChatType } from '@/lib/types'
import { useInsert } from '@/app/(chat)/[id]/action'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/useAuth'

export const ChatPageUsingStore = ({ id }: { id: string }) => {
  const router = useRouter()
  const [chatInfo, setChatInfo] = useState<ChatType>()

  useInsert()
  const user = useAuth()
  useEffect(() => {
    const chat = getChat(id)
    if (chat) {
      setChatInfo(chat)
      readChatID(chat.id)
    } else {
      // chat 정보가 없음. id가 invalid함. list로 리다이렉트
      router.replace('/list')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (!chatInfo) return <></>
  return (
    <>
      <ChatProfileHeader id={id} />
      <Chat id={id} initialMessages={chatInfo.messages} user={user} />
    </>
  )
}
