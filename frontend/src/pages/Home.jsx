import { useState } from 'react'
import { Search as SearchIcon, ShoppingCart as CartIcon, Plus as PlusIcon, ChevronRight as RightIcon, Package as BoxIcon, TrendingUp as UpIcon, Droplets as DropIcon, UtensilsCrossed as ForkIcon, Pizza as PizzaIcon, Coffee as CoffeeIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import useCart from '../hooks/useCart'

const categories = [
  { name: 'Grocery', icon: <BoxIcon size={20} /> },
  { name: 'Oil & Ghee', icon: <DropIcon size={20} /> },
  { name: 'Masala', icon: <ForkIcon size={20} /> },
  { name: 'Snacks', icon: <PizzaIcon size={20} /> },
  { name: 'Drinks', icon: <CoffeeIcon size={20} /> }
]

const products = [
  { 
    id: '1', 
    category: 'Grocery', 
    name: 'Sharbati Atta 10kg', 
    price: 540, 
    originalPrice: 600, 
    discount: '10% OFF',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=300'
  },
  { 
    id: '2', 
    category: 'Grocery', 
    name: 'Basmati Rice 25kg', 
    price: 2340, 
    originalPrice: 2600, 
    discount: 'SAVE ₹260',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=300'
  },
  { 
    id: '3', 
    category: 'Oil & Ghee', 
    name: 'Sunflower Oil 1L', 
    price: 168, 
    originalPrice: 190, 
    discount: 'BEST',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=300'
  },
  { 
    id: '4', 
    category: 'Oil & Ghee', 
    name: 'Refined Oil 5L', 
    price: 810, 
    originalPrice: 900, 
    discount: 'BULK',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=300'
  },
]

function Home() {
  const { addToCart, totalItems } = useCart()
  const [addedId, setAddedId] = useState(null)

  const handleAdd = (product) => {
    addToCart(product)
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 1000)
  }

  return (
    <div className="px-4 pt-2 bg-[#F8FAFC]">
      {/* COMPACT HEADER */}
      <header className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-black text-[#0F172A] tracking-tight">Umeed</h1>
          <p className="text-[11px] text-slate-400 font-medium">Retailer Portal</p>
        </div>
        <Link to="/retailer/cart" className="relative h-10 w-10 grid place-items-center bg-white rounded-xl shadow-sm border border-slate-100 transition-all active:scale-90">
          <CartIcon size={18} className="text-[#0F172A]" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-black text-white text-[9px] font-bold grid place-items-center rounded-full ring-2 ring-white">
              {totalItems}
            </span>
          )}
        </Link>
      </header>

      {/* COMPACT SEARCH */}
      <div className="relative mb-5">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input 
          type="text" 
          placeholder="Search items..." 
          className="w-full h-11 pl-10 pr-4 bg-white rounded-xl border border-slate-100 shadow-sm outline-none focus:border-black text-xs transition-all"
        />
      </div>

      {/* COMPACT BANNER */}
      <section className="relative overflow-hidden bg-black text-white p-5 rounded-2xl mb-6 shadow-lg shadow-black/10">
        <div className="relative z-10 pr-20">
          <h2 className="text-lg font-bold mb-0.5 leading-tight">Restock Deal</h2>
          <p className="text-gray-400 text-[10px] mb-4 opacity-90 leading-tight">Save 15% on bulk orders this week.</p>
          <button className="bg-white text-black px-4 py-1.5 rounded-lg text-[10px] font-bold shadow-md active:scale-95 transition-transform uppercase">
            View
          </button>
        </div>
        <UpIcon className="absolute -right-4 -top-4 text-white/5 w-32 h-32 -rotate-12" />
      </section>

      {/* CATEGORIES */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-[#0F172A]">Categories</h3>
          <button className="text-black text-[10px] font-bold flex items-center gap-1">
            See all <RightIcon size={12} />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <div key={cat.name} className="flex flex-col items-center gap-2 shrink-0">
              <div className="h-14 w-14 bg-white rounded-xl shadow-sm border border-slate-50 grid place-items-center text-black active:scale-95 transition-transform">
                {cat.icon}
              </div>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* COMPACT PRODUCTS */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-[#0F172A]">Popular Items</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 pb-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl p-2 shadow-sm border border-slate-50 flex flex-col hover:shadow-md transition-all duration-200 group">
              <div className="relative h-28 w-full bg-slate-50 rounded-lg overflow-hidden mb-2">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-black/70 backdrop-blur-md rounded-md text-white text-[7px] font-black uppercase tracking-tighter">
                  {product.discount}
                </div>
              </div>

              <div className="flex flex-col flex-1 px-1">
                <h4 className="text-[10px] font-bold text-[#0F172A] mb-1 line-clamp-2 leading-tight h-6">
                  {product.name}
                </h4>
                
                <div className="mt-auto pt-1 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-black block">₹{product.price}</span>
                    <span className="text-[9px] text-slate-400 line-through">₹{product.originalPrice}</span>
                  </div>
                  
                  <button 
                    onClick={() => handleAdd(product)}
                    className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all active:scale-90 ${
                      addedId === product.id 
                      ? 'bg-slate-100 text-black border border-slate-200' 
                      : 'bg-black text-white'
                    }`}
                  >
                    {addedId === product.id ? 'Added' : 'Add'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home