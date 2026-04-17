import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn, ArrowRight, ShieldCheck } from 'lucide-react'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.email.trim() || !form.password.trim()) return
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      navigate('/retailer/home')
    }, 800)
  }

  return (
    <div className="flex min-h-dvh flex-col bg-[#F8FAFC]">
      {/* HEADER HERO */}
      <section className="bg-[#0F172A] rounded-b-[40px] px-6 pb-16 pt-12 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
             <div className="h-10 w-10 bg-white/10 rounded-xl grid place-items-center backdrop-blur-md border border-white/10">
               <LogIn size={20} />
             </div>
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Retailer Portal</span>
          </div>
          <h1 className="text-4xl font-black leading-tight tracking-tighter">Umeed Retailers</h1>
          <p className="mt-4 max-w-[28ch] text-sm font-medium text-slate-400 leading-relaxed">
            Wholesale ordering platform for local stores and supermarkets.
          </p>
        </div>
        <ShieldCheck className="absolute -right-8 -bottom-8 text-white/5 w-48 h-48 -rotate-12" />
      </section>

      {/* FORM SECTION */}
      <section className="flex-1 px-6 pt-8 pb-10">
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-50 -mt-12 relative z-20">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#0F172A]">Welcome Back</h2>
            <p className="text-sm text-slate-400 font-medium">Sign in to your account</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Account</label>
              <input
                name="email"
                type="email"
                placeholder="store.manager@shop.com"
                value={form.email}
                onChange={handleChange}
                className="w-full h-14 px-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:border-black focus:ring-4 focus:ring-slate-100 transition-all font-medium text-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full h-14 px-4 bg-slate-50 rounded-2xl border border-slate-100 outline-none focus:border-black focus:ring-4 focus:ring-slate-100 transition-all font-medium text-sm"
                required
              />
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-xs font-bold text-black border-b border-black/10">Forgot Password?</button>
            </div>

            <button 
              type="submit" 
              className="w-full h-14 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-[0.98] transition-all shadow-xl shadow-black/10 disabled:opacity-70"
              disabled={submitting}
            >
              {submitting ? 'Verifying...' : 'Login Securely'}
              {!submitting && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-8 text-center pt-8 border-t border-slate-50">
            <p className="text-sm font-medium text-slate-500">
              New retailer?{' '}
              <Link to="/retailer/signup" className="font-extrabold text-black hover:underline underline-offset-4">
                Join Network
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
