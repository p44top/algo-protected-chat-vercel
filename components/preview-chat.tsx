import { IconArrowRight, IconUser } from "./ui/icons";

interface PreviewChatProps {
    id: string;
    thumbnail?: string;
    title: string;
    info: string;
    badge?: number;
}


// TODO: click하면 id chat으로 이동
export const PreviewChat = ({ id, thumbnail, title, info, badge = 0 }: PreviewChatProps) => {
    return <div className="w-full flex cursor-pointer">
        <div className="flex place-items-center pl-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                {thumbnail ? <img src={thumbnail} alt={`${title} thumbnail`} className="w-full h-full object-cover" /> : <IconUser className="p-3 text-muted-foreground w-full h-full" />}
            </div>
        </div>
        <div className="flex-1 p-4 flex flex-col gap-3 border-b-[1px] border-border pr-4">
            <div className="w-full flex justify-between">
                <h4 className="text-lg font-semibold text-foreground">{title}</h4>
                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none">
                    <path d="M1 1.5L6 6.5L1 11.5" stroke="#DBDBDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <div className="w-full flex justify-between">
                <p className="text-sm text-foreground/90 w-4/5 line-clamp-2">{info}</p>
                {badge > 0 && <span className="px-2 py-1 text-caption min-w-4 h-fit rounded-full bg-destructive text-destructive-foreground">{badge}</span>}
            </div>
        </div>
    </div>
}