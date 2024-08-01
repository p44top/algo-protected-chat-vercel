import { ChatDone } from '@/components/chat-done'
import { ChatFeedBack } from '@/components/chat-feedback'
import { ChatFeedBackContent } from '@/components/chat-feedback-content'

export const metadata = {
  title: 'ui: test'
}

export default async function IndexPage() {
  return (
    <ChatFeedBack
      id={'3'}
      isDone={false}
      feedback={{
        id: '4',
        role: 'system',
        content: JSON.stringify({
          success: false,
          Point: '사기꾼을 알아차린 것은 매우 중요합니다.',
          summary:
            '피해자에게 검사나 공식 기관을 사칭하여 금전이나 개인정보를 요구하는 범죄입니다. 공식 기관의 연락을 받았을 때는 직접 해당 기관에 확인하는 것이 좋습니다.',
          good: '사기범의 요구에 대해 의심을 품고 적극적으로 질문한 점이 좋았습니다. 공식 기관의 절차를 확인하려는 노력이 중요합니다.',
          bad: '초기에 금전 송금 요구에 대한 의심이 부족했습니다. 앞으로는 공식 기관의 연락을 받으면 직접 확인 절차를 거치는 것이 좋습니다.',
          extra:
            '공식 기관의 연락을 받았을 때는 해당 기관에 직접 전화하거나 공식 웹사이트를 통해 확인하는 것이 중요합니다. 사기범은 종종 긴급 상황을 연출하며 압박감을 주기 때문에, 신중한 대응이 필요합니다.'
        })
      }}
    />
  )
}
