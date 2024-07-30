import { getChatBotProfile } from '@/app/actions'
import { useEffect, useState } from 'react'

export const useChatBotProfile = (id: string) => {
    const [profile, setProfileInfo] = useState({
        isLoading: true,
        name: '',
        thumbnail: '',
    })

    useEffect(() => {
        const profile = getChatBotProfile(id)
        if (profile) {
            setProfileInfo((prev) => ({
                ...prev,
                isLoading: false,
                ...profile,
            }))
        }
    }, [id])

    return { profile }
}
