import type { User } from '@somniwatch/shared'

interface Props {
  users: User[]
}

export default function UserPills({ users }: Props) {
  if (!users.length) return null
  return (
    <div className="flex flex-wrap gap-1.5">
      {users.map(u => (
        <span key={u.id} className="user-pill">
          <span className="dot-green" />
          {u.name}
        </span>
      ))}
    </div>
  )
}
