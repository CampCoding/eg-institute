import React, { useState } from 'react';
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  RefreshCw,
  XCircle,
  Eye,
  Download,
  MoreHorizontal,
  Star,
  Search,
  Filter,
  Calendar,
  CreditCard,
  MapPin,
  ArrowRight,
  Heart,
  ShoppingBag,
  AlertCircle,
  Zap
} from 'lucide-react';

export default function ProfileOrders() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('all');

  const [orders] = useState([
    {
      id: 'ORD-2024-001',
      date: '2024-08-01',
      status: 'delivered',
      total: 1849.98,
      items: 3,
      estimatedDelivery: '2024-08-05',
      actualDelivery: '2024-08-04',
      items_detail: [
        {
          id: 1,
          name: 'AirPods Pro 2nd Gen',
          brand: 'Apple',
          price: 249.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop'
        },
        {
          id: 2,
          name: 'MacBook Pro 14-inch M3',
          brand: 'Apple',
          price: 1599.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop'
        }
      ],
      trackingNumber: 'TRK123456789',
      shippingAddress: '123 Main St, New York, NY 10001'
    },
    {
      id: 'ORD-2024-002',
      date: '2024-07-28',
      status: 'shipped',
      total: 79.99,
      items: 1,
      estimatedDelivery: '2024-08-08',
      items_detail: [
        {
          id: 3,
          name: 'Magic Mouse',
          brand: 'Apple',
          price: 79.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop'
        }
      ],
      trackingNumber: 'TRK987654321',
      shippingAddress: '123 Main St, New York, NY 10001'
    },
    {
      id: 'ORD-2024-003',
      date: '2024-07-25',
      status: 'processing',
      total: 199.99,
      items: 2,
      estimatedDelivery: '2024-08-10',
      items_detail: [
        {
          id: 4,
          name: 'iPhone Case',
          brand: 'Apple',
          price: 49.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=400&h=400&fit=crop'
        },
        {
          id: 5,
          name: 'Lightning Cable',
          brand: 'Apple',
          price: 29.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop'
        }
      ],
      shippingAddress: '123 Main St, New York, NY 10001'
    },
    {
      id: 'ORD-2024-004',
      date: '2024-07-20',
      status: 'cancelled',
      total: 999.99,
      items: 1,
      items_detail: [
        {
          id: 6,
          name: 'iPad Pro 12.9-inch',
          brand: 'Apple',
          price: 999.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop'
        }
      ],
      shippingAddress: '123 Main St, New York, NY 10001',
      cancelReason: 'Customer request'
    }
  ]);

  const getStatusConfig = (status) => {
    const configs = {
      delivered: {
        color: 'text-green-600 bg-green-50 border-green-200',
        icon: CheckCircle,
        label: 'Delivered'
      },
      shipped: {
        color: 'text-blue-600 bg-blue-50 border-blue-200',
        icon: Truck,
        label: 'Shipped'
      },
      processing: {
        color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
        icon: Clock,
        label: 'Processing'
      },
      cancelled: {
        color: 'text-red-600 bg-red-50 border-red-200',
        icon: XCircle,
        label: 'Cancelled'
      }
    };
    return configs[status] || configs.processing;
  };

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter;
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items_detail.some(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    let matchesTime = true;
    if (timeFilter !== 'all') {
      const orderDate = new Date(order.date);
      const now = new Date();
      const diffTime = Math.abs(now - orderDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      switch (timeFilter) {
        case '30days':
          matchesTime = diffDays <= 30;
          break;
        case '6months':
          matchesTime = diffDays <= 180;
          break;
        case '1year':
          matchesTime = diffDays <= 365;
          break;
      }
    }

    return matchesFilter && matchesSearch && matchesTime;
  });

  const totalSpent = orders.reduce((sum, order) => 
    order.status !== 'cancelled' ? sum + order.total : sum, 0
  );

  const orderStats = {
    total: orders.length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    processing: orders.filter(o => o.status === 'processing').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
         <div className="mb-3 text-center">
        <div className="inline-flex items-center px-6 py-3 mb-4 text-sm font-bold tracking-wider text-teal-700 uppercase transition-all duration-300 bg-gradient-to-r from-teal-100 to-teal-200 rounded-full shadow-lg hover:shadow-xl hover:scale-105">
          <Package className="w-4 h-4 mr-2" />
          My Orders
        </div>
      </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold">{orderStats.total}</p>
              </div>
              <ShoppingBag className="w-12 h-12 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Delivered</p>
                <p className="text-3xl font-bold">{orderStats.delivered}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium">Processing</p>
                <p className="text-3xl font-bold">{orderStats.processing}</p>
              </div>
              <Clock className="w-12 h-12 text-yellow-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Spent</p>
                <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
              </div>
              <CreditCard className="w-12 h-12 text-purple-200" />
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-center lg:justify-between">
            
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders or products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Status Filters */}
            <div className="flex justify-center items-center gap-3 flex-wrap">
              {['all', 'delivered', 'shipped', 'processing', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                    filter === status
                      ? 'bg-primary text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl shadow-xl">
              <div className="relative mb-8">
                <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full inline-block shadow-inner">
                  <Package className="w-20 h-20 text-gray-300" />
                </div>
                <div className="absolute -top-2 -right-2 p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-4">No orders found</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Try adjusting your search or filter criteria, or start shopping to see your orders here!
              </p>
              <button className="px-8 py-4 bg-gradient-to-r from-primary to-pink-600 text-white font-semibold rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                Start Shopping
              </button>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100 group"
                >
                  {/* Order Header */}
                  <div className="bg-gradient-to-r from-gray-50 to-white p-8 border-b border-gray-100">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <div className="p-4 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl">
                            <Package className="w-8 h-8 text-primary" />
                          </div>
                          {order.status === 'delivered' && (
                            <div className="absolute -top-2 -right-2 p-1 bg-green-500 rounded-full">
                              <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{order.id}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {new Date(order.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                            <div className="flex items-center gap-2">
                              <ShoppingBag className="w-4 h-4" />
                              {order.items} {order.items === 1 ? 'item' : 'items'}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border-2 font-semibold ${statusConfig.color}`}>
                          <StatusIcon className="w-5 h-5" />
                          {statusConfig.label}
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-8">
                    <div className="grid gap-6">
                      {order.items_detail.map((item, index) => (
                        <div key={item.id} className="flex items-center gap-6 p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-xl border-2 border-gray-200 shadow-md"
                          />
                          <div className="flex-1">
                            <p className="text-sm text-gray-500 font-medium mb-1">{item.brand}</p>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h4>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Quantity: {item.quantity}</span>
                              <span className="text-xl font-bold text-primary">${item.price.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}