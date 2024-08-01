import { AnimatePresence, motion } from 'framer-motion'
import { PropsWithChildren } from 'react'

export const FadeInOutWrapper = ({
  isVisible,
  children
}: PropsWithChildren & { isVisible: boolean }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            width: 'inherit',
            height: 'inherit'
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
