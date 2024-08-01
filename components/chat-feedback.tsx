'use client'

import { Message } from 'ai'
import { ChatFeedBackContent } from './chat-feedback-content'
import { useControlFeedBack, useDone } from '@/app/(chat)/[id]/action'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { UIEventHandler, useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FadeInOutWrapper } from './ui/animation/fadeInOut'

export interface ChatFeedbackProps {
  id: string
  isDone: boolean
  feedback?: Message
}

const ChatContent = ({ content }: { content?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const prevScrollY = useRef(0)
  const [isScrolled, setIsScrolled] = useState(false)

  const route = useRouter()
  const onClick = () => {
    route.push('/list')
  }

  const handleScroll: UIEventHandler<HTMLDivElement> = useCallback(e => {
    const target = e.target as HTMLElement
    const currentScrollY = target.scrollTop
    const scrollHeight = target.scrollHeight

    if (currentScrollY > 20) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }

    const scrollDirection = currentScrollY > prevScrollY.current ? 'down' : 'up'
    prevScrollY.current = currentScrollY
  }, [])

  return (
    <motion.div
      ref={ref}
      onScroll={handleScroll}
      initial={{ height: '80vh', borderRadius: '0.5rem' }}
      animate={{
        height: isScrolled ? '100vh' : '80vh',
        borderRadius: isScrolled ? '0rem' : '0.5rem'
      }}
      transition={{ duration: 0.5 }}
      className="bg-background w-full overflow-y-auto scrollbar-hide p-2"
    >
      {!content ? (
        <div className="flex justify-center items-center h-full">
          <svg
            className="animate-spin size-8 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : (
        <ChatFeedBackContent message={content} />
      )}
      <div className="fixed bottom-0 w-full flex justify-center items-center bg-background border-t border-gray-400 p-4">
        <Button size="cta" onClick={onClick}>
          확인했어요(홈으로)
        </Button>
      </div>
      <div className="w-full p-4 opacity-0 pointer-events-none">
        <Button size="cta">.</Button>
      </div>
    </motion.div>
  )
}

export const ChatFeedBack = ({ id, isDone, feedback }: ChatFeedbackProps) => {
  const { open, close, isOpen } = useControlFeedBack()
  const {} = useDone(id)

  // TODO: isDone이 false인데 feedback이 있으면 첫 대화 종료
  //

  return (
    <>
      <FadeInOutWrapper isVisible={isOpen}>
        <div
          className="absolute inset-0 z-50 w-screen h-full bg-foreground/80"
          onClick={close}
        >
          <div className="absolute bottom-0 w-full">
            <ChatContent content={feedback?.content} />
          </div>
        </div>
      </FadeInOutWrapper>
    </>
  )
}
