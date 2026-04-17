import { Link } from 'react-router-dom'
import Card from '../../components/Card'
import Header from '../../components/Header'
import {
  deliveryOrders,
  calculateNetEarning,
  formatCurrency,
} from '../../data/deliveryData'


function DeliveryHome() {
  const assignedCount = deliveryOrders.filter((item) => item.status === 'Assigned' && item.decision === 'Pending').length
  const activeCount = deliveryOrders.filter((item) => item.status === 'Picked').length
  const deliveredCount = deliveryOrders.filter((item) => item.status === 'Delivered').length

  const deliveredEarnings = deliveryOrders
    .filter((item) => item.status === 'Delivered' && item.decision === 'Accepted')
    .reduce((sum, item) => sum + calculateNetEarning(item), 0)

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      <header className="mb-2">
        <h1 className="text-xl font-semibold text-slate-900">Delivery Dashboard</h1>
        <p className="text-sm text-slate-500">Orders, earnings, and targets</p>
      </header>

      {/* TODAY SNAPSHOT CARD */}
      <section className="bg-black p-5 rounded-[20px] text-white shadow-lg">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Today Snapshot</p>
        <div className="mt-2 flex items-baseline gap-1">
          <p className="text-3xl font-bold">{formatCurrency(deliveredEarnings)}</p>
        </div>
        <p className="mt-1 text-xs text-gray-400">Net earning from completed drops</p>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="bg-gray-800/80 rounded-xl px-2 py-3 text-center border border-gray-700/50">
            <p className="text-[10px] uppercase font-medium text-gray-400">Assigned</p>
            <p className="mt-1 text-lg font-semibold">{assignedCount}</p>
          </div>
          <div className="bg-gray-800/80 rounded-xl px-2 py-3 text-center border border-gray-700/50">
            <p className="text-[10px] uppercase font-medium text-gray-400">Picked</p>
            <p className="mt-1 text-lg font-semibold">{activeCount}</p>
          </div>
          <div className="bg-gray-800/80 rounded-xl px-2 py-3 text-center border border-gray-700/50">
            <p className="text-[10px] uppercase font-medium text-gray-400">Delivered</p>
            <p className="mt-1 text-lg font-semibold">{deliveredCount}</p>
          </div>
        </div>
      </section>

      {/* QUICK ACCESS */}
      <Card className="p-4 shadow-sm border-none">
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Quick Access</h3>
            <p className="text-xs text-slate-500 mt-0.5">Manage your daily run</p>
          </div>

          <div className="grid gap-2">
            <Link 
              to="/delivery/orders" 
              className="flex items-center justify-between w-full px-4 py-3 bg-white border border-slate-100 rounded-xl group active:scale-[0.98] transition-all shadow-sm"
            >
              <span className="text-sm font-medium text-slate-700">Manage Orders</span>
              <svg className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link 
              to="/delivery/earnings" 
              className="flex items-center justify-between w-full px-4 py-3 bg-white border border-slate-100 rounded-xl group active:scale-[0.98] transition-all shadow-sm"
            >
              <span className="text-sm font-medium text-slate-700">Earnings & Commission</span>
              <svg className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </Card>

      {/* PERFORMANCE HIGHLIGHTS */}
      <Card className="p-4 shadow-sm border-none">
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Performance Highlights</h3>
            <p className="text-xs text-slate-500 mt-0.5">Tracking your targets</p>
          </div>

          <div className="grid gap-3">
            <div className="flex items-center justify-between p-3 border border-slate-50 rounded-xl bg-slate-50/50">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-tighter">Daily Target</span>
              <span className="text-sm font-semibold text-slate-900">Rs 1,800</span>
            </div>
            <div className="flex items-center justify-between p-3 border border-slate-50 rounded-xl bg-slate-50/50">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-tighter">Target Achieved</span>
              <span className="text-sm font-bold text-slate-900">
                {Math.min(100, Math.round((deliveredEarnings / 1800) * 100))}%
              </span>
            </div>
            <div className="flex items-center justify-between p-3 border border-slate-50 rounded-xl bg-slate-50/50">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-tighter">This Month</span>
              <span className="text-sm font-semibold text-slate-900">Rs 31,420</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default DeliveryHome
