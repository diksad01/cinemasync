import type { User } from '@somniwatch/shared'

interface Props {
  users: User[]
}

export default function UserPills({ users }: Props) {
  if (!users.length) return null
  return (
    <div className="flex flex-wrap gap-1.5 stagger">
      {users.map(u => (
        <span key={u.id} className="user-pill anim-scale-in">
          <span className="relative">
            <span className="dot-green" />
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background: 'var(--green)',
                animation: 'ripple 2s ease-out infinite',
                opacity: 0.4,
              }}
            />
          </span>
          {u.name}
        </span>
      ))}
    </div>
  )
}
