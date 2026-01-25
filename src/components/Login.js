'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { users } from '@/data/warehouseData'

export default function Login({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true)
  const [userType, setUserType] = useState('merchant') // 'merchant' or 'owner'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: ''
  })
  const [focused, setFocused] = useState({})
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    if (isLogin) {
      // Login logic
      const userList = userType === 'merchant' ? users.merchants : users.owners
      const user = userList.find(u => u.email === formData.email && u.password === formData.password)
      
      if (user) {
        // Store in localStorage
        localStorage.setItem('currentUser', JSON.stringify({ ...user, userType }))
        onLoginSuccess({ ...user, userType })
      } else {
        setError('Invalid email or password')
      }
    } else {
      // Sign up logic - simplified for demo
      const newUser = {
        id: userType === 'merchant' ? `MER${Date.now()}` : `OWN${Date.now()}`,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        company: formData.company,
        verified: false
      }
      localStorage.setItem('currentUser', JSON.stringify({ ...newUser, userType }))
      onLoginSuccess({ ...newUser, userType })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section id="login" className="relative py-20 bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-50 overflow-hidden">
      {/* Animated background elements - optimized */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            className="inline-block px-4 py-2 bg-orange-100 text-primary-600 rounded-full text-sm font-semibold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            Get Started Today
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {isLogin ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {isLogin 
              ? 'Sign in to access your warehouse management dashboard' 
              : 'Join thousands of businesses optimizing their warehouse operations'}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative">
          {/* Partition line between sections */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent transform -translate-x-1/2"></div>
          
          {/* Left side - Benefits */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                icon: '🚀',
                title: 'Instant Access',
                desc: 'Get started in minutes with our intuitive platform'
              },
              {
                icon: '🔒',
                title: 'Secure & Reliable',
                desc: 'Enterprise-grade security for your data'
              },
              {
                icon: '📊',
                title: 'Real-time Analytics',
                desc: 'Track your warehouse performance in real-time'
              },
              {
                icon: '💡',
                title: '24/7 Support',
                desc: 'Our team is always here to help you succeed'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200/50 hover:border-primary-300 transition-all duration-300 hover:shadow-lg"
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <span className="text-4xl">{benefit.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200/50"
              whileHover={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
              transition={{ duration: 0.3 }}
            >
              {/* User Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-3">I am a</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUserType('merchant')}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 border-2 ${
                      userType === 'merchant'
                        ? 'bg-primary-50 border-primary-600 text-primary-600'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    🏢 Merchant
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('owner')}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 border-2 ${
                      userType === 'owner'
                        ? 'bg-primary-50 border-primary-600 text-primary-600'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    🏭 Owner
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {userType === 'merchant' ? 'Looking for warehouse space' : 'Have warehouse to offer'}
                </p>
              </div>

              {/* Tab switcher */}
              <div className="flex gap-2 mb-6 p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    isLogin 
                      ? 'bg-white text-primary-600 shadow-md' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    !isLogin 
                      ? 'bg-white text-primary-600 shadow-md' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name
                      </label>
                      <motion.input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocused({ ...focused, name: true })}
                        onBlur={() => setFocused({ ...focused, name: false })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all duration-300"
                        placeholder="John Doe"
                        whileFocus={{ scale: 1.01 }}
                        animate={{ 
                          borderColor: focused.name ? 'rgb(249, 115, 22)' : 'rgb(203, 213, 225)' 
                        }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Company Name
                      </label>
                      <motion.input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        onFocus={() => setFocused({ ...focused, company: true })}
                        onBlur={() => setFocused({ ...focused, company: false })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all duration-300"
                        placeholder="Your Company"
                        whileFocus={{ scale: 1.01 }}
                        animate={{ 
                          borderColor: focused.company ? 'rgb(249, 115, 22)' : 'rgb(203, 213, 225)' 
                        }}
                      />
                    </motion.div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocused({ ...focused, email: true })}
                    onBlur={() => setFocused({ ...focused, email: false })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all duration-300"
                    placeholder="you@company.com"
                    required
                    whileFocus={{ scale: 1.01 }}
                    animate={{ 
                      borderColor: focused.email ? 'rgb(249, 115, 22)' : 'rgb(203, 213, 225)' 
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>
                  <motion.input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => setFocused({ ...focused, password: true })}
                    onBlur={() => setFocused({ ...focused, password: false })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all duration-300"
                    placeholder="••••••••"
                    required
                    whileFocus={{ scale: 1.01 }}
                    animate={{ 
                      borderColor: focused.password ? 'rgb(249, 115, 22)' : 'rgb(203, 213, 225)' 
                    }}
                  />
                </div>

                {isLogin && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                      <span className="text-slate-600">Remember me</span>
                    </label>
                    <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                      Forgot password?
                    </a>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* {isLogin && (
                //   <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm">
                //     <p className="font-semibold mb-1">Demo Credentials:</p>
                //     <p>Merchant: merchant@abc.com / merchant123</p>
                //     <p>Owner: owner@rajesh.com / owner123</p>
                //   </div>
                )} */}

                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-4 px-6 rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-slate-600">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-400/20 rounded-full blur-2xl opacity-50" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-400/20 rounded-full blur-2xl opacity-50" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
