import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
export default function LinkButton() {
  const router = useRouter()

  const clickHandler = () => {
    router.push('/list')
  }
  return (
    <Button type="submit" onClick={clickHandler} size="cta">
      시작하기
    </Button>
  )
}
