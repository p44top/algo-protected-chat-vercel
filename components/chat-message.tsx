import { Message } from 'ai'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { cn } from '@/lib/utils'
import { MemoizedReactMarkdown } from '@/components/markdown'
import { PropsWithChildren, MouseEvent, useMemo } from 'react'

export interface ChatMessageProps {
  message: Message
  onExit: () => Promise<void>
}

const UserMessage = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={
        'flex w-full break-words whitespace-break-spaces justify-end cursor-default'
      }
    >
      <div className="flex place-self-end w-4/5 justify-end">
        <p className="text-base px-3 py-2.5 m-0 rounded-md rounded-ee-none bg-primary text-primary-foreground">
          {children}
        </p>
      </div>
    </div>
  )
}

const BotMessage = ({ content }: { content: any }) => {
  return (
    <div
      className={
        'flex w-full break-words whitespace-break-spaces cursor-default'
      }
    >
      <div className="flex w-4/5">
        <p
          className="text-base bg-muted px-3 py-2.5 m-0 text-foreground rounded-md rounded-es-none"
          dangerouslySetInnerHTML={{
            __html: content
              .join()
              .replace(
                /<([^>]+)>/,
                '<a data-link-target="1" class="text-sky-600 cursor-pointer" href="#">$1</a>'
              )
          }}
        ></p>
      </div>
    </div>
  )
}

export function ChatMessage({ message, onExit, ...props }: ChatMessageProps) {
  return (
    <div className={cn('group relative')} {...props}>
      <MemoizedReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        components={{
          p({ children }) {
            const onClick = (e: MouseEvent<HTMLDivElement>) => {
              if (e.target) {
                const target = e.target as HTMLElement
                if (target.dataset?.linkTarget) {
                  onExit()
                }
              }
            }
            return (
              <div onClick={onClick}>
                {message.role === 'user' ? (
                  <UserMessage>{children}</UserMessage>
                ) : (
                  <BotMessage content={children as any} />
                )}
              </div>
            )
          }
        }}
      >
        {message.content}
      </MemoizedReactMarkdown>
    </div>
  )
}
