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
    <div className="size-12 rounded-full overflow-hidden bg-muted">
      {thumbnail ? (
        <Image
          layout="full"
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
