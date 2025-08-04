import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/utils/formatters";

const ProductCard = ({ product }) => {
  const { addToCart, getCartItem } = useCart();
  const cartItem = getCartItem(product.Id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const discountPercentage = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/product/${product.Id}`}>
        <Card hover className="group overflow-hidden h-full">
          <div className="relative overflow-hidden">
            <img
              src={product.images && product.images.length > 0 ? product.images[0] : ''}
              alt={product.Name || product.name}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.featured && (
                <Badge variant="accent" size="sm">
                  <ApperIcon name="Star" className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
              
              {discountPercentage > 0 && (
                <Badge variant="error" size="sm">
                  -{discountPercentage}%
                </Badge>
              )}
              
              {product.stock <= 5 && product.stock > 0 && (
                <Badge variant="warning" size="sm">
                  Only {product.stock} left
                </Badge>
              )}
              
              {product.stock === 0 && (
                <Badge variant="error" size="sm">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Quick Add Button */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                size="sm"
              >
                <ApperIcon name="ShoppingCart" className="h-4 w-4 mr-2" />
                Quick Add
              </Button>
            </div>
          </div>

          <div className="p-4">
            <div className="mb-2">
              <Badge variant="default" size="xs">
                {product.category}
              </Badge>
            </div>
            
            <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
              {product.Name || product.name}
            </h3>
            
            <p className="text-sm text-slate-600 mb-3 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-slate-900">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-500 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {cartItem && (
                  <Badge variant="primary" size="sm">
                    {cartItem.quantity} in cart
                  </Badge>
                )}
                
                <div className="flex items-center text-amber-400">
                  <ApperIcon name="Star" className="h-4 w-4 fill-current" />
                  <span className="text-sm text-slate-600 ml-1">
                    {product.rating || "4.5"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProductCard;