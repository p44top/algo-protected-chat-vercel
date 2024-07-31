import { Message } from 'ai'
import { Button } from './ui/button'
import { useChatFeedback } from './chat-feedback-hook'

export interface ChatFeedbackProps {
    hint?: Message
}

const HintMessage = ({ content }: { content: string }) => {
    return (
        <p className="w-4/5 text-center text-display-xs text-background font-bold whitespace-break-spaces">{content}</p>
    )
}

export const ChatHint = (props: ChatFeedbackProps) => {
    const { isShow, safeRender, onClosed } = useChatFeedback(props)

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
                </div>
                <Button variant="ghost" size="sm" className="text-muted hover:bg-transparet">
                    닫기
                </Button>
            </div>
        )
    }
    return <></>
}
