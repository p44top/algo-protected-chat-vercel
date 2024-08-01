import { getParseFeedback } from '@/lib/chat-api/parse'
import { useMemo } from 'react'

interface ChatFeedBackContentProps {
  message?: string
}

export const List = ({
  label,
  message
}: {
  label: string
  message?: string
}) => {
  if (!message) return <></>
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-display-sm font-bold">{label}</h3>
      <p className="text-base text-muted-foreground">{message}</p>
    </div>
  )
}

export const ChatFeedBackContent = ({ message }: ChatFeedBackContentProps) => {
  const parsedMessage = useMemo(() => {
    if (!message) return
    const json = getParseFeedback(message)
    return json
  }, [message])

  if (!message) return <></>
  if (!parsedMessage) return <div>에러가 발생했어요.</div>
  return (
    <div className="flex flex-col gap-12 p-2">
      <div className="flex flex-col items-center justify-center gap-3 rounded-md w-full p-4 bg-muted/50 border">
        <h2 className="text-md text-primary font-bold">AI 피드백</h2>
        <p className="text-lg text-balance break-all text-center font-bold whitespace-break-spaces">
          {parsedMessage.Point}
        </p>
      </div>
      <List label="핵심 포인트" message={parsedMessage.summary} />
      <List label="칭찬할 점" message={parsedMessage.good} />
      <List label="위험한 점" message={parsedMessage.bad} />
      <List label="개선 방안" message={parsedMessage.extra} />
    </div>
  )
}
