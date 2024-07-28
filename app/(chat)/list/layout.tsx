import { LogoWithTextSVG } from "@/components/assets/logo"
import { Tab, Tabs } from "@/components/ui/tab"

interface ChatListLayoutProps {
    children: React.ReactNode
}

export default async function ChatListLayout({ children }: ChatListLayoutProps) {
    return (
        <div className="relative flex flex-col bg-primary h-screen overflow-hidden">
            <header className="h-14 flex align-center pt-5">
                <LogoWithTextSVG className="w-fit h-full ml-2" useReverse />
            </header>
            <Tabs name='category' defaultSelected='0'>
                <Tab value='0'>전체</Tab>
                <Tab value='1' >가족/지인</Tab>
                <Tab value='2' >은행/카드사</Tab>
                <Tab value='3' >범죄 연루</Tab>
                <Tab value='4' >기타</Tab>
            </Tabs>
            <div className="bg-background rounded-t-2xl mt-3 pt-4 overflow-y-auto h-[calc(100vh_-_theme(spacing.28)_-_theme(spacing.3))]">
                {children}
            </div>
        </div>
    )
}
