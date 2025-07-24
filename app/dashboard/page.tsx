"use client";

import { useState, useEffect } from "react";

interface PersonalInfo {
  name: string;
  email: string;
  role: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  image_url: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

interface Comment {
  id: string;
  content: string;
  product: string;
  date: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("personal");
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Owner"
  });

  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      title: "Premium Headphones",
      description: "High-quality wireless headphones with noise cancellation",
      image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      quantity: 25,
      created_at: "2024-01-15",
      updated_at: "2024-03-10"
    },
    {
      id: "2", 
      title: "Smart Watch",
      description: "Feature-rich smartwatch with health monitoring",
      image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
      quantity: 12,
      created_at: "2024-02-01",
      updated_at: "2024-03-15"
    }
  ]);

  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      content: "Great product! The sound quality is amazing and the battery life exceeds expectations.",
      product: "Premium Headphones",
      date: "2024-03-18"
    },
    {
      id: "2",
      content: "Very satisfied with this purchase. The health tracking features are accurate and useful.",
      product: "Smart Watch", 
      date: "2024-03-20"
    }
  ]);

  const toggleEditPersonal = () => {
    setEditingPersonal(!editingPersonal);
  };

  const deleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const deleteComment = (commentId: string) => {
    setComments(comments.filter(c => c.id !== commentId));
  };

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex h-screen w-screen bg-white font-['Inter']">
      {/* Sidebar */}
      <div className="w-64 h-full bg-slate-50 border-r border-slate-200 flex-shrink-0">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6 text-white">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Dashboard</h2>
              <p className="text-sm text-slate-500">Welcome back!</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab("personal")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === "personal" 
                    ? "bg-indigo-600 text-white" 
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                </svg>
                <span className="font-medium">Personal Info</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("products")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === "products"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd"/>
                </svg>
                <span className="font-medium">My Products</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("comments")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === "comments"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                </svg>
                <span className="font-medium">My Comments</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-800">User Dashboard</h1>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">SJ</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {/* Personal Info Tab */}
          {activeTab === "personal" && (
            <div className="max-w-4xl">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">Personal Information</h2>
                  <button
                    onClick={toggleEditPersonal}
                    className={`px-4 py-2 text-white rounded-lg font-medium transition-colors ${
                      editingPersonal
                        ? "bg-emerald-500 hover:bg-emerald-600"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                  >
                    {editingPersonal ? "Save Changes" : "Edit Profile"}
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    {!editingPersonal ? (
                      <p className="text-slate-800 font-medium">{personalInfo.name}</p>
                    ) : (
                      <input
                        type="text"
                        value={personalInfo.name}
                        onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    {!editingPersonal ? (
                      <p className="text-slate-800 font-medium">{personalInfo.email}</p>
                    ) : (
                      <input
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    {!editingPersonal ? (
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                        personalInfo.role === "Owner" 
                          ? "bg-emerald-500 text-white" 
                          : "bg-gray-500 text-white"
                      }`}>
                        {personalInfo.role}
                      </span>
                    ) : (
                      <select
                        value={personalInfo.role}
                        onChange={(e) => handlePersonalInfoChange("role", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="Owner">Owner</option>
                        <option value="Normal User">Normal User</option>
                      </select>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="max-w-6xl">
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200">
                  <h2 className="text-xl font-semibold text-slate-800">My Products</h2>
                  <p className="text-slate-500 mt-1">Manage your product listings</p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Created</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Updated</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-4">
                              <img 
                                src={product.image_url} 
                                alt={product.title}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div className="min-w-0 flex-1">
                                <h3 className="text-sm font-medium text-slate-800 truncate">
                                  {product.title}
                                </h3>
                                <div className="text-xs text-slate-500 mt-1">
                                  <span>Qty: {product.quantity}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {product.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {product.created_at}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {product.updated_at}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button className="text-indigo-600 font-medium">Edit</button>
                              <button 
                                onClick={() => deleteProduct(product.id)}
                                className="text-red-600 font-medium"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Comments Tab */}
          {activeTab === "comments" && (
            <div className="max-w-4xl">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">My Comments</h2>
                  <p className="text-slate-500 mt-1">Your recent product reviews and feedback</p>
                </div>
                
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-800 mb-2">{comment.content}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span>
                              <span>Product: </span>
                              <span className="font-medium">{comment.product}</span>
                            </span>
                            <span>{comment.date}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => deleteComment(comment.id)}
                          className="text-red-600 p-1 flex-shrink-0"
                        >
                          <svg fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4">
                            <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd"/>
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
