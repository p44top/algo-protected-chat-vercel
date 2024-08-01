'use client'

import { cn, nanoid } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { Message, UserInfo } from '@/lib/types'
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor'
import { useChat, UseChatHelpers } from 'ai/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { addMessages, getCategory } from '@/app/actions'
import { ChatHint } from './chat-hint'
import { ChatDone } from './chat-done'
import { useDone } from '@/app/(chat)/[id]/action'
import { ChatFeedBack } from './chat-feedback'
import {
  getContent,
  getHintInfo,
  getMessage,
  getParseFeedback,
  getSummary,
  getSystem
} from '@/lib/chat-api/parse'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id: string
  user?: UserInfo
}

export type handleSubmitType = UseChatHelpers['handleSubmit']
export function Chat({ id, initialMessages = [], user }: ChatProps) {
  const [category, setCategory] = useState<string | null>('')
  const { isDone } = useDone(id)
  const {
    messages,
    append,
    setMessages,
    reload,
    stop,
    isLoading,
    input,
    setInput
  } = useChat({
    initialMessages,
    id,
    body: {
      id,
      category,
      user
    }
  })
  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor(isLoading)

  useEffect(() => {
    const category = getCategory(id)
    if (category === -1) {
      // 해당 id의 카테고리가 없음.
      return
    }
    setCategory(category)
  }, [id])

  const Hint = useMemo(() => {
    const lastHintMessage = messages.findLast(
      ({ role, content }) => getSystem(role) && getHintInfo(content)
    )
    return lastHintMessage
  }, [messages])

  const FeedBack = useMemo(() => {
    const FeedBack = messages.findLast(
      ({ role, content }) => getSystem(role) && getSummary(content)
    )
    return FeedBack
  }, [messages])

  const forcedFinished = useMemo(() => {
    messages.findLast(({ role, content }) => {
      if (role !== 'system') return false
      return content.includes('강제 종료')
    })
  }, [messages])

  useEffect(() => {
    addMessages(id, messages)
  }, [id, messages])

  const onExit = useCallback(async () => {
    await append({
      id: nanoid(),
      content: '상황극 종료',
      role: 'user'
    })
  }, [append])

  return (
    <div
      className="group w-full overflow-y-auto overflow-x-hidden scrollbar-hide pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
      ref={scrollRef}
    >
      <div ref={messagesRef}>
        <ChatList messages={messages} onExit={onExit} />
        <span className="flex w-px h-[120px]"></span>
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
      <ChatHint
        hint={Hint}
        messages={messages}
        setMessages={setMessages}
        append={append}
      />
      {!isDone && FeedBack?.content && (
        <ChatDone
          id={id}
          message={FeedBack?.content}
          isVisible={FeedBack?.content ? true : false}
        />
      )}
      <ChatFeedBack id={id} feedback={FeedBack} isDone={isDone} />
    </div>
  )
}
