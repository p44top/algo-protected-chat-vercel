import { LogoWithTextSVG } from '@/components/assets/logo'
import { Tab, Tabs } from '@/components/ui/tab'
import { CATEGORY_LIST } from './action'
import { PreviewChatCategoryTab } from '@/components/preview-chat-category-tab'

interface ChatListLayoutProps {
  children: React.ReactNode
}

export default async function ChatListLayout({
  children
}: ChatListLayoutProps) {
  return (
    <div className="relative flex flex-col bg-primary h-screen overflow-hidden">
      <header className="h-14 flex align-center pt-5">
        <LogoWithTextSVG className="w-fit h-full ml-6" useReverse />
      </header>
      <PreviewChatCategoryTab />
      <div className="bg-background rounded-t-2xl mt-3 pt-4 overflow-y-auto h-[calc(100vh_-_theme(spacing.28)_-_theme(spacing.3))] scrollbar-hide">
        {children}
      </div>
    </div>
  )
}
