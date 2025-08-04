import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/utils/formatters";

const CartDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { items, getCartItemCount, getCartTotal, updateQuantity, removeFromCart } = useCart();

  const itemCount = getCartItemCount();
  const total = getCartTotal();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-slate-100"
      >
        <ApperIcon name="ShoppingCart" className="h-6 w-6" />
        {itemCount > 0 && (
          <Badge 
            variant="error" 
            size="xs" 
            className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 flex items-center justify-center text-white animate-cart-shake"
          >
            {itemCount}
          </Badge>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900">
                Shopping Cart ({itemCount})
              </h3>
            </div>

            {items.length === 0 ? (
              <div className="p-8 text-center">
                <ApperIcon name="ShoppingCart" className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 mb-4">Your cart is empty</p>
                <Button onClick={() => setIsOpen(false)} size="sm">
                  <Link to="/products">Start Shopping</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.productId} className="p-4 border-b border-slate-100 hover:bg-slate-50">
                      <div className="flex items-start gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-slate-900 truncate">
                            {item.name}
                          </h4>
                          <p className="text-sm text-slate-600">
                            {formatCurrency(item.price)}
                          </p>
                          
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="h-6 w-6 p-0"
                            >
                              <ApperIcon name="Minus" className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium px-2">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="h-6 w-6 p-0"
                            >
                              <ApperIcon name="Plus" className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.productId)}
                          className="h-6 w-6 p-0 text-slate-400 hover:text-red-600"
                        >
                          <ApperIcon name="X" className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-slate-50 border-t">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-slate-900">Total:</span>
                    <span className="font-bold text-lg text-primary-600">
                      {formatCurrency(total)}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-1"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link to="/cart" className="w-full text-center">
                        View Cart
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link to="/checkout" className="w-full text-center">
                        Checkout
                      </Link>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartDropdown;