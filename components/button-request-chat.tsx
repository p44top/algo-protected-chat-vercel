'use client'

import { onRequestStart } from "@/app/(chat)/list/action"
import { Button } from "./ui/button"

export const ButtonRequestChat = () => {
    return <Button className="w-4/5" onClick={() => onRequestStart('0')}>시작하기</Button>
}