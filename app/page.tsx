import { LogoSVG, LogoWithTextSVG } from "@/components/assets/logo"

export const metadata = {
  title: 'Algo범죄'
}

export default async function IndexPage() {
  return (
    <div>
      <LogoSVG />
      <LogoWithTextSVG/>
    </div>
  )
}
