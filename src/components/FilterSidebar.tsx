import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

export interface Filters {
  categories: string[];
  priceRange: [number, number];
  minRating: number;
  inStock: boolean;
}

interface FilterSidebarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  "Electronics",
  "Headphones",
  "Smartphones",
  "Laptops",
  "Watches",
  "Accessories"
];

const FilterSidebar = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  isOpen,
  onClose 
}: FilterSidebarProps) => {
  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    
    onFiltersChange({
      ...filters,
      categories: newCategories
    });
  };

  const handlePriceRangeChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: [value[0], value[1]]
    });
  };

  const handleRatingChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      minRating: value[0]
    });
  };

  const handleInStockChange = (checked: boolean) => {
    onFiltersChange({
      ...filters,
      inStock: checked
    });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-screen lg:h-auto z-50 lg:z-auto
        w-80 lg:w-full transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Card className="h-full lg:h-auto overflow-y-auto">
          <CardHeader className="flex flex-row items-center justify-between lg:block">
            <CardTitle>Filters</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={(checked) => 
                        handleCategoryChange(category, checked as boolean)
                      }
                    />
                    <Label htmlFor={category} className="text-sm">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Price Range */}
            <div>
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="px-2">
                <Slider
                  value={filters.priceRange}
                  onValueChange={handlePriceRangeChange}
                  max={2000}
                  min={0}
                  step={50}
                  className="mb-3"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Rating */}
            <div>
              <h3 className="font-semibold mb-3">Minimum Rating</h3>
              <div className="px-2">
                <Slider
                  value={[filters.minRating]}
                  onValueChange={handleRatingChange}
                  max={5}
                  min={0}
                  step={0.5}
                  className="mb-3"
                />
                <div className="text-sm text-muted-foreground">
                  {filters.minRating}+ stars
                </div>
              </div>
            </div>

            <Separator />

            {/* In Stock */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inStock"
                checked={filters.inStock}
                onCheckedChange={handleInStockChange}
              />
              <Label htmlFor="inStock" className="text-sm">
                In Stock Only
              </Label>
            </div>

            {/* Clear Filters */}
            <Button 
              variant="outline" 
              onClick={onClearFilters}
              className="w-full"
            >
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default FilterSidebar;