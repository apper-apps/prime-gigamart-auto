import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductGrid from "@/components/organisms/ProductGrid";
import FilterSection from "@/components/molecules/FilterSection";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { ProductService } from "@/services/api/ProductService";
import { CategoryService } from "@/services/api/CategoryService";

const Products = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setSelectedCategory(category || "");
  }, [category]);

  useEffect(() => {
    const query = searchParams.get("search") || "";
    setSearchQuery(query);
  }, [searchParams]);

  useEffect(() => {
    applyFilters();
  }, [products, selectedCategory, sortBy, priceRange, searchQuery]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [productsData, categoriesData] = await Promise.all([
        ProductService.getAll(),
        CategoryService.getAll()
      ]);
      
      setProducts(productsData);
      setCategories(categoriesData.map(cat => cat.name));
    } catch (err) {
      setError("Failed to load products. Please try again.");
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        filtered.sort((a, b) => b.Id - a.Id);
        break;
      case "featured":
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearchParams(query ? { search: query } : {});
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSortBy("featured");
    setPriceRange([0, 1000]);
    setSearchQuery("");
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategory || sortBy !== "featured" || 
    priceRange[0] > 0 || priceRange[1] < 1000 || searchQuery;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold font-display text-slate-900">
                {selectedCategory ? (
                  <>Products in {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</>
                ) : searchQuery ? (
                  <>Search Results for "{searchQuery}"</>
                ) : (
                  "All Products"
                )}
              </h1>
              <p className="text-slate-600 mt-2">
                {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full"
              >
                <ApperIcon name="Filter" className="h-4 w-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <Badge variant="primary" size="xs" className="ml-2">
                    Active
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-md">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search products..."
            />
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm text-slate-600">Active filters:</span>
              <div className="flex flex-wrap gap-2">
                {selectedCategory && (
                  <Badge variant="primary" className="cursor-pointer">
                    Category: {selectedCategory}
                    <ApperIcon 
                      name="X" 
                      className="h-3 w-3 ml-1 hover:text-primary-300" 
                      onClick={() => setSelectedCategory("")}
                    />
                  </Badge>
                )}
                {searchQuery && (
                  <Badge variant="info" className="cursor-pointer">
                    Search: {searchQuery}
                    <ApperIcon 
                      name="X" 
                      className="h-3 w-3 ml-1 hover:text-blue-300" 
                      onClick={() => handleSearch("")}
                    />
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-6 px-2 text-xs"
                >
                  Clear all
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
            <FilterSection
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              onClearFilters={clearFilters}
              className="sticky top-24"
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <ProductGrid 
              products={filteredProducts}
              loading={loading}
              error={error}
              onRetry={loadData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;