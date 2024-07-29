
import { redirect } from 'next/navigation'

import { type Chat } from '@/lib/types'
import { category } from './(chat)/list/action';


export function getChats() {
  return [] as Chat[]
}

export function getChatsByCategory(category: category) {
  return [] as Chat[]
}

export function getChat(id: string) {
  return {} as Chat;
}

export function removeChat({ id, path }: { id: string; path: string }) {
  console.log('remove chat');
}

export function clearChats() {
  console.log('clear all chats')
}

export function saveChat(chat: Chat) {
  console.log('save chat')
}

export function refreshHistory(path: string) {
  redirect(path)
}

export function getMissingKeys() {
  const keysRequired = ['OPENAI_API_KEY']
  return keysRequired
    .map(key => (process.env[key] ? '' : key))
    .filter(key => key !== '')
}
