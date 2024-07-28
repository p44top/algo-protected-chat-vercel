import { PreviewChat } from "@/components/preview-chat"

export const metadata = {
    title: '🔎Algo범죄 | 채팅 리스트'
}

const PreviewChatDemo = () => {
    return Array.from({ length: 10 }).map((_, idx) => <PreviewChat key={idx} id={idx + ''} thumbnail='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPzUL4nAn02es6KW_q-Js7F-cpy5Nf-E8LSw&s' info="안녕하세요. 저는 경찰서 사이버범죄 수사팀의 김형사입니다. 최근에 범죄 조직이 당신의 개인 정보를 도용하여 불법적인 활동에 연루된 것으로 확인되었습니다. 이 문제를 신속하게 해결하기 위해 몇 가지 확인 절차가 필요합니다. 잠시 시간을 내주실 수 있나요?" title="강남 경찰청" badge={idx % 2 === 0 ? 0 : 3} />)
}

export default async function ChatListPage() {
    // TODO: 
    // 현재 활성화된 리스트 가져오기
    // 스켈레톤 로딩 만들기
    // localstorage에서 리스트 가져오기
    // 없으면 empty 표시 하기
    // return <PreviewChatDemo />
    return <div>없음.</div>
}
