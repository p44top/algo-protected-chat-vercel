import { ChatPageUsingStore } from '@/components/chat-page'

export interface ChatPageProps {
    params: {
        id: string
    }
}

export default async function ChatPage({ params }: ChatPageProps) {
    return <ChatPageUsingStore id={params.id} />
}
