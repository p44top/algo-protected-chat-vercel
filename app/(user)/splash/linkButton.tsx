import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function LinkButton() {
  const router = useRouter()
  const clickHandler = () => {
    router.push('/form')
  }
  return (
    <Button onClick={clickHandler} className="w-96 h-12  -mt-32 rounded-xl">
      시작하기
    </Button>
  )
}
