import { BottomSheet } from '@/components/ui/bottomsheet'

export const metadata = {
    title: 'ui: test',
}

export default async function IndexPage() {
    return (
        <BottomSheet>
            <div className="p-2 flex flex-col gap-2">
                {Array.from({ length: 22 }).map((_, idx) => (
                    <li key={idx}>{idx + 1}</li>
                ))}
            </div>
        </BottomSheet>
    )
}
