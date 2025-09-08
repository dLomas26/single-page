import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Grid, List } from "lucide-react";
import Header from "@/components/Header";
import ProductCard, { Product } from "@/components/ProductCard";
import FilterSidebar, { Filters } from "@/components/FilterSidebar";
import Cart, { CartItem } from "@/components/Cart";
import AuthModal from "@/components/AuthModal";
import { useToast } from "@/hooks/use-toast";

// Import product images
import headphonesImg from "@/assets/headphones.jpg";
import smartwatchImg from "@/assets/smartwatch.jpg";
import laptopImg from "@/assets/laptop.jpg";
import smartphoneImg from "@/assets/smartphone.jpg";

// Mock data - In a real app, this would come from an API
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299,
    originalPrice: 399,
    image: headphonesImg,
    category: "Headphones",
    rating: 4.5,
    reviews: 128,
    inStock: true,
  },
  {
    id: "2", 
    name: "Smart Fitness Watch",
    price: 249,
    image: smartwatchImg,
    category: "Watches",
    rating: 4.3,
    reviews: 89,
    inStock: true,
  },
  {
    id: "3",
    name: "Professional Laptop",
    price: 1299,
    originalPrice: 1499,
    image: laptopImg,
    category: "Laptops",
    rating: 4.8,
    reviews: 156,
    inStock: true,
  },
  {
    id: "4",
    name: "Latest Smartphone",
    price: 899,
    image: smartphoneImg,
    category: "Smartphones",
    rating: 4.6,
    reviews: 203,
    inStock: false,
  },
  {
    id: "5",
    name: "Wireless Earbuds Pro",
    price: 179,
    originalPrice: 199,
    image: headphonesImg,
    category: "Headphones",
    rating: 4.4,
    reviews: 94,
    inStock: true,
  },
  {
    id: "6",
    name: "Gaming Laptop Ultimate",
    price: 1899,
    image: laptopImg,
    category: "Laptops",
    rating: 4.7,
    reviews: 67,
    inStock: true,
  },
];

const Shop = () => {
  const [products] = useState<Product[]>(mockProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    priceRange: [0, 2000],
    minRating: 0,
    inStock: false,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { toast } = useToast();

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("shophub-cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    
    const savedUser = localStorage.getItem("shophub-user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setIsLoggedIn(true);
      setUserName(user.name);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("shophub-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Filter and search products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = filters.categories.length === 0 || 
                             filters.categories.includes(product.category);
      
      // Price filter
      const matchesPrice = product.price >= filters.priceRange[0] && 
                          product.price <= filters.priceRange[1];
      
      // Rating filter
      const matchesRating = product.rating >= filters.minRating;
      
      // Stock filter
      const matchesStock = !filters.inStock || product.inStock;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesStock;
    });
  }, [products, searchQuery, filters]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(productId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    });
  };

  const handleLogin = async (email: string, password: string) => {
    // Mock login - in real app, this would call an API
    const user = { email, name: email.split("@")[0] };
    localStorage.setItem("shophub-user", JSON.stringify(user));
    setIsLoggedIn(true);
    setUserName(user.name);
  };

  const handleSignup = async (email: string, password: string, name: string) => {
    // Mock signup - in real app, this would call an API
    const user = { email, name };
    localStorage.setItem("shophub-user", JSON.stringify(user));
    setIsLoggedIn(true);
    setUserName(name);
  };

  const handleLogout = () => {
    localStorage.removeItem("shophub-user");
    setIsLoggedIn(false);
    setUserName("");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 2000],
      minRating: 0,
      inStock: false,
    });
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
        onAuthClick={() => isLoggedIn ? handleLogout() : setIsAuthOpen(true)}
        onSearchChange={setSearchQuery}
        isLoggedIn={isLoggedIn}
        userName={userName}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
              isOpen={true}
              onClose={() => {}}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Shop <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Electronics</span>
                </h1>
                <p className="text-muted-foreground">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>

              <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>

                {/* View Mode Toggle */}
                <div className="flex items-center border rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(filters.categories.length > 0 || filters.inStock || searchQuery) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {searchQuery && (
                  <Badge variant="secondary">
                    Search: {searchQuery}
                  </Badge>
                )}
                {filters.categories.map(category => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
                {filters.inStock && (
                  <Badge variant="secondary">
                    In Stock Only
                  </Badge>
                )}
              </div>
            )}

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      <FilterSidebar
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={clearFilters}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* Cart */}
      <Cart
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClose={() => setIsCartOpen(false)}
        isOpen={isCartOpen}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </div>
  );
};

export default Shop;