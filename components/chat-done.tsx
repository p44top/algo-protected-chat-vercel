'use client'

import { useControlFeedBack, useDone } from '@/app/(chat)/[id]/action'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FadeInOutWrapper } from './ui/animation/fadeInOut'
import { getSuccess } from '@/lib/chat-api/parse'
import { finishedChat } from '@/app/actions'

export const ChatDone = ({
  id,
  isVisible,
  message
}: {
  id: string
  isVisible: boolean
  message?: string
}) => {
  const { open } = useControlFeedBack()
  const { done } = useDone(id)
  const [show, setShow] = useState(isVisible)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  // const isSuccess = useMemo(() => {
  //   if (!message) return false
  //   const json = getSuccess(message)
  //   return json || false
  // }, [message])

  useEffect(() => {
    setShow(isVisible)
  }, [isVisible])

  useEffect(() => {
    if (show) {
      // 2초 후에 본안을 닫고 피드백 팝업 열기
      timer.current = setTimeout(() => {
        setShow(false)
        finishedChat(id)
        open()
        done()
      }, 0)
    }

    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [show, open])

  return (
    <FadeInOutWrapper isVisible={show}>
      <div className="bg-foreground/80 size-full flex items-center justify-center place-center absolute inset-0">
        {/* <div className="flex justify-center items-center gap-2 rounded-full px-6 py-2 bg-background">
          {isSuccess ? (
            <>
              <span className="bg-primary size-8 flex justify-center items-center text-primary-foreground rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="13"
                  viewBox="0 0 17 13"
                  fill="none"
                >
                  <path
                    d="M2.25098 4.76654L7.5035 10.8332L15.5843 1.49988"
                    stroke="currentColor"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h4 className="display-lg font-bold">잘했어요!</h4>
            </>
          ) : (
            <>
              <span className="bg-destructive size-8 flex justify-center items-center text-destructive-foreground rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="15"
                  viewBox="0 0 16 15"
                  fill="none"
                >
                  <path
                    d="M2.00003 1.5L14 13.5M14 1.5L2.00003 13.5"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h4 className="display-lg font-bold">위험해요!</h4>
            </>
          )}
        </div> */}
      </div>
    </FadeInOutWrapper>
  )
}
