import { useState, useRef } from 'react'
import UsersPanel, { type User } from '../../components/UsersPanel'
import api from "../../services/api";

interface RegisterProps {
  users: User[]
}

function Register({ users }: RegisterProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [password, setPassword] = useState('')

  const inputName = useRef<HTMLInputElement>(null)
  const inputEmail = useRef<HTMLInputElement>(null)
  const inputAge = useRef<HTMLInputElement>(null)
  const inputPassword = useRef<HTMLInputElement>(null)

  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current?.value,
      age: inputAge.current?.value,
      email: inputEmail.current?.value,
      password: inputPassword.current?.value
    })
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="hidden w-1/2 flex-col items-center justify-center bg-linear-to-br from-indigo-600 to-purple-700 p-12 text-white lg:flex">
        <h2 className="text-3xl font-bold">Crie sua conta</h2>
        <p className="mt-3 max-w-sm text-center text-indigo-100">
          Cadastre-se para começar a usar a plataforma.
        </p>

        <UsersPanel users={users} />
      </div>

      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <form className="w-full max-w-sm">
          <h1 className="mb-1 text-3xl font-bold text-slate-900">Cadastro</h1>
          <p className="mb-8 text-slate-500">Preencha os dados abaixo para criar sua conta.</p>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700" htmlFor="name">
                Nome
              </label>
              <input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                ref={inputName}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700" htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="voce@exemplo.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                ref={inputEmail}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex w-1/3 flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700" htmlFor="age">
                  Idade
                </label>
                <input
                  id="age"
                  type="number"
                  min={0}
                  placeholder="18"
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                  required
                  ref={inputAge}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div className="flex w-2/3 flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700" htmlFor="password">
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  ref={inputPassword}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={createUsers}
            className="mt-8 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Cadastrar
          </button>


        </form>
      </div>
    </div>
  )
}

export default Register
