import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LinkButton() {
    return (
        <Link href="/form">
            <Button type="submit" className="w-96 h-12  mt-20 rounded-xl">
                시작하기
            </Button>
        </Link>
    )
}
