import * as React from 'react'

import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { UseChatHelpers } from 'ai/react/dist'

export interface ChatPanelProps extends Pick<UseChatHelpers, 'append' | "isLoading" | 'input' | 'setInput'> {
  id?: string
  title?: string
  isAtBottom: boolean
  scrollToBottom: () => void;
}

export function ChatPanel({
  id,
  input,
  setInput,
  isLoading,
  isAtBottom,
  scrollToBottom,
  append
}: ChatPanelProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 w-full overflow-hidden flex flex-col items-end gap-2 mx-auto max-w-lg bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
      <div className="w-full border-t bg-background shadow-md rounded-t-xl px-4 py-2">
          <PromptForm onSubmit={async (value) => {
            await append({
              id,
              content: value,
              role: 'user'
            })
          }}
            input={input}
            setInput={setInput}
            isLoading={isLoading} />
        </div>
    </div>
  )
}
