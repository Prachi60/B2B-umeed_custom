import Card from '../../components/Card'
import Header from '../../components/Header'

const dailyStats = [
  { day: 'Mon', earning: 840 },
  { day: 'Tue', earning: 960 },
  { day: 'Wed', earning: 1320 },
  { day: 'Thu', earning: 1110 },
  { day: 'Fri', earning: 1490 },
  { day: 'Sat', earning: 1780 },
]

function DeliveryPerformance() {
  const dailyTarget = 1800
  const monthlyTarget = 45000

  const weekTotal = dailyStats.reduce((sum, item) => sum + item.earning, 0)
  const todayEarning = dailyStats.at(-1)?.earning ?? 0
  const monthEarning = 31420

  const dailyProgress = Math.min(100, Math.round((todayEarning / dailyTarget) * 100))
  const monthlyProgress = Math.min(100, Math.round((monthEarning / monthlyTarget) * 100))

  return (
    <div className="space-y-4">
      <Header title="Performance" subtitle="Daily and monthly earning targets" />

      <section className="grid grid-cols-2 gap-3">
        <Card className="p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-500">Daily Earnings</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">Rs {todayEarning.toLocaleString('en-IN')}</p>
          <p className="mt-1 text-xs text-slate-500">Target: Rs {dailyTarget.toLocaleString('en-IN')}</p>
        </Card>

        <Card className="p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-500">Monthly Earnings</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">Rs {monthEarning.toLocaleString('en-IN')}</p>
          <p className="mt-1 text-xs text-slate-500">Target: Rs {monthlyTarget.toLocaleString('en-IN')}</p>
        </Card>
      </section>

      <Card>
        <h3 className="section-title">Target Tracking</h3>

        <div className="mt-4 space-y-4">
          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-slate-600">
              <span>Daily Target Completion</span>
              <span>{dailyProgress}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-black" style={{ width: `${dailyProgress}%` }} />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-slate-600">
              <span>Monthly Target Completion</span>
              <span>{monthlyProgress}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-black" style={{ width: `${monthlyProgress}%` }} />
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="section-title">Last 6 Days Earnings</h3>

        <div className="mt-4 space-y-3">
          {dailyStats.map((item) => {
            const width = Math.max(8, Math.round((item.earning / dailyTarget) * 100))

            return (
              <div key={item.day} className="grid grid-cols-[42px_1fr_70px] items-center gap-2 text-sm">
                <span className="font-medium text-slate-700">{item.day}</span>
                <div className="h-2.5 rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-black" style={{ width: `${Math.min(100, width)}%` }} />
                </div>
                <span className="text-right font-semibold text-slate-800">Rs {item.earning}</span>
              </div>
            )
          })}
        </div>

        <div className="mt-4 rounded-xl bg-slate-100 p-3 text-sm">
          <p className="font-medium text-slate-800">Weekly Total</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">Rs {weekTotal.toLocaleString('en-IN')}</p>
        </div>
      </Card>
    </div>
  )
}

export default DeliveryPerformance
