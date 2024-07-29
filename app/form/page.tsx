'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import 'react-toastify/dist/ReactToastify.css'
import { useRef, useState } from 'react'

const schema = z.object({
  //이름, 생년월일 검증을 위한 스키마
  name: z.string().min(1, { message: '이름은 필수입니다!' }),
  birth: z
    .string()
    .regex(/^\d{4}\.\d{2}\.\d{2}$/, '생년월일은 YYYY.MM.DD 형식이어야 합니다.')
    .refine(value => {
      const [year, month, day] = value.split('.').map(Number)
      const date = new Date(year, month - 1, day)
      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      )
    }, '유효한 날짜를 입력해주세요.'),
  gender: z.enum(['남성', '여성', '이외'])
})

//위에서 정한 스키마와 같은 타입을 정함
type IFormInput = z.infer<typeof schema>

export default function App() {
  const birthRef = useRef<HTMLInputElement>(null)
  const [birth, setBirth] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<IFormInput>({
    resolver: zodResolver(schema)
  })
  const onSubmit: SubmitHandler<IFormInput> = data => {
    //제출 시 데이터를 보낼 위치
    console.log(data)
  }

  const onError = (errors: any) => {
    // 오류가 발생한 경우, Toastify를 사용하여 오류 메시지 표시
    Object.values(errors).forEach((error: any) => {
      toast.error(error.message)
    })
    //생년월일 부분만 focus되지 않는 현상으로 인해 useRef로 작성
    if (errors.birth) {
      birthRef.current?.focus()
    }
  }
  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length == 9) {
      //폼을 초과해서 작성 할 경우 되돌리기
      value = birth
    } else {
      if (value.length > 6) {
        value = `${value.slice(0, 4)}.${value.slice(4, 6)}.${value.slice(6, 8)}`
      } else if (value.length > 4 && value.length <= 6) {
        value = `${value.slice(0, 4)}.${value.slice(4, 6)}`
      } else if (value.length > 0 && value.length <= 4) {
        value = `${value.slice(0, 4)}`
      }
    }
    //각각 제출 시 전달할 값, input에 value로 남을 값
    setValue('birth', value)
    setBirth(value)
  }

  return (
    <>
      <h1>
        사용자의 정보를<br></br>
        입력해 주세요.
      </h1>
      <p>정보를 입력하면 맞춤형 시나리오를 제공해요!</p>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div>
          <label>이름</label>
          <input {...register('name')} />
        </div>
        <div>
          <label>생년월일</label>
          <input
            {...register('birth')}
            ref={birthRef}
            onChange={handleBirthChange}
            value={birth}
          />
        </div>
        <div>
          <label>성별</label>
          <select {...register('gender')}>
            <option value="여성">여성</option>
            <option value="남성">남성</option>
            <option value="이외">이외</option>
          </select>
        </div>
        <button type="submit">시작하기</button>
      </form>
      <ToastContainer></ToastContainer>
    </>
  )
}
