import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import QuantitySelector from "@/components/molecules/QuantitySelector";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/utils/formatters";

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  const total = getCartTotal();
  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08;
  const finalTotal = total + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Empty
            title="Your cart is empty"
            message="Looks like you haven't added any products to your cart yet. Start shopping to fill it up!"
            actionText="Start Shopping"
            actionHref="/products"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold font-display text-slate-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-slate-600">
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">
                        <Link 
                          to={`/product/${item.productId}`}
                          className="hover:text-primary-600 transition-colors duration-200"
                        >
                          {item.name}
                        </Link>
                      </h3>
                      
                      <p className="text-slate-600 mb-4">
                        {formatCurrency(item.price)} each
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <QuantitySelector
                          quantity={item.quantity}
                          onQuantityChange={(newQuantity) => 
                            updateQuantity(item.productId, newQuantity)
                          }
                          size="sm"
                        />

                        <div className="text-right">
                          <div className="text-lg font-semibold text-slate-900">
                            {formatCurrency(item.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.productId)}
                      className="text-slate-400 hover:text-red-600 p-2"
                    >
                      <ApperIcon name="Trash2" className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}

            {/* Clear Cart */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center pt-4"
            >
              <Button
                variant="ghost"
                onClick={clearCart}
                className="text-red-600 hover:text-red-700"
              >
                <ApperIcon name="Trash2" className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({items.length} items)</span>
                  <span>{formatCurrency(total)}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-emerald-600 font-medium">FREE</span>
                    ) : (
                      formatCurrency(shipping)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Tax</span>
                  <span>{formatCurrency(tax)}</span>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-slate-900">
                    <span>Total</span>
                    <span>{formatCurrency(finalTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Free Shipping Notice */}
              {shipping > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
                  <div className="flex items-start gap-2">
                    <ApperIcon name="Truck" className="h-4 w-4 text-amber-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-amber-800 font-medium">
                        Add {formatCurrency(50 - total)} more for FREE shipping!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Checkout Button */}
              <Button
                size="lg"
                className="w-full mb-4"
                onClick={() => navigate("/checkout")}
              >
                <ApperIcon name="CreditCard" className="h-5 w-5 mr-2" />
                Proceed to Checkout
              </Button>

              {/* Continue Shopping */}
              <Button
                variant="outline"
                size="lg"
                className="w-full"
              >
                <Link to="/products" className="flex items-center w-full justify-center">
                  <ApperIcon name="ArrowLeft" className="h-5 w-5 mr-2" />
                  Continue Shopping
                </Link>
              </Button>

              {/* Security Notice */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Shield" className="h-4 w-4 text-emerald-500" />
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Lock" className="h-4 w-4 text-emerald-500" />
                    <span>SSL Encrypted</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;