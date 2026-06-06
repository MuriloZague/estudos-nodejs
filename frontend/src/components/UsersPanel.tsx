import api from "../services/api";

export interface User {
  id: string
  name: string
  email: string
}

interface UsersPanelProps {
  users: User[]
}

async function deleteUser(id: string) {
  await api.delete(`/usuarios/${id}`);
}

function UsersPanel({ users }: UsersPanelProps) {
  return (
    <div className="mt-8 w-full max-w-sm rounded-2xl bg-white/95 p-5 shadow-lg">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Usuários cadastrados
      </h3>
      <ul className="flex flex-col gap-3">
        {users.map((user) => (
          <li key={user.id} className="flex items-center gap-3 justify-between">
            <div className="flex gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
              {user.name.charAt(0)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-800">{user.name}</p>
              <p className="truncate text-xs text-slate-500">{user.email}</p>
            </div>
            </div>
            <div className="cursor-pointer" onClick={() => deleteUser(user.id)}>
              <p>🗑️</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UsersPanel
