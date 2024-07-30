import { redirect } from 'next/navigation'

import { type Chat } from '@/lib/types'
import { category } from './(chat)/list/action'

export function getChats() {
    return [] as Chat[]
}

export function getCategory(id: string) {
    return '0'
}

export function getChatBotProfile(id: string) {
    return {
        name: '강남 경찰청',
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPzUL4nAn02es6KW_q-Js7F-cpy5Nf-E8LSw&s',
    }
}

export function getChatsByCategory(category: category) {
    return [] as Chat[]
}

export function getChat(id: string): Chat {
    return {
        id: 'test',
        createdAt: new Date('2024-02-11'),
        path: '',
        title: 'test',
        messages: [
            {
                id: '2',
                role: 'system',
                content: JSON.stringify({
                    Message: '안녕하세요. 알고범죄님 맞으신가요?',
                }),
            },
            {
                id: '7',
                role: 'user',
                content: '네. 무슨 일이세요?',
            },
            {
                id: '12',
                role: 'system',
                content: JSON.stringify({
                    Message:
                        '안녕하세요. 저는 경찰서 사이버범죄 수사팀의 김형사입니다. 최근에 범죄 조직이 당신의 개인 정보를 도용하여 불법적인 활동에 연루된 것으로 확인되었습니다. 이 문제를 신속하게 해결하기 위해 몇 가지 확인 절차가 필요합니다. 잠시 시간을 내주실 수 있나요?',
                }),
            },
            {
                id: '17',
                role: 'user',
                content: '제가 수업중이라서 이따 연락드려도 될까요?',
            },
            {
                id: '22',
                role: 'system',
                content: JSON.stringify({
                    Message: '아버님께서 오늘 별세하였기에 삼가 알려드립니다.\n 장례식장 위치: https://t.lyhFens',
                }),
            },
        ],
    }
}

export function removeChat({ id, path }: { id: string; path: string }) {
    console.log('remove chat')
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
