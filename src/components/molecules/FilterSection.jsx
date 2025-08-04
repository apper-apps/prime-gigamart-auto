import React from "react";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const FilterSection = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  onClearFilters,
  className 
}) => {
  const hasActiveFilters = selectedCategory || sortBy !== "featured" || priceRange[0] > 0 || priceRange[1] < 1000;

  return (
    <div className={`bg-white rounded-lg shadow-card p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-slate-900">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-slate-500 hover:text-slate-700"
          >
            <ApperIcon name="X" className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <h4 className="font-medium text-slate-900 mb-3">Category</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value=""
                checked={!selectedCategory}
                onChange={() => onCategoryChange("")}
                className="h-4 w-4 text-primary-600 border-slate-300 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-slate-700">All Categories</span>
            </label>
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => onCategoryChange(category)}
                  className="h-4 w-4 text-primary-600 border-slate-300 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-slate-700 capitalize">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Sort By */}
        <div>
          <Select
            label="Sort By"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name A-Z</option>
            <option value="newest">Newest First</option>
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-medium text-slate-900 mb-3">Price Range</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[0]}
                onChange={(e) => onPriceRangeChange([parseInt(e.target.value), priceRange[1]])}
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div>
            <h4 className="font-medium text-slate-900 mb-3">Active Filters</h4>
            <div className="flex flex-wrap gap-2">
              {selectedCategory && (
                <Badge variant="primary" className="cursor-pointer">
                  {selectedCategory}
                  <ApperIcon 
                    name="X" 
                    className="h-3 w-3 ml-1 hover:text-primary-300" 
                    onClick={() => onCategoryChange("")}
                  />
                </Badge>
              )}
              {sortBy !== "featured" && (
                <Badge variant="info" className="cursor-pointer">
                  Sort: {sortBy}
                  <ApperIcon 
                    name="X" 
                    className="h-3 w-3 ml-1 hover:text-blue-300" 
                    onClick={() => onSortChange("featured")}
                  />
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSection;