import { useMemo, MouseEvent } from 'react'
import { useControlHint } from '@/app/(chat)/[id]/action'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import { ChatFeedbackProps } from './chat-feedback'

export const useChatFeedback = ({ hint }: ChatFeedbackProps) => {
    const paresHintContent = useMemo(() => {
        if (hint) {
            const json = JSON.parse(hint.content)
            return {
                info: json?.info || '',
                example: json?.example || '',
            }
        }
        return {
            info: '',
            example: '',
        }
    }, [hint])
    const { isOpen, close } = useControlHint()

    const onClear = () => {}

    const onClosed = () => {
        onClear()
        close()
    }

    const onRequest = async (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        onClear()
        // await append({
        //     id: nanoid(),
        //     content: paresHintContent.example,
        //     role: 'user',
        // })
    }

    const safeRender = (type: 'info' | 'example', callback: (props: any) => ReactElement) => {
        if (type === 'info') {
            return paresHintContent.info && callback(paresHintContent.info)
        }
        if (type === 'example') {
            return paresHintContent.example && callback(onRequest)
        }
    }

    return {
        isShow: isOpen && hint,
        safeRender,
        onClosed,
    }
}
