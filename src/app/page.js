'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import WhyWarehouseHub from '@/components/WhyWarehouseHub'
import Login from '@/components/Login'
import GetStarted from '@/components/GetStarted'
import Footer from '@/components/Footer'
import MerchantDashboard from '@/components/MerchantDashboard'
import OwnerDashboard from '@/components/OwnerDashboard'
import ChatBox from '@/components/ChatBox'

export default function Home() {
  const [currentUser, setCurrentUser] = useState(null)
  const [showChat, setShowChat] = useState(false)
  const [selectedWarehouse, setSelectedWarehouse] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLoginSuccess = (user) => {
    setCurrentUser(user)
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
    setShowChat(false)
    setSelectedWarehouse(null)
  }

  const handleOpenChat = (warehouse, user) => {
    setSelectedWarehouse(warehouse)
    setShowChat(true)
  }

  // Show dashboard if user is logged in
  if (currentUser) {
    return (
      <>
        {currentUser.userType === 'merchant' ? (
          <MerchantDashboard 
            user={currentUser} 
            onLogout={handleLogout}
            onOpenChat={handleOpenChat}
          />
        ) : (
          <OwnerDashboard 
            user={currentUser} 
            onLogout={handleLogout}
            onOpenChat={handleOpenChat}
          />
        )}
        
        {showChat && selectedWarehouse && (
          <ChatBox
            warehouse={selectedWarehouse}
            user={currentUser}
            onClose={() => setShowChat(false)}
          />
        )}
      </>
    )
  }

  // Show landing page if not logged in
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <Hero />
      <WhyWarehouseHub />
      <HowItWorks />
      <Login onLoginSuccess={handleLoginSuccess} />
      <GetStarted />
      <Footer />
    </div>
  )
}
