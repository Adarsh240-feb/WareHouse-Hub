'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { warehouses, conversations } from '@/data/warehouseData'

export default function MerchantDashboard({ user, onLogout, onOpenChat }) {
  const [activeTab, setActiveTab] = useState('browse') // 'browse', 'saved', 'chats', 'requirements'
  const [selectedWarehouse, setSelectedWarehouse] = useState(null)
  const [filters, setFilters] = useState({
    city: '',
    category: '',
    minArea: '',
    maxBudget: ''
  })

  // Get merchant's active chats
  const merchantChats = conversations.filter(conv => conv.merchantId === user.id)

  // Filter warehouses
  const filteredWarehouses = warehouses.filter(wh => {
    if (filters.city && !wh.location.city.toLowerCase().includes(filters.city.toLowerCase())) return false
    if (filters.category && wh.category !== filters.category) return false
    if (filters.minArea && wh.size.area < parseInt(filters.minArea)) return false
    if (filters.maxBudget && wh.pricing.amount > parseInt(filters.maxBudget)) return false
    return true
  })

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold">
                WH
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Merchant Dashboard</h1>
                <p className="text-sm text-slate-600">{user.company || user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
              <motion.button
                onClick={onLogout}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {[
              { id: 'browse', label: '🏭 Browse Warehouses', count: warehouses.length },
              { id: 'chats', label: '💬 Active Chats', count: merchantChats.length },
              { id: 'saved', label: '⭐ Saved', count: 0 },
              { id: 'requirements', label: '📝 My Requirements', count: 0 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 font-medium border-b-2 transition-colors relative ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'browse' && (
          <div>
            {/* Filters */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">🔍 Search Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="City (e.g., Delhi)"
                  value={filters.city}
                  onChange={(e) => setFilters({...filters, city: e.target.value})}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                />
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                >
                  <option value="">All Categories</option>
                  <option value="General Storage">General Storage</option>
                  <option value="Cold Storage">Cold Storage</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Pharmaceutical">Pharmaceutical</option>
                </select>
                <input
                  type="number"
                  placeholder="Min Area (sq ft)"
                  value={filters.minArea}
                  onChange={(e) => setFilters({...filters, minArea: e.target.value})}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                />
                <input
                  type="number"
                  placeholder="Max Budget (₹/month)"
                  value={filters.maxBudget}
                  onChange={(e) => setFilters({...filters, maxBudget: e.target.value})}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
            </div>

            {/* Warehouse Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWarehouses.map((warehouse) => (
                <motion.div
                  key={warehouse.id}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedWarehouse(warehouse)}
                >
                  <div className="relative h-48">
                    <img
                      src={warehouse.images[0]}
                      alt={warehouse.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 bg-white rounded-full text-xs font-semibold text-slate-700 shadow-lg">
                      {warehouse.category}
                    </div>
                    {warehouse.verified && (
                      <div className="absolute top-3 left-3 px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold shadow-lg">
                        ✓ Verified
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{warehouse.name}</h3>
                    <p className="text-sm text-slate-600 mb-3">
                      📍 {warehouse.location.area}, {warehouse.location.city}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-2xl font-bold text-primary-600">
                          ₹{warehouse.pricing.amount.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-500">per {warehouse.pricing.period}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-slate-900">
                          {warehouse.size.area.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-500">{warehouse.size.unit}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {warehouse.facilities.slice(0, 3).map((facility, idx) => (
                        <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                          {facility}
                        </span>
                      ))}
                      {warehouse.facilities.length > 3 && (
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                          +{warehouse.facilities.length - 3} more
                        </span>
                      )}
                    </div>
                    <motion.button
                      className="w-full py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        onOpenChat(warehouse, user)
                      }}
                    >
                      Contact Owner
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'chats' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6">💬 Your Active Conversations</h3>
            {merchantChats.length > 0 ? (
              <div className="space-y-4">
                {merchantChats.map((chat) => {
                  const warehouse = warehouses.find(w => w.id === chat.warehouseId)
                  const lastMsg = chat.messages[chat.messages.length - 1]
                  return (
                    <motion.div
                      key={chat.id}
                      className="p-4 border border-slate-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all cursor-pointer"
                      whileHover={{ x: 5 }}
                      onClick={() => onOpenChat(warehouse, user)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-slate-900">{warehouse?.name}</h4>
                          <p className="text-sm text-slate-600">{warehouse?.ownerName}</p>
                          <p className="text-sm text-slate-500 mt-2">{lastMsg.message}</p>
                        </div>
                        <span className="text-xs text-slate-400">
                          {new Date(lastMsg.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            ) : (
              <p className="text-slate-600 text-center py-12">No active conversations yet. Start browsing warehouses!</p>
            )}
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <p className="text-slate-600 text-lg">⭐ No saved warehouses yet</p>
            <p className="text-slate-500 text-sm mt-2">Save your favorite warehouses for quick access</p>
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <p className="text-slate-600 text-lg">📝 Post your requirements</p>
            <p className="text-slate-500 text-sm mt-2">Let warehouse owners find you</p>
            <motion.button
              className="mt-6 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              Create Requirement
            </motion.button>
          </div>
        )}
      </div>

      {/* Warehouse Detail Modal */}
      {selectedWarehouse && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedWarehouse(null)}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-96">
              <img
                src={selectedWarehouse.images[0]}
                alt={selectedWarehouse.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedWarehouse(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">{selectedWarehouse.name}</h2>
              <p className="text-slate-600 mb-6">
                📍 {selectedWarehouse.location.address}, {selectedWarehouse.location.area}, {selectedWarehouse.location.city}
              </p>
              
              <div className="grid grid-cols-3 gap-6 mb-6 p-6 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Monthly Rent</p>
                  <p className="text-2xl font-bold text-primary-600">₹{selectedWarehouse.pricing.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Area</p>
                  <p className="text-2xl font-bold text-slate-900">{selectedWarehouse.size.area.toLocaleString()} {selectedWarehouse.size.unit}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Category</p>
                  <p className="text-lg font-semibold text-slate-900">{selectedWarehouse.category}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Description</h3>
                <p className="text-slate-600 leading-relaxed">{selectedWarehouse.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Facilities</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedWarehouse.facilities.map((facility, idx) => (
                    <span key={idx} className="px-3 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium">
                      ✓ {facility}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Owner Details</h3>
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {selectedWarehouse.ownerName[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{selectedWarehouse.ownerName}</p>
                    <p className="text-sm text-slate-600">{selectedWarehouse.ownerPhone}</p>
                  </div>
                </div>
              </div>

              <motion.button
                className="w-full py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedWarehouse(null)
                  onOpenChat(selectedWarehouse, user)
                }}
              >
                Contact Owner & Start Chat
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
