

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      {children}
    </div>
  )
}
