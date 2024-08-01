import { useEffect } from 'react'
import { create, useStore } from 'zustand'

interface ChatStoreType {
    isFinished: Record<string, boolean>
    isFeedbackOpen: boolean
    isHintOpen: boolean
    reset: () => void
    done: (id: string) => void
    controlFeedbackOpen: (val: boolean) => void
    controlHintOpen: (val: boolean) => void
}

/** Store */
const ChatStore = create<ChatStoreType>((set) => ({
    isFinished: {},
    isFeedbackOpen: false,
    isHintOpen: false,
    reset: () => {
        set((prev) => ({
            ...prev,
            isFeedbackOpen: false,
            isHintOpen: false,
        }))
    },
    done: (id: string) => {
        set((prev) => ({
            ...prev,
            isFinished: {
                ...prev.isFinished,
                [id]: true,
            },
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
    }, [reset])
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

export const useDone = (id: string) => {
    const doneDir = useStore(ChatStore, (state) => state.isFinished)
    const done = useStore(ChatStore, (state) => state.done)

    return { isDone: doneDir[id], done: () => done(id) }
}
