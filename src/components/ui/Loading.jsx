import React from "react";

const Loading = ({ className = "" }) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Grid of skeleton cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-card overflow-hidden">
            {/* Image skeleton */}
            <div className="w-full h-64 bg-slate-200 shimmer"></div>
            
            {/* Content skeleton */}
            <div className="p-4 space-y-3">
              {/* Category badge */}
              <div className="w-16 h-5 bg-slate-200 rounded-full shimmer"></div>
              
              {/* Title */}
              <div className="space-y-2">
                <div className="w-full h-4 bg-slate-200 rounded shimmer"></div>
                <div className="w-3/4 h-4 bg-slate-200 rounded shimmer"></div>
              </div>
              
              {/* Description */}
              <div className="space-y-1">
                <div className="w-full h-3 bg-slate-100 rounded shimmer"></div>
                <div className="w-2/3 h-3 bg-slate-100 rounded shimmer"></div>
              </div>
              
              {/* Price and rating */}
              <div className="flex justify-between items-center pt-2">
                <div className="w-20 h-6 bg-slate-200 rounded shimmer"></div>
                <div className="w-16 h-4 bg-slate-100 rounded shimmer"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;