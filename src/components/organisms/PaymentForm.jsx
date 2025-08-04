import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { 
  validateCreditCard, 
  validateCVV, 
  validateExpiryDate,
  formatCreditCardNumber,
  formatExpiryDate 
} from "@/utils/validation";

const PaymentForm = ({ onSubmit, loading, total }) => {
  const [paymentData, setPaymentData] = useState({
    method: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    let formattedValue = value;
    
    if (field === "cardNumber") {
      formattedValue = formatCreditCardNumber(value);
    } else if (field === "expiryDate") {
      formattedValue = formatExpiryDate(value);
    }
    
    setPaymentData(prev => ({ ...prev, [field]: formattedValue }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (paymentData.method === "card") {
      if (!paymentData.cardholderName.trim()) {
        newErrors.cardholderName = "Cardholder name is required";
      }

      if (!paymentData.cardNumber.trim()) {
        newErrors.cardNumber = "Card number is required";
      } else if (!validateCreditCard(paymentData.cardNumber)) {
        newErrors.cardNumber = "Invalid card number";
      }

      if (!paymentData.expiryDate.trim()) {
        newErrors.expiryDate = "Expiry date is required";
      } else if (!validateExpiryDate(paymentData.expiryDate)) {
        newErrors.expiryDate = "Invalid expiry date";
      }

      if (!paymentData.cvv.trim()) {
        newErrors.cvv = "CVV is required";
      } else if (!validateCVV(paymentData.cvv)) {
        newErrors.cvv = "Invalid CVV";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(paymentData);
    }
  };

  const getCardType = (cardNumber) => {
    const number = cardNumber.replace(/\s/g, "");
    if (number.startsWith("4")) return "visa";
    if (number.startsWith("5") || number.startsWith("2")) return "mastercard";
    if (number.startsWith("3")) return "amex";
    return "card";
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center">
        <ApperIcon name="CreditCard" className="h-5 w-5 mr-2" />
        Payment Information
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Method Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Payment Method
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleInputChange("method", "card")}
              className={`p-4 border-2 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 ${
                paymentData.method === "card"
                  ? "border-primary-500 bg-primary-50 text-primary-700"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <ApperIcon name="CreditCard" className="h-5 w-5" />
              <span>Credit Card</span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleInputChange("method", "paypal")}
              className={`p-4 border-2 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 ${
                paymentData.method === "paypal"
                  ? "border-primary-500 bg-primary-50 text-primary-700"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <ApperIcon name="Wallet" className="h-5 w-5" />
              <span>PayPal</span>
            </motion.button>
          </div>
        </div>

        {/* Credit Card Form */}
        {paymentData.method === "card" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <Input
              label="Cardholder Name"
              value={paymentData.cardholderName}
              onChange={(e) => handleInputChange("cardholderName", e.target.value)}
              error={errors.cardholderName}
              required
              placeholder="John Doe"
            />

            <div className="relative">
              <Input
                label="Card Number"
                value={paymentData.cardNumber}
                onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                error={errors.cardNumber}
                required
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
              <div className="absolute right-3 top-[2.2rem] flex items-center">
                <ApperIcon 
                  name="CreditCard" 
                  className={`h-5 w-5 ${
                    getCardType(paymentData.cardNumber) === "visa" ? "text-blue-600" :
                    getCardType(paymentData.cardNumber) === "mastercard" ? "text-red-600" :
                    "text-slate-400"
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry Date"
                value={paymentData.expiryDate}
                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                error={errors.expiryDate}
                required
                placeholder="MM/YY"
                maxLength={5}
              />

              <Input
                label="CVV"
                value={paymentData.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value)}
                error={errors.cvv}
                required
                placeholder="123"
                maxLength={4}
              />
            </div>
          </motion.div>
        )}

        {/* PayPal Notice */}
        {paymentData.method === "paypal" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4"
          >
            <div className="flex items-start space-x-3">
              <ApperIcon name="Info" className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">PayPal Payment</h4>
                <p className="text-sm text-blue-700 mt-1">
                  You will be redirected to PayPal to complete your payment securely.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Order Summary */}
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-slate-900">Total Amount:</span>
            <span className="text-2xl font-bold text-primary-600">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          loading={loading}
          className="w-full"
        >
          <ApperIcon name="Lock" className="h-5 w-5 mr-2" />
          {paymentData.method === "card" ? "Pay Securely" : "Continue with PayPal"}
        </Button>

        {/* Security Notice */}
        <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
          <div className="flex items-center space-x-1">
            <ApperIcon name="Shield" className="h-4 w-4 text-emerald-500" />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center space-x-1">
            <ApperIcon name="Lock" className="h-4 w-4 text-emerald-500" />
            <span>Encrypted</span>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default PaymentForm;