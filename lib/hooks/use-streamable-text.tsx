import React, { useState, useEffect, ReactNode } from 'react'
import { motion } from 'framer-motion'

const TypoAnimation = ({ fullText }: { fullText: string | ReactNode[] }) => {
  const [text, setText] = useState('')

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText(prev => prev + fullText[currentIndex])
        currentIndex += fullText.length / 5
      } else {
        clearInterval(interval)
      }
    }, 50) // Adjust the speed of typing here

    return () => clearInterval(interval)
  }, [fullText])

  return (
    <>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: index * 0.1 }}
        >
          {char}
        </motion.span>
      ))}
    </>
  )
}

export default TypoAnimation
