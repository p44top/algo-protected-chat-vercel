'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import revertImage from '../../../public/webp/revertImage.png'
import Image from 'next/image'
import Link from 'next/link'
import LinkButton from './linkButton'
import DisabledLinkButton from './disabledLinkButton'

const schema = z.object({
    name: z.string().min(1, { message: '이름은 필수입니다!' }),
    birth: z.string().min(1, { message: '생년월일은 필수입니다!' }),
    gender: z.string().min(1, { message: '성별은 선택해주세요!' }),
})

//위에서 정한 스키마와 같은 타입을 정함
type IFormInput = z.infer<typeof schema>

export default function App() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid, isDirty },
    } = useForm<IFormInput>({
        resolver: zodResolver(schema),
        mode: 'all',
    })
    const watchedValues = watch() // 모든 값을 감시합니다.

    return (
        <div className="flex flex-col  justify-center items-center">
            <Link href="/splash" className="ml-8">
                <Image src={revertImage} alt="revertImage"></Image>
            </Link>
            <h1 className="self-start ml-16 not-italic font-bold text-display-lg leading-8 ">
                사용자의 정보를<br></br>
                입력해 주세요.
            </h1>
            <p className="self-start ml-16 not-italic font-normal text-base leading-6 w-80 h-6  mt-8 text-gray-500 ">
                정보를 입력하면 맞춤형 시나리오를 제공해요!
            </p>
            <form onSubmit={handleSubmit((e) => console.log(e))} className="ml-4">
                <div className="flex-col items-start mt-10 w-96 h-16">
                    <label>이름</label>
                    <input
                        type="text"
                        id="name"
                        className="mt-4 text-display-base flex-col items-start  w-96 h-8 focus:outline-none border-2 border-l-0 border-r-0 border-t-0 focus:border-b-blue-500 caret-blue-500 border-b-gray-500"
                        {...register('name')}
                    />
                </div>
                <div className="flex-col items-start mt-16 w-96 h-16">
                    <label>생년월일</label>
                    <input
                        type="date"
                        id="birth"
                        className=" text-display-base flex-col items-start mt-10 w-96 h-8 focus:outline-none mt-100 border-2 border-l-0 border-r-0 border-t-0 focus:border-b-blue-500 caret-blue-500 border-b-gray-500"
                        {...register('birth')}
                    />
                </div>
                <div className="mt-16 flex ">
                    <label>성별</label>
                    <div className="mt-10 -ml-8 flex items- justify-start cursor-pointer">
                        <label>
                            <input
                                type="radio"
                                value="남성"
                                id="남성"
                                className="hidden mt-16 peer"
                                {...register('gender')}
                            ></input>
                            <div className="rounded-l-lg w-52 text-display-base h-12 flex items-center justify-center border-2 border-gray-300 peer-checked:border-blue-500 peer-checked:text-blue-500 cursor-pointer">
                                남성
                            </div>
                        </label>
                        <label className="flex  items-center justify-center cursor-pointer ">
                            <input
                                type="radio"
                                value="여성"
                                id="여성"
                                className="hidden peer"
                                {...register('gender')}
                            ></input>
                            <div
                                className="rounded-r-lg w-52 h-12 text-display-base flex items-center justify-center border-2 border-gray-300 peer-checked:border-blue-500 peer-checked:text-blue-500 cursor-pointer
                            "
                            >
                                여성
                            </div>
                        </label>
                    </div>
                </div>
                {isValid && isDirty ? <LinkButton /> : <DisabledLinkButton />}
            </form>
        </div>
    )
}
