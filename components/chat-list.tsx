'use client'

import type { Message } from 'ai'
import { ChatMessage } from './chat-message'
import { useEffect } from 'react'
import { useDone } from '@/app/(chat)/[id]/action'

export interface ChatList {
    id: string
    messages: Message[]
}

export function ChatList({ id, messages }: ChatList) {
    const { done } = useDone(id)

    useEffect(() => {
        if (messages.length > 20) {
            done()
        }
    }, [messages, done])

    if (!messages.length) return <></>
    return (
        <div className="relative p-4 flex gap-4 flex-col">
            {messages.map((message, index) => (
                <div key={index}>
                    <ChatMessage message={message} />
                </div>
            ))}
        </div>
    )
}
