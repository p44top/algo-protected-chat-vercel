import { IconUser } from './icons'

export const Profile = ({ thumbnail, name = '' }: { thumbnail?: string; name?: string }) => {
    return (
        <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
            {thumbnail ? (
                <img src={thumbnail} alt={`${name} thumbnail`} className="w-full h-full object-cover" />
            ) : (
                <IconUser className="p-3 text-muted-foreground w-full h-full" />
            )}
        </div>
    )
}
