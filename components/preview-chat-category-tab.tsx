'use client'

import { CATEGORY_LIST, defaultSelectedValue, useCategoryListen } from "@/app/(chat)/list/action"
import { Tab, Tabs } from "./ui/tab"

export const PreviewChatCategoryTab = () => {
    const onSelected = useCategoryListen();
    return <Tabs name='category' defaultSelected={defaultSelectedValue} onSelected={onSelected}>
        {CATEGORY_LIST.map(({ value, label }) => <Tab value={value} key={value}>{label}</Tab>)}
    </Tabs>
}