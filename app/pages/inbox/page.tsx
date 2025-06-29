import { Card } from '@/components/ui/card'

const inboxItems = [
  { title: 'Website Development', status: 'Finished' },
  { title: 'Website Development', status: 'Accepted' },
  { title: 'Website Development', status: 'Rejected' },
  { title: 'Website Development', status: 'Rejected' },
]

export default function InboxPage() {
  return (
    <div className="w-full h-full p-8">
      <div className="font-serif text-2xl mb-6">Inbox</div>
      <div className="border-b mb-8" />
      <div className="flex flex-col gap-6">
        {inboxItems.map((item, idx) => (
          <Card key={idx} className="flex items-center justify-between px-10 py-8 bg-muted font-serif text-xl shadow-none">
            <span>{item.title}</span>
            <span>{item.status}</span>
          </Card>
        ))}
      </div>
    </div>
  )
} 