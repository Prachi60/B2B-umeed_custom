import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function DeliveryLogin() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const isDeliveryAuthenticated = localStorage.getItem('umeed-delivery-auth') === 'true'

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!credentials.email.trim() || !credentials.password.trim()) {
      return
    }

    localStorage.setItem('umeed-delivery-auth', 'true')
    navigate('/delivery/home', { replace: true })
  }

  if (isDeliveryAuthenticated) {
    return <Navigate to="/delivery/home" replace />
  }

  return (
    <div className="screen-shell flex min-h-dvh flex-col overflow-x-hidden pb-8 pt-4">
      <section className="bg-black rounded-2xl px-5 pb-10 pt-9 text-white shadow-xl">
        <p className="text-xs uppercase tracking-[0.22em] text-gray-400 font-semibold">Delivery Portal</p>
        <h1 className="mt-2 text-[30px] font-bold leading-tight tracking-[-0.01em]">Umeed Delivery</h1>
        <p className="mt-2 max-w-[30ch] text-sm leading-relaxed text-gray-400">
          Login to manage assigned orders, delivery status, and your daily earnings.
        </p>
      </section>

      <section className="card-surface -mt-8 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Delivery Login</h2>
        <p className="mt-1 text-sm text-slate-500">Sign in to continue</p>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="mb-2 block text-xs font-medium text-slate-600">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="partner@umeed.com"
              value={credentials.email}
              onChange={handleChange}
              className="input-field focus:border-black focus:ring-slate-200"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-xs font-medium text-slate-600">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleChange}
              className="input-field focus:border-black focus:ring-slate-200"
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className="w-full bg-black py-3.5 rounded-2xl text-white font-bold text-sm shadow-lg active:scale-[0.98] transition-all">
            Login to Delivery Partner App
          </button>
        </form>
      </section>
    </div>
  )
}

export default DeliveryLogin
