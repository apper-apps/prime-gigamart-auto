import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Card from "@/components/atoms/Card";
import PaymentForm from "@/components/organisms/PaymentForm";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { useCart } from "@/hooks/useCart";
import { OrderService } from "@/services/api/OrderService";
import { formatCurrency } from "@/utils/formatters";
import { validateEmail, validatePhone } from "@/utils/validation";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });
  const [errors, setErrors] = useState({});

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Empty
            title="Your cart is empty"
            message="You need items in your cart to proceed with checkout."
            actionText="Start Shopping"
            actionHref="/products"
          />
        </div>
      </div>
    );
  }

  const steps = [
    { id: 1, name: "Shipping", icon: "Truck" },
    { id: 2, name: "Payment", icon: "CreditCard" },
    { id: 3, name: "Review", icon: "CheckCircle" },
  ];

  const handleInputChange = (field, value) => {
    setShippingData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateShippingData = () => {
    const newErrors = {};

    if (!shippingData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!shippingData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!shippingData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(shippingData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!shippingData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(shippingData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!shippingData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!shippingData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!shippingData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!shippingData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateShippingData()) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handlePayment = async (paymentData) => {
    try {
      setLoading(true);

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create order
      const orderData = {
        items: items,
        shipping: shippingData,
        payment: paymentData,
        total: total,
        subtotal: subtotal,
        tax: tax,
        shippingCost: shipping,
        status: "confirmed"
      };

      const order = await OrderService.create(orderData);
      
      if (order) {
        // Clear cart
        clearCart();
        
        toast.success("Order placed successfully!");
        navigate(`/order-confirmation/${order.Id}`);
      } else {
        toast.error("Failed to create order. Please try again.");
      }
      
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold font-display text-slate-900 mb-4">
            Checkout
          </h1>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-8 mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                  currentStep >= step.id
                    ? "bg-primary-600 border-primary-600 text-white"
                    : "border-slate-300 text-slate-400"
                }`}>
                  {currentStep > step.id ? (
                    <ApperIcon name="Check" className="h-5 w-5" />
                  ) : (
                    <ApperIcon name={step.icon} className="h-5 w-5" />
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.id ? "text-primary-600" : "text-slate-400"
                }`}>
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? "bg-primary-600" : "bg-slate-300"
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                    <ApperIcon name="Truck" className="h-5 w-5 mr-2" />
                    Shipping Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Input
                      label="First Name"
                      value={shippingData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      error={errors.firstName}
                      required
                    />
                    <Input
                      label="Last Name"
                      value={shippingData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      error={errors.lastName}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Input
                      label="Email"
                      type="email"
                      value={shippingData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      error={errors.email}
                      required
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      value={shippingData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      error={errors.phone}
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <Input
                      label="Address"
                      value={shippingData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      error={errors.address}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Input
                      label="City"
                      value={shippingData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      error={errors.city}
                      required
                    />
                    <Input
                      label="State"
                      value={shippingData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      error={errors.state}
                      required
                    />
                    <Input
                      label="ZIP Code"
                      value={shippingData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      error={errors.zipCode}
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <Select
                      label="Country"
                      value={shippingData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      required
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                    </Select>
                  </div>

                  <Button onClick={handleNextStep} size="lg" className="w-full">
                    Continue to Payment
                    <ApperIcon name="ArrowRight" className="h-5 w-5 ml-2" />
                  </Button>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <PaymentForm onSubmit={handlePayment} loading={loading} total={total} />
                
                <div className="mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="w-full"
                  >
                    <ApperIcon name="ArrowLeft" className="h-5 w-5 mr-2" />
                    Back to Shipping
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Order Summary
              </h3>

              {/* Order Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.productId} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-900 truncate text-sm">
                        {item.name}
                      </h4>
                      <p className="text-sm text-slate-600">
                        Qty: {item.quantity} × {formatCurrency(item.price)}
                      </p>
                    </div>
                    <span className="font-medium text-slate-900 text-sm">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t border-slate-200 pt-4">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
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
                
                <div className="flex justify-between text-lg font-semibold text-slate-900 border-t border-slate-200 pt-3">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Shield" className="h-4 w-4 text-emerald-500" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Lock" className="h-4 w-4 text-emerald-500" />
                    <span>Encrypted</span>
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
export default Checkout;