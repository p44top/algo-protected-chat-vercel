'use client'

import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { motion } from 'framer-motion'
import { Button } from './button'

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
}

const contentVariants = {
    hidden: { opacity: 0, scale: 0.96, translateY: '80%' },
    visible: { opacity: 1, scale: 1, translateY: '20%' },
    scrolled: { opacity: 1, scale: 1, translateY: '0%' },
}

export const BottomSheet = ({ children }: PropsWithChildren) => {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        console.log(contentRef.current)
    }, [open])

    return (
        <Dialog.Root open={open}>
            <Dialog.Trigger asChild>
                <Button onClick={() => setOpen(true)}>test</Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <motion.div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-foreground/80"
                    variants={overlayVariants}
                    initial="hidden"
                    animate={open ? 'visible' : 'hidden'}
                    exit="hidden"
                />
                <motion.div
                    className="fixed top-[20%] size-full left-0 overflow-x-hidden rounded-t-md bg-background p-4 focus:outline-none"
                    variants={contentVariants}
                    initial="hidden"
                    animate={open ? (scrolled ? 'scrolled' : 'visible') : 'hidden'}
                    exit="hidden"
                >
                    <div ref={contentRef} className="h-4/5 overflow-y-auto">
                        {children}
                    </div>
                </motion.div>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
