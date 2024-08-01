import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
export default function LinkButton() {
  const router = useRouter()

  const clickHandler = () => {
    router.push('/list')
  }
  return (
    <Button
      type="submit"
      onClick={clickHandler}
      className="w-96 h-12  mt-48 ml-3 rounded-xl"
    >
      시작하기
    </Button>
  )
}
