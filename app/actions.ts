import { Message, Profile, UserInfo, type Chat } from '@/lib/types'
import { category } from './(chat)/list/action'

const CATEGORY_CHAT_ID_STORE = 'ab_c_list'
const CHAT_STORE = 'ab_c_dir'
const CHAT_PROFILE_STORE = 'ab_p'
const CURRENT_STARTED_CHAT = 'ab_sc_dir'
const USER_INFO_STORE = 'user_info'
const CHAT_ID_STORE = 'c_id'
const READED_CHAT_ID_STORE = 'ab_read'

const getStartedDirStore = () => {
  const store = localStorage.getItem(CURRENT_STARTED_CHAT) || '{}'
  const storeJson = JSON.parse(store) as Record<string, string>
  return storeJson
}

const setStartedDirStore = (categoryId: string, chatId: string) => {
  const prevStore = getStartedDirStore()
  const newStore = {
    ...prevStore,
    [categoryId]: chatId
  }
  const storeStr = JSON.stringify(newStore)
  localStorage.setItem(CURRENT_STARTED_CHAT, storeStr)
}

const deleteStartedDirStore = (categoryId: string) => {
  const prevStore = getStartedDirStore()
  const newStore = {
    ...prevStore,
    [categoryId]: undefined
  }
  const storeStr = JSON.stringify(newStore)
  localStorage.setItem(CURRENT_STARTED_CHAT, storeStr)
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

const getReadDirStore = () => {
  const store = localStorage.getItem(READED_CHAT_ID_STORE) || '[]'
  const storeJson = JSON.parse(store) as string[]
  return storeJson
}

const setReadDirStore = (chatId: string) => {
  const prevStore = getReadDirStore()
  const newStore = prevStore.includes(chatId)
    ? prevStore
    : [...prevStore, chatId]
  const storeStr = JSON.stringify(newStore)
  localStorage.setItem(READED_CHAT_ID_STORE, storeStr)
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

const getUserStore = () => {
  const store = localStorage.getItem(USER_INFO_STORE) || '{}'
  const storeJson = JSON.parse(store) as UserInfo
  return storeJson
}

const setUserStore = (userInfo: UserInfo) => {
  const storeStr = JSON.stringify(userInfo)
  localStorage.setItem(USER_INFO_STORE, storeStr)
}

const getNextChatId = () => {
  const store = localStorage.getItem(CHAT_ID_STORE) || '0'
  localStorage.setItem(CHAT_ID_STORE, +store + 1 + '')
  return store as string
}

const getChatsStore = (id: string) => {
  const store = localStorage.getItem(`${CHAT_STORE}-${id}`) || '{}'
  const storeJson = JSON.parse(store) as Chat
  return storeJson
}

const setChatsStore = (id: string, messages: Message[]) => {
  const str = JSON.stringify({
    id,
    messages
  })
  localStorage.setItem(`${CHAT_STORE}-${id}`, str)
}

// TODO: 유저 정보 사용
export const getUserInfo = () => {
  const user: UserInfo = getUserStore()
  return user
}

// TODO: 유저 정보 저장하기
export const setUserInfo = (info: UserInfo) => {
  setUserStore(info)
}

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

export const getNewChatId = () => {
  return getNextChatId()
}

export const createChat = (
  id: string,
  messages: Message[],
  profile: Profile,
  category: string
) => {
  setChatsStore(id, messages)
  setProfileDirStore(id, profile)
  setCategoryDirStore(category, id)
  setStartedDirStore(category, id)
}

export const getStartedChatId = (category: string) => {
  const storeDir = getStartedDirStore()
  return storeDir?.[category]
}

export const addMessages = (chatId: string, messages: Message[]) => {
  setChatsStore(chatId, messages)
}

export const finishedChat = (chatId: string) => {
  const category = getCategory(chatId)
  if (category !== -1) {
    deleteStartedDirStore(category)
    readChatID(chatId)
  }
}

export const readChatID = (chatId: string) => {
  setReadDirStore(chatId)
}

export const isReadChatID = (chatId: string) => {
  const readIdList = getReadDirStore()
  console.log(readIdList, chatId)
  return readIdList.includes(chatId)
}
