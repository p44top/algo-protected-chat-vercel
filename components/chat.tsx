'use client'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { Message } from '@/lib/types'
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor'
import { useChat, UseChatHelpers } from 'ai/react'
import { useEffect, useState } from 'react'
import { getCategory } from '@/app/actions'

export interface ChatProps extends React.ComponentProps<'div'> {
    initialMessages?: Message[]
    id: string
}

export type handleSubmitType = UseChatHelpers['handleSubmit']
export function Chat({ id, initialMessages = [], className }: ChatProps) {
    const [category, setCategory] = useState<string | null>('')
    const { messages, append, reload, stop, isLoading, input, setInput } = useChat({
        initialMessages,
        id,
        body: {
            id,
            category,
        },
        onResponse(response) {
            if (response.status === 401) {
                console.error(response.statusText)
            } else {
                // TODO: storage에 저장히기
            }
        },
    })
    const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } = useScrollAnchor()

    useEffect(() => {
        const category = getCategory(id)
        setCategory(category)
    }, [id])

    return (
        <div
            className="group w-full overflow-y-auto overflow-x-hidden scrollbar-hide pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
            ref={scrollRef}
        >
            <div className={cn('pb-[120px] pt-0', className)} ref={messagesRef}>
                {messages?.length > 0 && <ChatList messages={messages} />}
                <div className="w-full h-px" ref={visibilityRef} />
            </div>
            <ChatPanel
                id={id}
                isLoading={isLoading}
                input={input}
                setInput={setInput}
                isAtBottom={isAtBottom}
                scrollToBottom={scrollToBottom}
                append={append}
            />
        </div>
    )
}
