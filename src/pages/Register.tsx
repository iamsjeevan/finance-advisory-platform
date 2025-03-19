
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { UserPlus, Mail, Lock, User, Github, Chrome } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { initializeFinancialData } from '@/services/financeService';

const Register = () => {
  const { toast } = useToast();
  const { register, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (!termsAccepted) {
      toast({
        title: "Terms and conditions",
        description: "Please accept our terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: "Registration failed",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      await register(formData.name, formData.email, formData.password);
      
      toast({
        title: "Registration successful",
        description: "Your account has been created successfully!",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred during registration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]">
            <motion.div 
              className="max-w-md w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
                <p className="text-muted-foreground">
                  Join us and start your financial journey today
                </p>
              </div>

              <Card className="border-border shadow-subtle">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="text"
                          name="name"
                          placeholder="Full name"
                          className="pl-10"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          name="email"
                          placeholder="Email address"
                          className="pl-10"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="password"
                          name="password"
                          placeholder="Password"
                          className="pl-10"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm password"
                          className="pl-10"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="terms" 
                        checked={termsAccepted}
                        onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        I agree to the{' '}
                        <Link
                          to="/terms"
                          className="text-finance-blue hover:text-finance-blue/80 transition"
                        >
                          terms of service
                        </Link>{' '}
                        and{' '}
                        <Link
                          to="/privacy"
                          className="text-finance-blue hover:text-finance-blue/80 transition"
                        >
                          privacy policy
                        </Link>
                      </label>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isLoading || authLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating account...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <UserPlus className="mr-2 h-4 w-4" />
                          Create Account
                        </div>
                      )}
                    </Button>
                  </form>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-card px-2 text-muted-foreground">OR CONTINUE WITH</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full" type="button">
                      <Chrome className="mr-2 h-4 w-4" />
                      Google
                    </Button>
                    <Button variant="outline" className="w-full" type="button">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  </div>

                  <div className="mt-6 text-center text-sm">
                    Already have an account?{' '}
                    <Link
                      to="/login"
                      className="text-finance-blue hover:text-finance-blue/80 font-medium transition"
                    >
                      Sign in
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Register;
