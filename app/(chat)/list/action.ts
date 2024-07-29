import { useCallback } from "react";
import { create, useStore } from "zustand";
import { Chat } from "@/lib/types";
import { getChats, getChatsByCategory } from "@/app/actions";


export const CATEGORY_LIST = [
    { value: '0', label: '전체' },
    { value: '1', label: '가족 / 지인' },
    { value: '2', label: '은행 / 카드사' },
    { value: '3', label: '범죄 연루' },
    { value: '4', label: '기타' },
] as const;

export type category = (typeof CATEGORY_LIST)[number]['value'];
export interface IPreviewChatList {
    id: string;
    title: string;
    lastMessage: string;
    thumbnail?: string;
    notReadCount: number;
}
export const defaultSelectedValue = '0' as const;

interface CategoryStoreType {
    category: category;
    changeCategory: (category: category) => void;
}
/** Store */
const CategoryStore = create<CategoryStoreType>((set) => ({
    category: defaultSelectedValue,
    changeCategory: (category: category) => {
        set((prev) => ({
            ...prev,
            category
        }))
    },
}))

export const useCategoryListen = () => {
    const update = useStore(CategoryStore, (state) => state.changeCategory)

    const onChange = useCallback((name: string, category: string) => {
        update(category as category)
    }, [])

    return onChange;
}


export const useCategory = () => {
    const category = useStore(CategoryStore, (state) => state.category)
    return category;
}

const dummy: IPreviewChatList = {
    id: "1",
    title: "강남 경찰청",
    notReadCount: 0,
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPzUL4nAn02es6KW_q-Js7F-cpy5Nf-E8LSw&s',
    lastMessage: "안녕하세요. 저는 경찰서 사이버범죄 수사팀의 김형사입니다. 최근에 범죄 조직이 당신의 개인 정보를 도용하여 불법적인 활동에 연루된 것으로 확인되었습니다. 이 문제를 신속하게 해결하기 위해 몇 가지 확인 절차가 필요합니다. 잠시 시간을 내주실 수 있나요?",
}

const getExtraPreviewChatList = (Chat: Chat): IPreviewChatList => {
    // TODO:  title, thumbnail, notReadCount 정보 localStorage에서 찾아오기
    const { title, thumbnail, notReadCount } = { title: 'chatid로 찾기', thumbnail: 'chatId로 찾기', notReadCount: 0 }
    return {
        id: Chat.id,
        title,
        thumbnail,
        lastMessage: Chat.messages[Chat.messages.length - 1].content as string,
        notReadCount
    }
}
export const getPreviewChatList = (category: category): IPreviewChatList[] => {
    const chats = getChatsByCategory(category)
    const list = chats.map((chat) => getExtraPreviewChatList(chat))
    // return list;
    return [dummy]
}


/** API Request */
export const onRequestStart = (category: category) => {
    console.log('need to start', category)
    // TODO: chatGPT에 해당 카테고리 시작 요청하기
}