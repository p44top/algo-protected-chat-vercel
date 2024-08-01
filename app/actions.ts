import { Profile, UserInfo, type Chat } from '@/lib/types'
import { category } from './(chat)/list/action'

const CATEGORY_CHAT_ID_STORE = 'ab_c_list'
const CHAT_STORE = 'ab_c_dir'
const CHAT_PROFILE_STORE = 'ab_p_list'
const NEXT_STAGE_STORE = 'ab_s_dir'

const defaultStage: Record<string, number> = {
  '1': 0,
  '2': 0,
  '3': 0,
  '4': 0
}
const getNextStageDirStore = () => {
  const store = localStorage.getItem(NEXT_STAGE_STORE) || '{}'
  if (store === '{}') {
    localStorage.setItem(NEXT_STAGE_STORE, JSON.stringify(defaultStage))
    return defaultStage
  }
  const storeJson = JSON.parse(store) as Record<string, number>
  return storeJson
}

const setNextStageDirStore = (categoryId: string) => {
  const prevStore = getNextStageDirStore()
  const nextStage = (prevStore[categoryId] || 0) + 1
  const newStore = {
    ...prevStore,
    [categoryId]: nextStage
  }
  const storeStr = JSON.stringify(newStore)
  localStorage.setItem(CATEGORY_CHAT_ID_STORE, storeStr)
  return nextStage
}

const getCategoryDirStore = () => {
  const store = localStorage.getItem(CATEGORY_CHAT_ID_STORE) || '{}'
  const storeJson = JSON.parse(store) as Record<string, string[]>
  return storeJson
}

const setCategoryDirStore = (categoryId: string, chatId: string) => {
  const prevStore = getCategoryDirStore()
  const prevList = prevStore[categoryId] || []
  const newStore = {
    ...prevStore,
    [categoryId]: prevList.includes(chatId) ? prevList : [...prevList, chatId]
  }
  const storeStr = JSON.stringify(newStore)
  localStorage.setItem(CATEGORY_CHAT_ID_STORE, storeStr)
}

const getProfileDirStore = () => {
  const store = localStorage.getItem(CHAT_PROFILE_STORE) || '{}'
  const storeJson = JSON.parse(store) as Record<string, Profile>
  return storeJson
}

const setProfileDirStore = (chatId: string, profile: Profile) => {
  const prevStore = getProfileDirStore()
  const newStore = {
    ...prevStore,
    [chatId]: profile
  }
  const storeStr = JSON.stringify(newStore)
  localStorage.setItem(CHAT_PROFILE_STORE, storeStr)
}

const getChatsStore = (id: string) => {
  const store = localStorage.getItem(`${CHAT_STORE}-${id}`) || '{}'
  const storeJson = JSON.parse(store) as Chat
  return storeJson
}

const setChatsDirStore = (chat: Chat) => {
  const storeStr = JSON.stringify(chat)
  localStorage.setItem(`${CHAT_STORE}-${chat.id}`, storeStr)
}

// TODO: 유저 정보 사용
const getUserInfo = () => {
  return {} as UserInfo
}

// TODO: 유저 정보 저장하기
const setUserInfo = (info: UserInfo) => {}

export function getCategory(id: string) {
  const storeJson = getCategoryDirStore()
  const allList = Object.entries(storeJson).flatMap(([category, idList]) => {
    return idList.map(id => [category, id])
  })
  const target = allList.find(([category, chatId]) => chatId === id)
  if (!target) return -1
  return target[0]
}

export function getChatBotProfile(id: string) {
  const storeJson = getProfileDirStore()
  const target = storeJson[id]
  if (target) return target
  return {
    name: '김철수',
    thumbnail: ''
  }
}

export function getChatsByCategory(category: category) {
  const storeJson = getCategoryDirStore()
  const idList = storeJson[category] || []
  return idList.map(id => getChat(id))
}

export function getChat(id: string): Chat {
  return getChatsStore(id)
}
