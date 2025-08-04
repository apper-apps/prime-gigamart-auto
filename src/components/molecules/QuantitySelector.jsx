import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const QuantitySelector = ({ 
  quantity, 
  onQuantityChange, 
  min = 1, 
  max = 99, 
  disabled = false,
  size = "md" 
}) => {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || min;
    const clampedValue = Math.max(min, Math.min(max, value));
    onQuantityChange(clampedValue);
  };

  const buttonSize = size === "sm" ? "sm" : "md";
  const inputClasses = size === "sm" 
    ? "w-12 h-8 text-sm" 
    : "w-16 h-10 text-base";

  return (
    <div className="flex items-center">
      <Button
        variant="secondary"
        size={buttonSize}
        onClick={handleDecrease}
        disabled={disabled || quantity <= min}
        className="rounded-r-none border-r-0 px-2"
      >
        <ApperIcon name="Minus" className="h-4 w-4" />
      </Button>
      
      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min={min}
        max={max}
        disabled={disabled}
        className={`${inputClasses} border border-slate-300 text-center focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-slate-50 disabled:text-slate-500`}
      />
      
      <Button
        variant="secondary"
        size={buttonSize}
        onClick={handleIncrease}
        disabled={disabled || quantity >= max}
        className="rounded-l-none border-l-0 px-2"
      >
        <ApperIcon name="Plus" className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuantitySelector;