
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-finance-light-grey border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="h-8 w-8 rounded-lg bg-finance-blue flex items-center justify-center">
                <span className="text-white font-semibold">F</span>
              </span>
              <span className="font-medium text-lg">FinAdvisor</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your trusted partner for financial growth and security. We provide personalized financial advice powered by cutting-edge AI technology.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-finance-blue transition"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-finance-blue transition"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-finance-blue transition"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-finance-blue transition"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-base mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Financial Tools
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Blog & Resources
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-medium text-base mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/resources/financial-tips" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Financial Tips
                </Link>
              </li>
              <li>
                <Link to="/resources/investment-guides" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Investment Guides
                </Link>
              </li>
              <li>
                <Link to="/resources/tax-strategies" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Tax Strategies
                </Link>
              </li>
              <li>
                <Link to="/resources/retirement-planning" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Retirement Planning
                </Link>
              </li>
              <li>
                <Link to="/resources/market-updates" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Market Updates
                </Link>
              </li>
              <li>
                <Link to="/resources/calculators" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Financial Calculators
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-medium text-base mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest financial insights and tips.
            </p>
            <div className="space-y-3">
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 border-r-0"
                />
                <Button className="rounded-l-none" size="icon">
                  <ArrowRight size={18} />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground order-2 md:order-1 mt-4 md:mt-0">
            © {currentYear} FinAdvisor. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 order-1 md:order-2">
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition">
              Terms of Service
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition">
              Privacy Policy
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link to="/cookies" className="text-xs text-muted-foreground hover:text-foreground transition">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
