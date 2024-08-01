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

  useEffect(() => {
    if (isVisible) {
      finishedChat(id)
      open()
      done()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible])

  return <></>
}
