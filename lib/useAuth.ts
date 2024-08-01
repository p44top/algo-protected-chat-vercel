import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { UserInfo } from './types'
import { getUserInfo } from '@/app/actions'

export const useAuth = () => {
  const [user, setUser] = useState<UserInfo>()
  const router = useRouter()
  useEffect(() => {
    const userInfo = getUserInfo()
    if (userInfo?.name) {
      if (location.pathname === '/') return router.replace('/list')
      setUser(userInfo)
    } else {
      router.replace('/splash')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return user
}
