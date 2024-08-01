'use clinet'

import { Button } from './ui/button'
import { IconBack } from './ui/icons'
import { Profile } from './ui/profile'
import { useGoBack } from '@/lib/hooks/use-go-back'
import { useChatBotProfile } from './chat-profile-hook'

export interface ChatProfileHeaderProps {
    id: string
}

const Loading = () => {
    return (
        <div className="animate-pulse flex flex-col gap-1">
            <div className="rounded-full bg-slate-200 size-10"></div>
            <div className="h-2 bg-slate-200 rounded"></div>
        </div>
    )
}

export function ChatProfileHeader({ id }: ChatProfileHeaderProps) {
    const goBack = useGoBack()
    const { profile } = useChatBotProfile(id)

    return (
        <header className="h-[92px] flex flex-col gap-2 w-full bg-muted justify-center items-center">
            <div className="absolute top-4 left-4" onClick={() => goBack()}>
                <Button variant="ghost" size="icon" className="hover:bg-transparet hover:text-bg-foreground/50">
                    <IconBack />
                </Button>
            </div>
            {profile.isLoading ? (
                <Loading />
            ) : (
                <>
                    <Profile {...profile} />
                    <h4 className="text-caption font-semibold">{profile.name}</h4>
                </>
            )}
        </header>
    )
}
