import { useEffect } from 'react'
import { create, useStore } from 'zustand'

interface ChatStoreType {
    isFeedbackOpen: boolean
    isHintOpen: boolean
    reset: () => void
    controlFeedbackOpen: (val: boolean) => void
    controlHintOpen: (val: boolean) => void
}

/** Store */
const ChatStore = create<ChatStoreType>((set) => ({
    isFeedbackOpen: false,
    isHintOpen: false,
    reset: () => {
        set((prev) => ({
            ...prev,
            isFeedbackOpen: false,
            isHintOpen: false,
        }))
    },
    controlFeedbackOpen: (isFeedbackOpen) => {
        set((prev) => ({
            ...prev,
            isFeedbackOpen,
        }))
    },
    controlHintOpen: (isHintOpen) => {
        set((prev) => ({
            ...prev,
            isHintOpen,
        }))
    },
}))

export const useInsert = () => {
    const reset = useStore(ChatStore, (state) => state.reset)
    useEffect(() => {
        reset()
    }, [])
}

export const useControlFeedBack = () => {
    const isOpen = useStore(ChatStore, (state) => state.isFeedbackOpen)
    const control = useStore(ChatStore, (state) => state.controlFeedbackOpen)

    const open = () => {
        control(true)
    }

    const close = () => {
        control(false)
    }

    return { isOpen, open, close }
}

export const useControlHint = () => {
    const isOpen = useStore(ChatStore, (state) => state.isHintOpen)
    const control = useStore(ChatStore, (state) => state.controlHintOpen)

    const open = () => {
        control(true)
    }

    const close = () => {
        control(false)
    }

    return { isOpen, open, close }
}
