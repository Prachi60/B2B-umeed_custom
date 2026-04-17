import { useState } from 'react'
import { Package, Clock, ChevronRight, Filter, Search } from 'lucide-react'

const activeOrders = [
  { id: 'ORD-3012', item: 'Sharbati Atta 10kg', qty: 10, price: 5400, status: 'Processing', date: 'Today, 10:42 AM' },
  { id: 'ORD-3013', item: 'Sun Sunflower Oil 1L', qty: 24, price: 4032, status: 'Shipped', date: 'Yesterday, 04:12 PM' },
]

const historyOrders = [
  { id: 'ORD-2950', item: 'Basmati Rice 25kg', qty: 5, price: 11700, status: 'Delivered', date: '12 Apr 2026' },
  { id: 'ORD-2942', item: 'Buffalo Ghee 1L', qty: 12, price: 8280, status: 'Delivered', date: '08 Apr 2026' },
]

function Orders() {
  const [activeTab, setActiveTab] = useState('active')

  const currentOrders = activeTab === 'active' ? activeOrders : historyOrders

  return (
    <div className="pb-4 px-4 pt-4 bg-[#F8FAFC]">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">Your Orders</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Track wholesale shipments</p>
        </div>
        <button className="h-12 w-12 grid place-items-center bg-white rounded-2xl shadow-sm border border-slate-100">
          <Filter size={20} className="text-slate-600" />
        </button>
      </header>

      {/* TABS */}
      <div className="flex bg-slate-100 p-1.5 rounded-[20px] mb-8">
        <button 
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-3.5 text-xs font-black uppercase tracking-widest rounded-2xl transition-all ${activeTab === 'active' ? 'bg-white text-black shadow-sm' : 'text-slate-400'}`}
        >
          Active
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3.5 text-xs font-black uppercase tracking-widest rounded-2xl transition-all ${activeTab === 'history' ? 'bg-white text-black shadow-sm' : 'text-slate-400'}`}
        >
          History
        </button>
      </div>

      {/* ORDERS LIST */}
      <div className="space-y-5">
        {currentOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-[32px] p-5 shadow-sm border border-slate-50 group active:scale-[0.98] transition-all">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 bg-slate-50 rounded-2xl grid place-items-center text-black">
                  <Package size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">{order.id}</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{order.date}</p>
                </div>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 
                order.status === 'Shipped' ? 'bg-slate-100 text-black' : 'bg-slate-50 text-slate-400'
              }`}>
                {order.status}
              </span>
            </div>

            <div className="border-t border-slate-50 pt-5 mb-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[#0F172A] mb-1 leading-tight">{order.item}</p>
                  <p className="text-xs text-slate-500 font-medium">Quantity: {order.qty} units</p>
                </div>
                <p className="text-xl font-black text-[#0F172A]">₹{order.price.toLocaleString('en-IN')}</p>
              </div>
            </div>

            <button className="w-full h-14 bg-slate-50 hover:bg-slate-100 rounded-2xl flex items-center justify-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest transition-colors">
              <Clock size={16} />
              View Tracking
              <ChevronRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
