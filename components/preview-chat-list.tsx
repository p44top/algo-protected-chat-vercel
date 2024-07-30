'use client'

import { useCategory, IPreviewChatList, getPreviewChatList } from "@/app/(chat)/list/action"
import { ButtonRequestChat } from "./button-request-chat"
import { PreviewChat } from "./preview-chat"
import { useEffect, useState } from "react"

const PreviewList = ({ list }: { list: IPreviewChatList[] }) => {
    return list.map((val) => <PreviewChat key={val.id} id={val.id} info={val.lastMessage} title={val.title} badge={val.notReadCount} thumbnail={val.thumbnail} />)
}

const Loading = () => {
    return <div className="animate-pulse flex flex-col px-5 gap-8">
        {Array.from({ length: 4 }).map((_, idx) => <div key={idx} className="flex gap-2 items-center">
            <div className="rounded-full bg-slate-200 h-12 w-12"></div>
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
        </div>)}
    </div>
}

const Empty = () => {
    return <div className='min-h-56 flex flex-col items-center justify-center gap-8 py-2 px-4'>
        <h3 className="text-lg font-medium text-center">대화를 시작해보세요</h3>
        <ButtonRequestChat />
    </div>
}

export const PreviewChatList = () => {
    const [list, setList] = useState<IPreviewChatList[] | undefined>(undefined)
    const category = useCategory();

    useEffect(() => {
        const previewList = getPreviewChatList(category)
        setList(previewList)
    }, [category])

    if (list)
        return list.length === 0 ? <Empty /> : <PreviewList list={list} />

    return <Loading />
}