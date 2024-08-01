import { useMemo, MouseEvent } from 'react'
import { ChatHintProps } from './chat-hint'
import { useControlHint } from '@/app/(chat)/[id]/action'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import { nanoid } from '@/lib/utils'
import {
  getContent,
  getHintExample,
  getHintInfo,
  getMessage,
  getSystem
} from '@/lib/chat-api/parse'

export const useChatHint = ({
  hint,
  messages,
  setMessages,
  append
}: ChatHintProps) => {
  const paresHintContent = useMemo(() => {
    if (hint) {
      return {
        info: getHintInfo(hint.content) || '',
        example: getHintExample(hint.content) || ''
      }
    }
    return {
      info: '',
      example: ''
    }
  }, [hint])
  const lastMessage = useMemo(() => {
    const lastSystemMessage = messages.findLast(
      val => getSystem(val.role) && !getHintInfo(val.content)
    )
    return lastSystemMessage
      ? getContent(lastSystemMessage.content) ||
          getMessage(lastSystemMessage.content)
      : ''
  }, [messages])
  const { isOpen, close } = useControlHint()

  const onClear = () => {
    if (hint) {
      const filteredMessages = messages.filter((val, idx) => {
        if (val.content === 'Hint') return false
        return val.id !== hint?.id
      })
      setMessages(filteredMessages)
    }
  }

  const onClosed = () => {
    onClear()
    close()
  }

  const onRequest = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onClear()
    await append({
      id: nanoid(),
      content: paresHintContent.example,
      role: 'user'
    })
  }

  const safeRender = (
    type: 'info' | 'example',
    callback: (props: any) => ReactElement
  ) => {
    if (type === 'info') {
      return paresHintContent.info && callback(paresHintContent.info)
    }
    if (type === 'example') {
      return paresHintContent.example && callback(onRequest)
    }
  }

  return {
    isShow: isOpen && hint,
    lastMessage,
    safeRender,
    onClosed
  }
}
