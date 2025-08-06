import { ShoppingCart } from 'lucide-react'
import React from 'react'

export default function ProfilePurchases() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 p-6">
      <div className='max-w-6xl mx-auto'>
           {/* Header */}
                 <div className="mb-3 text-center">
                <div className="inline-flex items-center px-6 py-3 mb-4 text-sm font-bold tracking-wider text-teal-700 uppercase transition-all duration-300 bg-gradient-to-r from-teal-100 to-teal-200 rounded-full shadow-lg hover:shadow-xl hover:scale-105">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  My Purchases
                </div>
              </div>
      </div>
    </div>
  )
}
