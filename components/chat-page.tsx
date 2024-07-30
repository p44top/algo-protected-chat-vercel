'use client'

import { useEffect, useState } from 'react'
import { ChatProfileHeader } from './chat-profile-header'
import { Chat } from './chat'
import { getChat } from '@/app/actions'
import type { Chat as ChatType } from '@/lib/types'

export const ChatPageUsingStore = ({ id }: { id: string }) => {
    const [chatInfo, setChatInfo] = useState<ChatType>()

    useEffect(() => {
        const chat = getChat(id)
        if (chat) {
            setChatInfo(chat)
        } else {
            // TODO: chat 정보가 없음. id가 invalid함. list로 리다이렉트
        }
    }, [])

    if (!chatInfo) return <></>
    return (
        <>
            <ChatProfileHeader id={id} />
            <Chat id={id} initialMessages={chatInfo.messages} />
        </>
    )
}
