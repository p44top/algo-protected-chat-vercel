import { useControlHint } from '@/app/(chat)/[id]/action'
import { Message } from 'ai'
import { UseChatHelpers } from 'ai/react'
import { useMemo, MouseEvent } from 'react'
import { Button } from './ui/button'
import { nanoid } from '@/lib/utils'
import { useChatHint } from './chat-hint-hook'

export interface ChatHintProps extends Pick<UseChatHelpers, 'setMessages' | 'messages' | 'append'> {
    hint?: Message
}

const HintMessage = ({ content }: { content: string }) => {
    return (
        <p className="w-4/5 text-center text-display-xs text-background font-bold whitespace-break-spaces">{content}</p>
    )
}

export const ChatHint = (props: ChatHintProps) => {
    const { isShow, safeRender, onClosed } = useChatHint(props)

    if (isShow) {
        return (
            <div
                onClick={onClosed}
                className="absolute inset-0 z-50 w-screen h-screen bg-foreground/80 flex flex-col items-center justify-center gap-6"
            >
                <div className="flex flex-col items-center justify-center gap-3">
                    {safeRender('info', (content) => (
                        <HintMessage content={content} />
                    ))}
                    {safeRender('example', (onClick) => (
                        <Button className="rounded-full" onClick={onClick}>
                            예시 답장 보내기
                        </Button>
                    ))}
                </div>
                <Button variant="ghost" size="sm" className="text-muted hover:bg-transparet">
                    닫기
                </Button>
            </div>
        )
    }
    return <></>
}
