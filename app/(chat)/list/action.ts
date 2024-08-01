import { useCallback } from 'react'
import { create, useStore } from 'zustand'
import { Chat } from '@/lib/types'
import {
  getChatBotProfile,
  getChatsByCategory,
  isReadChatID
} from '@/app/actions'

export const CATEGORY_LIST = [
  { value: '0', label: '전체' },
  { value: '1', label: '가족 / 지인' },
  { value: '2', label: '은행 / 카드사' },
  { value: '3', label: '범죄 연루' },
  { value: '4', label: '기타' }
] as const

export type category = (typeof CATEGORY_LIST)[number]['value']
export interface IPreviewChatList {
  id: string
  title: string
  lastMessage: string
  thumbnail?: string
  notReadCount: number
}
export const defaultSelectedValue = '0' as const

interface CategoryStoreType {
  category: category
  changeCategory: (category: category) => void
}
/** Store */
const CategoryStore = create<CategoryStoreType>(set => ({
  category: defaultSelectedValue,
  changeCategory: (category: category) => {
    set(prev => ({
      ...prev,
      category
    }))
  }
}))

export const useCategoryListen = () => {
  const update = useStore(CategoryStore, state => state.changeCategory)

  const onChange = useCallback(
    (name: string, category: string) => {
      update(category as category)
    },
    [update]
  )

  return onChange
}

export const useCategory = () => {
  const category = useStore(CategoryStore, state => state.category)
  return category
}

const getExtraPreviewChatList = (Chat: Chat): IPreviewChatList => {
  const { name, thumbnail } = getChatBotProfile(Chat.id)
  return {
    id: Chat.id,
    title: name,
    thumbnail,
    lastMessage: Chat.messages[Chat.messages.length - 1].content as string,
    notReadCount: isReadChatID(Chat.id) ? 0 : 1
  }
}
export const getPreviewChatList = (category: category): IPreviewChatList[] => {
  if (category === '0') {
    // all
    const getAllList = (['1', '2', '3', '4'] as category[]).flatMap(val =>
      getPreviewChatList(val)
    )
    return getAllList
  }
  const chats = getChatsByCategory(category)
  const list = chats.map(chat => getExtraPreviewChatList(chat))
  return list
}
