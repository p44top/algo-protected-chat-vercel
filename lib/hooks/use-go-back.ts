import { useRouter } from 'next/navigation'

export const useGoBack = () => {
    const router = useRouter()
    const goBack = async (beforeFunc?: () => Promise<boolean>) => {
        if (beforeFunc) {
            const pass = await beforeFunc()
            if (!pass) return
        }
        router.back()
    }

    return goBack
}
