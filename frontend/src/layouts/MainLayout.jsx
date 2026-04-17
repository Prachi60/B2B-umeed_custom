import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import BottomNav from '../components/BottomNav'

function MainLayout() {
  const location = useLocation()

  return (
    <div className="h-dvh overflow-hidden bg-slate-50 flex flex-col">
      {/* MOBILE CONTENT AREA - ONLY THIS SCROLLS */}
      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="will-change-transform pb-24"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FIXED NAVBAR */}
      <BottomNav />
    </div>
  )
}

export default MainLayout
