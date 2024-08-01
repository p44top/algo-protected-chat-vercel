'use client'

import {
  useCategory,
  IPreviewChatList,
  getPreviewChatList,
  category
} from '@/app/(chat)/list/action'
import { PreviewChat } from './preview-chat'
import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/useAuth'
import { RequestCheckBox } from './preview-chat-request'
import { UserInfo } from '@/lib/types'
import { getContent } from '@/lib/chat-api/parse'

const PreviewList = ({ list }: { list: IPreviewChatList[] }) => {
  return list.map(val => (
    <PreviewChat
      key={val.id}
      id={val.id}
      info={getContent(val.lastMessage)}
      title={val.title}
      badge={val.notReadCount}
      thumbnail={val.thumbnail}
    />
  ))
}

const Empty = ({ category, user }: { category: category; user: UserInfo }) => {
  if (category === '0')
    return (
      <div className="flex flex-col-reverse gap-2">
        <RequestCheckBox category={'1'} user={user} />
        <RequestCheckBox category={'2'} user={user} />
        <RequestCheckBox category={'3'} user={user} />
        <RequestCheckBox category={'4'} user={user} />
      </div>
    )
  return <RequestCheckBox category={category} user={user} />
}

export const PreviewChatList = () => {
  const [list, setList] = useState<IPreviewChatList[] | undefined>(undefined)
  const category = useCategory()

  const userInfo = useAuth()
  useEffect(() => {
    const previewList = getPreviewChatList(category)
    setList(previewList)
  }, [category])

  if (!userInfo) return <></>
  return (
    <>
      <Empty category={category} user={userInfo} />
      <PreviewList key={category} list={list || []} />
    </>
  )
}
