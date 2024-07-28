import { ChatList } from "@/components/chat-list"
import { Button } from "@/components/ui/button"


export const metadata = {
  title: 'Algo범죄'
}

const ChatDemo = () => {
  return <ChatList messages={[
    {
      id: '2',
      role: 'system',
      content: '안녕하세요. 알고범죄님 맞으신가요?'
    },
    {
      id: '7',
      role: 'user',
      content: '네. 무슨 일이세요?'
    },
    {
      id: '12',
      role: 'system',
      content: '안녕하세요. 저는 경찰서 사이버범죄 수사팀의 김형사입니다. 최근에 범죄 조직이 당신의 개인 정보를 도용하여 불법적인 활동에 연루된 것으로 확인되었습니다. 이 문제를 신속하게 해결하기 위해 몇 가지 확인 절차가 필요합니다. 잠시 시간을 내주실 수 있나요?'
    },
    {
      id: '17',
      role: 'user',
      content: '제가 수업중이라서 이따 연락드려도 될까요?'
    },
    {
      id: '22',
      role: 'system',
      content: '아버님께서 오늘 별세하였기에 삼가 알려드립니다.\n 장례식장 위치: https://t.lyhFens'
    },
  ]} />
}

export default async function IndexPage() {
  return (
    <div>
      <div className="h-[calc(100vh_-_theme(spacing.56))] overflow-y-auto">
        <ChatDemo />
      </div>

      <div className="bg-background fixed inset-x-0 bottom-0 px-4 py-4 w-full border-t-2">
        <Button size='cta'>시작하기</Button>
      </div>

    </div>
  )
}
