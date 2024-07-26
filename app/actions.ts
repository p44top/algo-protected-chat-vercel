
import { redirect } from 'next/navigation'

import { type Chat } from '@/lib/types'


export async function getChats() {
  return [] as Chat[]
}

export async function getChat(id: string) {
  return {} as Chat;
}

export async function removeChat({ id, path }: { id: string; path: string }) {
  console.log('remove chat');
}

export async function clearChats() {
  console.log('clear all chats')
}

export async function saveChat(chat: Chat) {
  console.log('save chat')
}

export async function refreshHistory(path: string) {
  redirect(path)
}

export async function getMissingKeys() {
  const keysRequired = ['OPENAI_API_KEY']
  return keysRequired
    .map(key => (process.env[key] ? '' : key))
    .filter(key => key !== '')
}
