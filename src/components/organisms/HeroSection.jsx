import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-amber-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary-300 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-amber-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/2 w-36 h-36 bg-primary-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium"
              >
                <ApperIcon name="Zap" className="h-4 w-4" />
                Limited Time Offer
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl lg:text-6xl font-bold font-display"
              >
                <span className="text-slate-900">Discover Amazing</span>
                <br />
                <span className="bg-gradient-to-r from-primary-600 to-amber-500 bg-clip-text text-transparent">
                  Products
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-slate-600 leading-relaxed max-w-lg"
              >
                Shop from thousands of premium products with fast delivery, 
                secure payments, and unbeatable prices.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="group">
                <Link to="/products" className="flex items-center">
                  <ApperIcon name="ShoppingBag" className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-200" />
                  Shop Now
                </Link>
              </Button>
              
              <Button variant="outline" size="lg">
                <Link to="/products?featured=true" className="flex items-center">
                  <ApperIcon name="Star" className="h-5 w-5 mr-2" />
                  Featured Deals
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-8 pt-8 border-t border-slate-200"
            >
              <div>
                <div className="text-2xl font-bold text-slate-900">10K+</div>
                <div className="text-sm text-slate-600">Products</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">50K+</div>
                <div className="text-sm text-slate-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">4.9★</div>
                <div className="text-sm text-slate-600">Rating</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Product Showcase */}
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-1 transition-transform duration-500">
                <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
                  <ApperIcon name="ShoppingBag" className="h-24 w-24 text-primary-400" />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-3 bg-slate-100 rounded w-2/3"></div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="h-6 bg-primary-200 rounded w-20"></div>
                    <div className="w-8 h-8 bg-amber-200 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 bg-amber-400 rounded-xl p-3 shadow-lg"
              >
                <ApperIcon name="Star" className="h-6 w-6 text-white" />
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 bg-primary-500 rounded-xl p-3 shadow-lg"
              >
                <ApperIcon name="Heart" className="h-6 w-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;