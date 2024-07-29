'use client'

import React, { useRef, useEffect } from 'react'
import Textarea from 'react-textarea-autosize'
import { Button } from '@/components/ui/button'
import { IconSend, IconHiint } from '@/components/ui/icons'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { useRouter } from 'next/navigation'
import type { UseChatHelpers } from 'ai/react'

export function PromptForm({
  isLoading,
  input,
  setInput,
  onSubmit
}: Pick<UseChatHelpers, 'input' | 'setInput' | 'isLoading'> & {
  onSubmit: (value: string) => Promise<void>
}) {
  const router = useRouter()
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form
      ref={formRef}
      onSubmit={async (e: any) => {
        e.preventDefault()

        // Blur focus on mobile
        if (window.innerWidth < 600) {
          e.target['message']?.blur()
        }

        const value = input.trim()
        setInput('')
        // 테스트 하지 마세요. API 연결되어 있습니다.
        // await onSubmit(value);
      }}
    >
      <div className="relative flex justify-center items-center gap-2 max-h-60 w-full grow overflow-hidden bg-background">
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-full place-center bg-background hover:bg-muted/90 p-2"
          onClick={() => {
            console.log('show me hint')
          }}
        >
          <IconHiint />
          <span className="sr-only">Show Hint</span>
        </Button>
        <div className='flex justify-center items-center rounded-full bg-muted px-4 h-12 flex-1'>
          <Textarea
            ref={inputRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            placeholder="메시지를 입력하세요."
            className="size-full bg-transparent resize-none focus-within:outline-none text-sm text-muted-foreground"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            name="message"
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <Button className="size-8 bg-transparent hover:bg-transparent p-0 cursor-pointer"
            type="submit" size="icon" variant='ghost' disabled={isLoading || input.trim() === ''}>
            <IconSend className={isLoading || input.trim() === '' ? '' : 'text-primary'} />
            <span className="sr-only">Send message</span>
          </Button>
        </div>

      </div>
    </form>
  )
}
