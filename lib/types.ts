import type { Message } from 'ai/react'

export type { Message }

export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  path: string
  messages: Message[]
}

export interface Profile {
  name: string
  thumbnail?: string
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>

export interface UserInfo {
  name: string
  age: number
  gender: 'female' | 'male'
}

export interface AuthResult {
  type: string
  message: string
}

export interface User extends Record<string, any> {
  id: string
  email: string
  password: string
  salt: string
}
