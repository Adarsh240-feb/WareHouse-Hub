'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useState } from 'react'

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 150])
  const y2 = useTransform(scrollY, [0, 500], [0, -100])
  const opacity = useTransform(scrollY, [0, 500], [1, 0.3])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50/50 via-white to-slate-50 min-h-[90vh] flex items-center pt-20">
      {/* Optimized background blobs - fewer animations, CSS only */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative w-full">
        <motion.div
          className="text-center max-w-5xl mx-auto"
          style={{ y: y2, opacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Enhanced Badge */}
          <motion.span
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-50 to-primary-50 text-primary-600 text-sm font-semibold mb-8 border border-orange-200 shadow-xl shadow-orange-100/50 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <svg 
              className="w-4 h-4" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            India's #1 B2B Warehouse Marketplace
          </motion.span>

          {/* Enhanced Main Headline with better animations */}
          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 tracking-tight leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-block"
            >
              Find the Perfect{' '}
            </motion.span>
            <motion.span
              className="relative inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6, type: "spring", stiffness: 150 }}
            >
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-primary-500 to-orange-500">
                Warehouse Space
              </span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="inline-block"
            >
              {' '}for Your Business
            </motion.span>
          </motion.h1>

          {/* Enhanced Subtitle */}
          <motion.p 
            className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Connect with verified warehouse owners across India. Post your requirements
            or list your warehouse in minutes with our intelligent platform.
          </motion.p>

          {/* Enhanced Search Bar */}
          <motion.div 
            className="mt-12 max-w-3xl mx-auto" 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 items-center bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 p-2 hover:shadow-3xl transition-shadow duration-500"
              whileHover={{ scale: 1.01, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            >
              <div className="flex-1 flex items-center gap-3 px-4 w-full sm:w-auto">
                <svg 
                  className="w-5 h-5 text-slate-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by city, area, or warehouse type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 py-3 outline-none text-slate-700 placeholder:text-slate-400 w-full bg-transparent"
                />
              </div>
              <motion.button 
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-600 to-orange-500 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-500/30"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Search Warehouses
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Enhanced Stats with better animations */}
          <motion.div 
            className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            {[
              { label: '500+ Warehouses', color: 'emerald', icon: '🏭' },
              { label: '20+ Cities', color: 'blue', icon: '🌆' },
              { label: '1000+ Merchants', color: 'orange', icon: '🤝' }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm shadow-lg border border-slate-200/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -3 }}
              >
                <span className="text-2xl">
                  {stat.icon}
                </span>
                <span className="text-slate-700 font-semibold">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
