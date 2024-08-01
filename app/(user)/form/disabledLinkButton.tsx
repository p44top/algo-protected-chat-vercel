import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DisabledLinkButton() {
    return (
        <Button className="bg-gray-500 w-96 h-12  mt-72 ml-5 rounded-xl" disabled>
            <Link href="/form">시작하기</Link>
        </Button>
    )
}
