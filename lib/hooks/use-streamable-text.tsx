import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TypoAnimation = ({ fullText }: { fullText: string }) => {
  const [text, setText] = useState('')

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText(prev => prev + fullText[currentIndex])
        currentIndex += 1
      } else {
        clearInterval(interval)
      }
    }, 100) // Adjust the speed of typing here

    return () => clearInterval(interval)
  }, [fullText])

  return (
    <div style={{ fontSize: '24px', fontFamily: 'monospace' }}>
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
    </div>
  )
}

export default TypoAnimation
