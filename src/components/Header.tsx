import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, User, Menu, X } from "lucide-react";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onAuthClick: () => void;
  onSearchChange: (query: string) => void;
  isLoggedIn: boolean;
  userName?: string;
}

const Header = ({ 
  cartItemsCount, 
  onCartClick, 
  onAuthClick, 
  onSearchChange, 
  isLoggedIn, 
  userName 
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange(value);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              ShopHub
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={onAuthClick}
              className="flex items-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span>{isLoggedIn ? userName || "Account" : "Sign In"}</span>
            </Button>
            
            <Button
              variant="ghost"
              onClick={onCartClick}
              className="relative flex items-center space-x-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
              {cartItemsCount > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 w-full"
                />
              </div>
              
              <Button
                variant="ghost"
                onClick={onAuthClick}
                className="justify-start"
              >
                <User className="h-4 w-4 mr-2" />
                {isLoggedIn ? userName || "Account" : "Sign In"}
              </Button>
              
              <Button
                variant="ghost"
                onClick={onCartClick}
                className="justify-start relative"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {cartItemsCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;