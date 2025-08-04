import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { OrderService } from "@/services/api/OrderService";
import { formatCurrency } from "@/utils/formatters";
import { format } from "date-fns";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      setError("");
      
      const orderData = await OrderService.getById(orderId);
      if (!orderData) {
        setError("Order not found");
        return;
      }
      
      setOrder(orderData);
    } catch (err) {
      setError("Failed to load order details. Please try again.");
      console.error("Error loading order:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Loading />
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error message={error || "Order not found"} onRetry={loadOrder} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="CheckCircle" className="h-10 w-10 text-emerald-600" />
          </div>
          
          <h1 className="text-3xl font-bold font-display text-slate-900 mb-2">
            Order Confirmed!
          </h1>
          
          <p className="text-lg text-slate-600 mb-4">
            Thank you for your purchase. Your order has been confirmed and is being processed.
          </p>
          
          <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <ApperIcon name="Mail" className="h-4 w-4" />
              <span>Confirmation email sent</span>
            </div>
            <div className="flex items-center gap-1">
              <ApperIcon name="Clock" className="h-4 w-4" />
              <span>Processing within 24 hours</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                  Order Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-slate-900 mb-2">Order Details</h3>
                    <div className="space-y-1 text-sm text-slate-600">
                      <p><span className="font-medium">Order ID:</span> {order.Id}</p>
                      <p><span className="font-medium">Date:</span> {format(new Date(order.createdAt), "MMM d, yyyy 'at' h:mm a")}</p>
                      <p><span className="font-medium">Status:</span> 
                        <Badge variant="success" size="sm" className="ml-2">
                          {order.status}
                        </Badge>
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-slate-900 mb-2">Shipping Address</h3>
                    <div className="text-sm text-slate-600">
                      <p>{order.shipping.firstName} {order.shipping.lastName}</p>
                      <p>{order.shipping.address}</p>
                      <p>{order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}</p>
                      <p>{order.shipping.country}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Order Items */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                  Order Items ({order.items.length})
                </h2>
                
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-900 mb-1">
                          {item.name}
                        </h4>
                        <p className="text-sm text-slate-600">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm text-slate-600">
                          {formatCurrency(item.price)} each
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-semibold text-slate-900">
                          {formatCurrency(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Tracking Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                  <ApperIcon name="Truck" className="h-5 w-5 mr-2" />
                  Shipping & Tracking
                </h2>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <ApperIcon name="Info" className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">
                        Tracking Information
                      </h4>
                      <p className="text-sm text-blue-700 mb-2">
                        You'll receive a tracking number via email once your order ships. 
                        Orders typically ship within 1-2 business days.
                      </p>
                      <p className="text-sm text-blue-700">
                        <strong>Estimated Delivery:</strong> 3-5 business days
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
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
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Order Total
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(order.subtotal)}</span>
                </div>
                
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span>
                    {order.shippingCost === 0 ? (
                      <span className="text-emerald-600 font-medium">FREE</span>
                    ) : (
                      formatCurrency(order.shippingCost)
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between text-slate-600">
                  <span>Tax</span>
                  <span>{formatCurrency(order.tax)}</span>
                </div>
                
                <div className="border-t border-slate-200 pt-3">
                  <div className="flex justify-between text-xl font-bold text-slate-900">
                    <span>Total</span>
                    <span>{formatCurrency(order.total)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                <h4 className="font-medium text-slate-900 mb-2 flex items-center">
                  <ApperIcon name="CreditCard" className="h-4 w-4 mr-2" />
                  Payment Method
                </h4>
                <p className="text-sm text-slate-600 capitalize">
                  {order.payment.method === "card" ? "Credit Card" : order.payment.method}
                </p>
                {order.payment.method === "card" && order.payment.cardNumber && (
                  <p className="text-sm text-slate-600">
                    •••• •••• •••• {order.payment.cardNumber.slice(-4)}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button size="lg" className="w-full">
                  <Link to="/products" className="flex items-center w-full justify-center">
                    <ApperIcon name="ShoppingBag" className="h-5 w-5 mr-2" />
                    Continue Shopping
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg" className="w-full">
                  <ApperIcon name="Download" className="h-5 w-5 mr-2" />
                  Download Receipt
                </Button>
              </div>

              {/* Support */}
              <div className="mt-6 pt-6 border-t border-slate-200 text-center">
                <p className="text-sm text-slate-600 mb-2">
                  Need help with your order?
                </p>
                <Button variant="ghost" size="sm">
                  <ApperIcon name="Headphones" className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;