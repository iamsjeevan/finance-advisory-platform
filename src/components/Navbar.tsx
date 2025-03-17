
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-subtle' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="h-8 w-8 rounded-lg bg-finance-blue flex items-center justify-center">
              <span className="text-white font-semibold">F</span>
            </span>
            <span className="font-medium text-lg hidden sm:inline-block">FinAdvisor</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium text-foreground hover:text-finance-blue transition fancy-hover">
              Home
            </Link>
            <Link to="/ai-financial-planner" className="text-sm font-medium text-foreground hover:text-finance-blue transition fancy-hover">
              AI Financial Planner
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-sm font-medium text-foreground hover:text-finance-blue transition flex items-center space-x-1 outline-none">
                <span>Services</span>
                <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 animate-scale-in">
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link to="/services/financial-planning">Financial Planning</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link to="/services/investment-advisory">Investment Advisory</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link to="/services/tax-planning">Tax Planning</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/tools" className="text-sm font-medium text-foreground hover:text-finance-blue transition fancy-hover">
              Tools
            </Link>
            <Link to="/about" className="text-sm font-medium text-foreground hover:text-finance-blue transition fancy-hover">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium text-foreground hover:text-finance-blue transition fancy-hover">
              Contact
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md shadow-subtle overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen border-b border-border" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          <nav className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="text-base font-medium py-2 px-4 rounded-md hover:bg-muted transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/ai-financial-planner" 
              className="text-base font-medium py-2 px-4 rounded-md hover:bg-muted transition"
              onClick={() => setIsMenuOpen(false)}
            >
              AI Financial Planner
            </Link>
            <details className="group">
              <summary className="text-base font-medium py-2 px-4 rounded-md hover:bg-muted transition list-none flex justify-between items-center cursor-pointer">
                <span>Services</span>
                <ChevronDown 
                  size={16} 
                  className="transform group-open:rotate-180 transition-transform"
                />
              </summary>
              <div className="pl-4 mt-2 space-y-1">
                <Link 
                  to="/services/financial-planning" 
                  className="block text-sm py-2 px-4 rounded-md hover:bg-muted transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Financial Planning
                </Link>
                <Link 
                  to="/services/investment-advisory" 
                  className="block text-sm py-2 px-4 rounded-md hover:bg-muted transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Investment Advisory
                </Link>
                <Link 
                  to="/services/tax-planning" 
                  className="block text-sm py-2 px-4 rounded-md hover:bg-muted transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tax Planning
                </Link>
              </div>
            </details>
            <Link 
              to="/tools" 
              className="text-base font-medium py-2 px-4 rounded-md hover:bg-muted transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Tools
            </Link>
            <Link 
              to="/about" 
              className="text-base font-medium py-2 px-4 rounded-md hover:bg-muted transition"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-base font-medium py-2 px-4 rounded-md hover:bg-muted transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <Button variant="outline" className="w-full" asChild>
              <Link 
                to="/login"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </Button>
            <Button className="w-full" asChild>
              <Link 
                to="/register"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
