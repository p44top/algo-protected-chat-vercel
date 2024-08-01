import { category } from '@/app/(chat)/list/action'
import { createChat, getNewChatId, getStartedChatId } from '@/app/actions'
import { Message, useChat, UseChatHelpers } from 'ai/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { PreviewChat } from './preview-chat'
import { nanoid } from '@/lib/utils'
import { Profile, UserInfo } from '@/lib/types'
import { getContent, getName } from '@/lib/chat-api/parse'

const LoadingAndRequest = ({ append }: Pick<UseChatHelpers, 'append'>) => {
  const first = useRef(false)
  useEffect(() => {
    if (first.current) return
    first.current = true
    const init = async () => {
      await append({
        id: nanoid(),
        role: 'user',
        content: '상황극 시작'
      })
    }
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <></>
}

const Loading = () => {
  return (
    <div className="animate-pulse px-5">
      <div className="flex gap-2 items-center">
        <div className="rounded-full bg-slate-200 size-12"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="flex justify-between">
            <div className="h-2 w-3/5 bg-slate-200 rounded"></div>
            <div className="h-2 w-1/12 bg-slate-200 rounded"></div>
          </div>
          <div className="space-y-3">
            <div className="w-9/12 grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className="w-4/5 h-2 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const PreviewNotReadChat = ({
  id,
  category,
  message
}: {
  id: string
  message: Message
  category: string
}) => {
  const [content, setContent] = useState('')
  const [error, setError] = useState(false)
  const [profile, setProfile] = useState<Profile | undefined>(undefined)

  useEffect(() => {
    // TODO: profile 정보 가져오기
    try {
      const name = getName(message.content) || '김알고'
      const content = getContent(message.content)
      if (!content) throw 'parsing error'
      const profile: Profile = {
        name,
        thumbnail: '/profile/1.png'
      }
      setProfile(profile)
      setContent(content)
      createChat(id, [message], profile, category)
    } catch (e) {
      console.log(e)
      setError(true)
    }
  }, [category, id, message])

  if (profile)
    return (
      <PreviewChat
        id={id}
        info={content}
        title={profile.name}
        badge={1}
        thumbnail={profile.thumbnail}
      />
    )
  if (error) return <></>
  return <></>
}

export const RequestCheckBox = ({
  category,
  user
}: {
  category: category
  user: UserInfo
}) => {
  const [needRequest, setNeedRequest] = useState(false)
  //    Request를 해야하는 상황인지 점검

  useEffect(() => {
    const curActiveChat = getStartedChatId(category)
    if (curActiveChat) return
    setNeedRequest(true)
  }, [])

  if (needRequest) return <RequestBox category={category} user={user} />
  return <></>
}

export const RequestBox = ({
  user,
  category
}: {
  category: category
  user: UserInfo
}) => {
  const id = useMemo(() => getNewChatId(), [])
  const [message, setMessage] = useState<Message>()
  const { messages, append } = useChat({
    id,
    body: {
      id,
      category,
      user
    },
    api: '/api/chat/first',
    onFinish(message) {
      setMessage(message)
    }
  })

  if (messages.length > 0 && message)
    return <PreviewNotReadChat id={id} message={message} category={category} />
  return <LoadingAndRequest append={append} />
}
