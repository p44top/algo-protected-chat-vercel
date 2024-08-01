'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import revertImage from '../../../public/webp/revertImage.webp'
import Image from 'next/image'
import Link from 'next/link'
import LinkButton from './linkButton'
import DisabledLinkButton from './disabledLinkButton'
import { setUserInfo } from '@/app/actions'
import { UserInfo } from '@/lib/types'

const schema = z.object({
  name: z.string().min(1, { message: '이름은 필수입니다!' }),
  birth: z.string().min(1, { message: '생년월일은 필수입니다!' }),
  gender: z.string().min(1, { message: '성별은 선택해주세요!' })
})

//위에서 정한 스키마와 같은 타입을 정함
type IFormInput = z.infer<typeof schema>

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty }
  } = useForm<IFormInput>({
    resolver: zodResolver(schema),
    mode: 'all'
  })
  const watchedValues = watch() // 모든 값을 감시합니다.

  const onSubmit: SubmitHandler<IFormInput> = data => {
    const now = new Date().getFullYear()
    const birth: number = +data.birth.split('-')[0]

    if (data.gender === '남성') {
      const g = 'male'
      const newSubmit: UserInfo = {
        name: data.name,
        age: now - birth + 1,
        gender: g
      }
      setUserInfo(newSubmit)
    } else if (data.gender === '여성') {
      const g = 'female'
      const newSubmit: UserInfo = {
        name: data.name,
        age: now - birth + 1,
        gender: g
      }
      setUserInfo(newSubmit)
    }
  }
  return (
    <div className="relative flex flex-col  justify-center items-center overflow-hidden">
      <Link href="/splash" className="w-full py-2">
        <Image src={revertImage} alt="revertImage"></Image>
      </Link>
      <div className="flex flex-col gap-[30px] px-4">
        <h1 className="self-start not-italic font-bold text-display-lg leading-8 ">
          사용자의 정보를<br></br>
          입력해 주세요.
        </h1>
        <p className="self-start not-italic font-normal text-base leading-6 h-6  text-gray-500 ">
          정보를 입력하면 맞춤형 시나리오를 제공해요!
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 pt-[28px] px-4 w-full"
      >
        <div className="flex flex-col gap-2">
          <label className="text-xs">이름</label>
          <input
            type="text"
            id="name"
            className="text-xl flex-col items-start h-8 focus:outline-none border-2 border-x-0 border-t-0 focus:border-b-blue-500 caret-blue-500 border-b-gray-500"
            {...register('name')}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs">생년월일</label>
          <input
            type="date"
            id="birth"
            className=" text-xl flex-col items-start h-8 focus:outline-none border-2 border-x-0  border-t-0 focus:border-b-blue-500 caret-blue-500 border-b-gray-500"
            placeholder="이름을 입력해주세요"
            {...register('birth')}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs">성별</label>
          <div className="w-full flex items- justify-start cursor-pointer text-gray-600">
            <label className="flex-1">
              <input
                type="radio"
                value="남성"
                id="남성"
                className="hidden peer text-xl"
                {...register('gender')}
              ></input>
              <div className="rounded-l-lg text-display-base h-12 flex items-center justify-center border-2 border-gray-300 peer-checked:border-blue-500 peer-checked:text-blue-500 cursor-pointer">
                남성
              </div>
            </label>
            <label className="flex-1  items-center justify-center cursor-pointer ">
              <input
                type="radio"
                value="여성"
                id="여성"
                className="hidden peer text-xl"
                {...register('gender')}
              ></input>
              <div
                className="rounded-r-lg h-12 text-display-base flex items-center justify-center border-2 border-gray-300 peer-checked:border-blue-500 peer-checked:text-blue-500 cursor-pointer
                            "
              >
                여성
              </div>
            </label>
          </div>
        </div>
        <div className="fixed inset-x-0 bottom-0 p-4">
          {isValid && isDirty ? <LinkButton /> : <DisabledLinkButton />}
        </div>
      </form>
    </div>
  )
}
