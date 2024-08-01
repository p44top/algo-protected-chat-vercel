import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DisabledLinkButton() {
  return (
    <Button className="bg-gray-500 rounded-xl" disabled size="cta">
      <Link href="/form">시작하기</Link>
    </Button>
  )
}
