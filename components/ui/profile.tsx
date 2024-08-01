import Image from 'next/image'
import { IconUser } from './icons'

export const Profile = ({
  thumbnail,
  name = ''
}: {
  thumbnail?: string
  name?: string
}) => {
  return (
    <div className="relative size-12 rounded-full overflow-hidden bg-muted">
      {thumbnail ? (
        <Image
          fill
          src={thumbnail}
          alt={`${name} thumbnail`}
          className="size-full object-cover"
        />
      ) : (
        <IconUser className="p-3 text-muted-foreground size-full" />
      )}
    </div>
  )
}
