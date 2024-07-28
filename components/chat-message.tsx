import { Message } from 'ai'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { cn } from '@/lib/utils'
import { MemoizedReactMarkdown } from '@/components/markdown'
import { PropsWithChildren } from 'react'

export interface ChatMessageProps {
  message: Message
}

const UserMessage = ({ children }: PropsWithChildren) => {
  return <div className={"flex w-full break-words whitespace-break-spaces justify-end cursor-default"}>
    <div className='flex place-self-end w-4/5 justify-end'>
      <p className='text-base px-3 py-2.5 m-0 rounded-md rounded-ee-none bg-primary text-primary-foreground' >{children}</p>
    </div>
  </div>
}

const BotMessage = ({ children }: PropsWithChildren) => {
  return <div className={"flex w-full break-words whitespace-break-spaces cursor-default"}>
    <div className='flex w-4/5'>
      <p className='text-base bg-muted px-3 py-2.5 m-0 text-foreground rounded-md rounded-es-none' >{children}</p>
    </div>
  </div>
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  return (
    <div
      className={cn('group relative')}
      {...props}
    >
      <MemoizedReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        components={{
          p({ children }) {
            return message.role === 'user' ? <UserMessage>{children}</UserMessage> : <BotMessage>{children}</BotMessage>
          },
          a({ children }) {
            return <a className='text-sky-600 cursor-pointer'>{children}</a>
          }
        }}
      >
        {message.content}
      </MemoizedReactMarkdown>
    </div>
  )
}
