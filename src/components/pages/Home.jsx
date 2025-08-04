import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/organisms/HeroSection";
import FeaturedCategories from "@/components/organisms/FeaturedCategories";
import ProductGrid from "@/components/organisms/ProductGrid";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { Link } from "react-router-dom";
import { ProductService } from "@/services/api/ProductService";
import { CategoryService } from "@/services/api/CategoryService";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [productsData, categoriesData] = await Promise.all([
        ProductService.getFeatured(),
        CategoryService.getAll()
      ]);
      
      setFeaturedProducts(productsData.slice(0, 8));
      setCategories(categoriesData);
    } catch (err) {
      setError("Failed to load data. Please try again.");
      console.error("Error loading home data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Categories */}
      <FeaturedCategories categories={categories} />

      {/* Featured Products */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <Badge variant="accent" size="md" className="mb-4">
                <ApperIcon name="Star" className="h-4 w-4 mr-1" />
                Featured Products
              </Badge>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-slate-900 mb-4">
              Trending Now
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover our most popular products, handpicked for their quality and value
            </p>
          </motion.div>

          <ProductGrid 
            products={featuredProducts}
            loading={loading}
            error={error}
            onRetry={loadData}
          />

          {!loading && !error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mt-12"
            >
              <Button size="lg" variant="outline">
                <Link to="/products" className="flex items-center">
                  View All Products
                  <ApperIcon name="ArrowRight" className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold font-display text-slate-900 mb-4">
              Why Choose Gigamart?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We're committed to providing you with the best shopping experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "Truck",
                title: "Free Shipping",
                description: "Free delivery on orders over $50",
                color: "bg-amber-100 text-amber-600"
              },
              {
                icon: "Shield",
                title: "Secure Payments",
                description: "SSL encrypted secure checkout",
                color: "bg-emerald-100 text-emerald-600"
              },
              {
                icon: "RotateCcw",
                title: "Easy Returns",
                description: "30-day hassle-free returns",
                color: "bg-blue-100 text-blue-600"
              },
              {
                icon: "Headphones",
                title: "24/7 Support",
                description: "Round-the-clock customer service",
                color: "bg-purple-100 text-purple-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <ApperIcon name={feature.icon} className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;