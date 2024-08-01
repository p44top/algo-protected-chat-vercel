import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function LinkButton() {
    return (
        <Button type="submit" className="w-96 h-12  mt-72 ml-5 rounded-xl">
            <Link href="/list">시작하기</Link>
        </Button>
    )
}
