'use client'
import React from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { Minus, Plus, PlusCircle, ShoppingCart } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { addToCart, decreaseQuantity, increaseQuantity } from '@/redux/cartSlice'

interface IGrocery {
    _id: string,
    name: string,
    category: string,
    price: string,
    unit: string,
    image: string,
    createdAt: Date,
    updatedAp: Date
}

function GroceryItemCard({ item }: { item: IGrocery }) {
    const dispatch = useDispatch<AppDispatch>()
    const { cartData } = useSelector((state: RootState) => state.cart)
    const cartItem = cartData.find(i => i._id.toString() == item._id)
    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, amount: 0.3 }}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm hover:shadow-xl
               transition-all overflow-hidden border border-blue-100 dark:border-slate-700 flex flex-col"
        >

            {/* Image */}
            <div className="relative w-full aspect-[4/3] bg-blue-50 dark:bg-slate-800 overflow-hidden group">
                <Image
                    src={item.image}
                    fill
                    alt={item.name}
                    sizes="(max-width:768px) 100vw, 25vw"
                    className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent
                        opacity-0 group-hover:opacity-100 transition" />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">

                <p className="text-xs text-blue-500 font-medium mb-1">
                    {item.category}
                </p>

                <h3 className="font-semibold text-gray-800 dark:text-white leading-tight">
                    {item.name}
                </h3>

                <div className="flex items-center justify-between mt-3">

                    <span className="text-xs font-medium text-blue-600 bg-blue-50 dark:bg-slate-800
                             px-2 py-1 rounded-full">
                        {item.unit}
                    </span>

                    <span className="text-blue-700 dark:text-blue-400 font-bold text-lg">
                        ₹{item.price}
                    </span>

                </div>

                {!cartItem ? (

                    <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))}
                        className="mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700
                           text-white rounded-full py-2 text-sm font-medium transition"
                    >
                        <ShoppingCart size={16} />
                        Add to Cart
                    </motion.button>

                ) : (

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 flex items-center justify-center bg-blue-50 dark:bg-slate-800
                           border border-blue-200 dark:border-slate-700 rounded-full py-2 px-4 gap-4"
                    >

                        <button
                            onClick={() => dispatch(decreaseQuantity(item._id))}
                            className="w-7 h-7 flex items-center justify-center rounded-full
                               bg-blue-100 dark:bg-slate-700 hover:bg-blue-200 transition"
                        >
                            <Minus size={14} className="text-blue-700 dark:text-blue-400" />
                        </button>

                        <span className="text-sm font-semibold text-gray-800 dark:text-white">
                            {cartItem.quantity}
                        </span>

                        <button
                            onClick={() => dispatch(increaseQuantity(item._id))}
                            className="w-7 h-7 flex items-center justify-center rounded-full
                               bg-blue-100 dark:bg-slate-700 hover:bg-blue-200 transition"
                        >
                            <Plus size={14} className="text-blue-700 dark:text-blue-400" />
                        </button>

                    </motion.div>

                )}

            </div>

        </motion.div>

    )
}

export default GroceryItemCard