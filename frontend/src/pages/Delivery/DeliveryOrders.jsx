import { useMemo, useState } from 'react'
import Card from '../../components/Card'
import Header from '../../components/Header'
import { deliveryOrders } from '../../data/deliveryData'

function getStatusBadge(status) {
  if (status === 'Delivered') {
    return 'bg-slate-100 text-slate-700'
  }

  if (status === 'Picked') {
    return 'bg-blue-100 text-blue-700'
  }

  return 'bg-amber-100 text-amber-700'
}

function DeliveryOrders() {
  const [orders, setOrders] = useState(deliveryOrders)

  const pendingCount = useMemo(
    () => orders.filter((item) => item.decision === 'Pending').length,
    [orders],
  )

  const handleDecision = (id, decision) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== id) {
          return order
        }

        if (decision === 'Rejected') {
          return { ...order, decision: 'Rejected', status: 'Assigned' }
        }

        return { ...order, decision: 'Accepted', status: order.status === 'Assigned' ? 'Picked' : order.status }
      }),
    )
  }

  const updateStatus = (id, status) => {
    setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, status } : order)))
  }

  const openRoute = (address) => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`
    window.open(mapsUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="screen-shell space-y-4 mt-4">
      <Header title="Delivery Orders" subtitle="Accept/reject, navigate route, and update live status" />

      <Card>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-xl bg-slate-100 px-3 py-2.5 gap-2 sm:gap-0">
          <p className="text-sm font-medium text-slate-800">Pending decisions</p>
          <span className="rounded-full bg-black px-2.5 py-1 text-xs font-semibold text-white">{pendingCount}</span>
        </div>
      </Card>

      <div className="space-y-3">
        {orders.map((order) => (
          <Card key={order.id} className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">{order.customerName}</p>
                <p className="mt-1 text-xs text-slate-500">Order ID: {order.orderId}</p>
                <p className="mt-1 text-xs text-slate-500">{order.customerPhone}</p>
                <p className="mt-1 text-xs text-slate-600">{order.address}</p>
              </div>
              <span className={`mt-2 sm:mt-0 rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusBadge(order.status)}`}>
                {order.status}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-2.5 text-xs text-slate-600">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-slate-500">Distance</p>
                <p className="mt-1 font-semibold text-slate-800">{order.distanceKm} km</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-slate-500">ETA</p>
                <p className="mt-1 font-semibold text-slate-800">{order.eta}</p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 w-full">
              <button
                type="button"
                onClick={() => handleDecision(order.id, 'Accepted')}
                disabled={order.decision === 'Rejected' || order.status === 'Delivered'}
                className="flex-1 min-w-24 rounded-lg bg-black px-3 py-1.5 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => handleDecision(order.id, 'Rejected')}
                disabled={order.decision === 'Accepted' || order.status === 'Delivered'}
                className="flex-1 min-w-24 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => openRoute(order.address)}
                className="flex-1 min-w-32 rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700"
              >
                Route Navigation
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 w-full">
              <button
                type="button"
                onClick={() => updateStatus(order.id, 'Picked')}
                disabled={order.decision !== 'Accepted' || order.status === 'Delivered'}
                className="flex-1 min-w-32 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Mark Picked
              </button>
              <button
                type="button"
                onClick={() => updateStatus(order.id, 'Delivered')}
                disabled={order.decision !== 'Accepted' || order.status !== 'Picked'}
                className="flex-1 min-w-32 rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Mark Delivered
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DeliveryOrders
