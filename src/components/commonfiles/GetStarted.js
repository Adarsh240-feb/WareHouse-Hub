'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function GetStarted() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const steps = [
    {
      number: '01',
      title: 'Sign Up & Create Profile',
      description: 'Register as a Merchant or Warehouse Owner in under 2 minutes. Set up your profile with your business details.',
      icon: '✨',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      number: '02',
      title: 'Browse & List',
      description: 'Merchants browse available warehouses. Owners list their spaces with facilities and pricing. Find your perfect match!',
      icon: '📦',
      color: 'from-purple-500 to-pink-500'
    },
    {
      number: '03',
      title: 'Connect & Finalize',
      description: 'Chat directly, negotiate terms, and seal your warehouse agreement. All communication happens on WarehouseHub.',
      icon: '🚀',
      color: 'from-primary-500 to-orange-500'
    }
  ]

  const features = [
    { icon: '✓', text: 'Sign up in 2 minutes' },
    { icon: '✓', text: 'No subscription fees' },
    { icon: '✓', text: 'Direct merchant-owner connection' },
    { icon: '✓', text: '24/7 support team' }
  ]

  return (
    <section id="get-started" ref={ref} className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      {/* Floating gradient orbs - optimized */}
      <div className="absolute top-20 left-[10%] w-96 h-96 bg-primary-500/30 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-20 right-[10%] w-80 h-80 bg-orange-500/30 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          style={{ opacity }}
          className="text-center mb-20"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-primary-500/20 text-primary-300 rounded-full text-sm font-semibold mb-6 border border-primary-400/30"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, borderColor: 'rgba(249, 115, 22, 0.5)' }}
          >
            Get Started in Minutes
          </motion.span>
          
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-white">
              Ready to Connect?
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-orange-400 to-primary-400 animate-gradient-x">
              Start Your Journey Today
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Join merchants and warehouse owners building stronger partnerships. 
            Get started with WarehouseHub in just 3 simple steps.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div className="relative h-full bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-primary-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/20">
                {/* Step number */}
                <motion.div
                  className="absolute -top-4 -right-4 text-6xl font-bold text-slate-700/30"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                >
                  {step.number}
                </motion.div>

                {/* Icon */}
                <div className="mb-6 relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl blur-xl opacity-40`} />
                  <div className={`relative w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-3xl shadow-xl`}>
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-400 group-hover:to-orange-400 transition-all duration-300">
                  {step.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed">
                  {step.description}
                </p>

                {/* Progress connector */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute top-1/2 -right-8 w-16 h-0.5 bg-gradient-to-r from-primary-500 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.6, duration: 0.8 }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-orange-500 to-primary-500 rounded-3xl blur-2xl opacity-30" />
          
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-12 border border-slate-700/50 shadow-2xl">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Get Started Today
              </h3>
              <p className="text-slate-300 text-lg mb-6">
                Join the warehouse marketplace and connect with verified partners
              </p>

              {/* Features list */}
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                {[
                  { icon: '✓', text: 'Easy Sign Up' },
                  { icon: '✓', text: 'Verified Partners' },
                  { icon: '✓', text: '24/7 Support' },
                  { icon: '✓', text: 'Secure Transactions' }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 text-slate-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="text-green-400 font-bold">{feature.icon}</span>
                    <span>{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  onClick={() => {
                    const loginSection = document.getElementById('login')
                    if (loginSection) {
                      loginSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className="bg-gradient-to-r from-primary-600 to-orange-500 text-white px-10 py-5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-primary-500/50 transition-all duration-300 w-full sm:w-auto"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ready to Go ?
                </motion.button>
              </div>
            </div>

            {/* Trust indicators */}
            <motion.div
              className="flex flex-wrap justify-center items-center gap-8 pt-8 border-t border-slate-700/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-white">5,000+</div>
                <div className="text-slate-400 text-sm">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-slate-400 text-sm">Warehouses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">20+</div>
                <div className="text-slate-400 text-sm">Cities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-slate-400 text-sm">Support</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
