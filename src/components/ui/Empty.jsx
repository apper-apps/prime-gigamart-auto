import React from "react";
import { Link } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No products found",
  message = "Try adjusting your search or browse our categories to discover amazing products.",
  actionText = "Browse All Products",
  actionHref = "/products",
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}>
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="ShoppingBag" className="h-10 w-10 text-slate-400" />
        </div>
        
        <h3 className="text-xl font-semibold text-slate-900 mb-3">
          {title}
        </h3>
        
        <p className="text-slate-600 mb-8 leading-relaxed">
          {message}
        </p>
        
        <Button size="lg" className="inline-flex items-center">
          <Link to={actionHref}>
            <ApperIcon name="Search" className="h-5 w-5 mr-2" />
            {actionText}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Empty;