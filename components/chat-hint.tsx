'use client'

import { Message } from 'ai'
import { UseChatHelpers } from 'ai/react'
import { Button } from './ui/button'
import { useChatHint } from './chat-hint-hook'

export interface ChatHintProps
  extends Pick<UseChatHelpers, 'setMessages' | 'messages' | 'append'> {
  hint?: Message
}

const HintMessage = ({ content }: { content: string }) => {
  return (
    <p className="w-4/5 text-center text-display-xs text-background font-bold whitespace-break-spaces">
      {content}
    </p>
  )
}

export const ChatHint = (props: ChatHintProps) => {
  const { isShow, lastMessage, safeRender, onClosed } = useChatHint(props)

  if (isShow) {
    return (
      <div
        onClick={onClosed}
        className="overflow-hidden absolute inset-0 z-50  h-screen bg-foreground/80 flex flex-col items-center justify-center gap-6"
      >
        <div className="flex flex-col items-center justify-center gap-3">
          {safeRender('info', content => (
            <HintMessage content={content} />
          ))}
          {safeRender('example', onClick => (
            <Button className="rounded-full" onClick={onClick}>
              예시 답장 보내기
            </Button>
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted hover:bg-transparet"
        >
          닫기
        </Button>
        {lastMessage && (
          <>
            <span className="h-36"></span>
            <div
              className={
                'absolute bottom-[128px] left-4 flex w-full break-words whitespace-break-spaces cursor-default'
              }
            >
              <div className="flex w-4/5">
                <p className="text-base bg-muted px-3 py-2.5 m-0 text-foreground rounded-lg rounded-es-none border-8 border-primary">
                  {lastMessage}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    )
  }
  return <></>
}
