import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const CategoryCard = ({ category }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/products/${category.slug}`}>
        <Card hover className="group">
          <div className="relative overflow-hidden rounded-t-lg">
            <div 
              className="h-32 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center group-hover:from-primary-500 group-hover:to-primary-700 transition-all duration-300"
            >
              <ApperIcon 
                name={category.icon} 
                className="h-12 w-12 text-white group-hover:scale-110 transition-transform duration-300" 
              />
            </div>
          </div>
          
          <div className="p-4 text-center">
            <h3 className="font-semibold text-slate-900 group-hover:text-primary-600 transition-colors duration-200">
              {category.Name || category.name}
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              {category.productCount} products
            </p>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;