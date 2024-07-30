'use client'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { Message } from '@/lib/types'
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor'
import { useChat, UseChatHelpers } from 'ai/react'
import { useEffect, useMemo, useState } from 'react'
import { getCategory } from '@/app/actions'
import { ChatHint } from './chat-hint'

export interface ChatProps extends React.ComponentProps<'div'> {
    initialMessages?: Message[]
    id: string
}

const USER_COMMAND = ['상황극 시작', '상황극 종료', 'Hint', '링크를 클릭한다']
export type handleSubmitType = UseChatHelpers['handleSubmit']
export function Chat({ id, initialMessages = [], className }: ChatProps) {
    const [category, setCategory] = useState<string | null>('')
    const { messages, append, setMessages, reload, stop, isLoading, input, setInput } = useChat({
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

    const filteredMessages = useMemo(
        () =>
            messages
                .filter(({ role, content }) => {
                    if (role === 'user') return !USER_COMMAND.includes(content)
                    if (role === 'system') return content.includes('Message') && JSON.parse(content)?.Message
                    return false
                })
                .map((val) =>
                    val.role === 'user'
                        ? val
                        : ({
                              ...val,
                              content: JSON.parse(val.content)?.Message,
                          } as Message),
                ),
        [messages],
    )

    const Hint = useMemo(() => {
        const lastHintMessage = messages.findLast(
            ({ role, content }) => role === 'system' && content.includes('Hint') && JSON.parse(content)?.Hint,
        )
        return lastHintMessage
    }, [messages])

    const FeedBack = useMemo(() => {
        const FeedBack = messages.findLast(
            ({ role, content }) => role === 'system' && content.includes('summary') && JSON.parse(content)?.summary,
        )
        return FeedBack
    }, [messages])

    return (
        <div
            className="group w-full overflow-y-auto overflow-x-hidden scrollbar-hide pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
            ref={scrollRef}
        >
            <div className={cn('pb-[120px] pt-0', className)} ref={messagesRef}>
                {filteredMessages?.length > 0 && <ChatList messages={filteredMessages} />}
                <div className="w-full h-px" ref={visibilityRef} />
            </div>
            <ChatPanel
                isFinished={FeedBack ? true : false}
                isLoading={isLoading}
                input={input}
                setInput={setInput}
                isAtBottom={isAtBottom}
                scrollToBottom={scrollToBottom}
                append={append}
            />
            <ChatHint hint={Hint} messages={messages} setMessages={setMessages} append={append} />
        </div>
    )
}
