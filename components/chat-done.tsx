'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useMemo } from 'react'

export const ChatDone = ({
  id,
  isVisible,
  message
}: {
  id: string
  isVisible: boolean
  message?: string
}) => {
  const isSuccess = useMemo(() => {
    if (!message) return false
    const json = JSON.parse(message)
    return json?.success || false
  }, [message])
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-foreground/80 size-full flex items-center justify-center place-center absolute inset-0">
            <div className="flex justify-center items-center gap-2 rounded-full px-6 py-2 bg-background">
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
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
