import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ProductService } from "@/services/api/ProductService";
import ApperIcon from "@/components/ApperIcon";
import QuantitySelector from "@/components/molecules/QuantitySelector";
import ProductGrid from "@/components/organisms/ProductGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Products from "@/components/pages/Products";
import Home from "@/components/pages/Home";
import Cart from "@/components/pages/Cart";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/utils/formatters";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, getCartItem } = useCart();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const cartItem = getCartItem(parseInt(id));

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError("");
      
      const productData = await ProductService.getById(parseInt(id));
      if (!productData) {
        setError("Product not found");
        return;
      }
      
      setProduct(productData);
      
      // Load related products
      const allProducts = await ProductService.getAll();
      const related = allProducts
        .filter(p => p.category === productData.category && p.Id !== productData.Id)
        .slice(0, 4);
      setRelatedProducts(related);
      
    } catch (err) {
      setError("Failed to load product. Please try again.");
      console.error("Error loading product:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate("/checkout");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-4">
              <div className="aspect-square bg-slate-200 rounded-lg shimmer"></div>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-slate-200 rounded-lg shimmer"></div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="w-24 h-6 bg-slate-200 rounded shimmer"></div>
              <div className="w-3/4 h-8 bg-slate-200 rounded shimmer"></div>
              <div className="w-full h-20 bg-slate-200 rounded shimmer"></div>
              <div className="w-32 h-10 bg-slate-200 rounded shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error message={error} onRetry={loadProduct} />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error message="Product not found" />
        </div>
      </div>
    );
  }

  const discountPercentage = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <button 
                onClick={() => navigate("/")}
                className="text-slate-500 hover:text-slate-700"
              >
                Home
              </button>
            </li>
            <ApperIcon name="ChevronRight" className="h-4 w-4 text-slate-400" />
            <li>
              <button
                onClick={() => navigate("/products")}
                className="text-slate-500 hover:text-slate-700"
              >
                Products
              </button>
            </li>
            <ApperIcon name="ChevronRight" className="h-4 w-4 text-slate-400" />
            <li>
              <button
                onClick={() => navigate(`/products/${product.category.toLowerCase()}`)}
                className="text-slate-500 hover:text-slate-700 capitalize"
              >
                {product.category}
              </button>
            </li>
            <ApperIcon name="ChevronRight" className="h-4 w-4 text-slate-400" />
            <li className="text-slate-900 font-medium">{product.Name || product.name}</li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-card">
                <img
                  src={product.images && product.images.length > 0 ? product.images[selectedImage] : ''}
                  alt={product.Name || product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-white rounded-lg overflow-hidden shadow-card border-2 transition-all duration-200 ${
                        selectedImage === index ? "border-primary-500" : "border-transparent hover:border-slate-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.Name || product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="space-y-6">
              {/* Category and Status */}
              <div className="flex items-center gap-3">
                <Badge variant="default">{product.category}</Badge>
                {product.featured && (
                  <Badge variant="accent">
                    <ApperIcon name="Star" className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
                {discountPercentage > 0 && (
                  <Badge variant="error">-{discountPercentage}% OFF</Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold font-display text-slate-900">
                {product.Name || product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <ApperIcon
                      key={i}
                      name="Star"
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating || 4.5) 
                          ? "text-amber-400 fill-current" 
                          : "text-slate-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-slate-600">
                  {product.rating || "4.5"} ({Math.floor(Math.random() * 200) + 50} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-slate-900">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-slate-500 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>
                {discountPercentage > 0 && (
                  <p className="text-emerald-600 font-medium">
                    You save {formatCurrency(product.originalPrice - product.price)}!
                  </p>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <ApperIcon 
                  name={product.stock > 0 ? "CheckCircle" : "XCircle"} 
                  className={`h-5 w-5 ${product.stock > 0 ? "text-emerald-500" : "text-red-500"}`} 
                />
                <span className={product.stock > 0 ? "text-emerald-600" : "text-red-600"}>
                  {product.stock > 0 ? (
                    product.stock <= 5 ? (
                      `Only ${product.stock} left in stock!`
                    ) : (
                      "In Stock"
                    )
                  ) : (
                    "Out of Stock"
                  )}
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Description</h3>
                <p className="text-slate-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Quantity and Actions */}
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-900">Quantity:</span>
                    <QuantitySelector
                      quantity={quantity}
                      onQuantityChange={setQuantity}
                      max={product.stock}
                      disabled={product.stock === 0}
                    />
                  </div>

                  {cartItem && (
                    <div className="bg-primary-50 border border-primary-200 rounded-lg p-3">
                      <p className="text-sm text-primary-700">
                        <ApperIcon name="ShoppingCart" className="h-4 w-4 inline mr-1" />
                        {cartItem.quantity} already in cart
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button
                      onClick={handleAddToCart}
                      disabled={product.stock === 0}
                      size="lg"
                      className="w-full"
                    >
                      <ApperIcon name="ShoppingCart" className="h-5 w-5 mr-2" />
                      Add to Cart
                    </Button>
                    
                    <Button
                      onClick={handleBuyNow}
                      disabled={product.stock === 0}
                      variant="accent"
                      size="lg"
                      className="w-full"
                    >
                      <ApperIcon name="Zap" className="h-5 w-5 mr-2" />
                      Buy Now
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <ApperIcon name="Truck" className="h-4 w-4 text-emerald-500" />
                  Free shipping
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <ApperIcon name="RotateCcw" className="h-4 w-4 text-emerald-500" />
                  30-day returns
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <ApperIcon name="Shield" className="h-4 w-4 text-emerald-500" />
                  2-year warranty
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <ApperIcon name="Headphones" className="h-4 w-4 text-emerald-500" />
                  24/7 support
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold font-display text-slate-900 mb-8">
              Related Products
            </h2>
            <ProductGrid products={relatedProducts} />
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;