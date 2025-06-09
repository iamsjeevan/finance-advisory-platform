
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import MainLayout from '@/layouts/MainLayout';

type AuthMode = 'login' | 'signup' | 'forgot-password';

const Auth = () => {
  const { user, signIn, signUp, resetPassword } = useAuth();
  const { toast } = useToast();
  const [mode, setMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if user is already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast({
            title: "Login failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have been logged in successfully.",
          });
        }
      } else if (mode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Passwords don't match",
            description: "Please make sure your passwords match.",
            variant: "destructive",
          });
          return;
        }

        const { error } = await signUp(formData.email, formData.password);
        if (error) {
          toast({
            title: "Registration failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Registration successful",
            description: "Please check your email to verify your account.",
          });
          setMode('login');
        }
      } else if (mode === 'forgot-password') {
        const { error } = await resetPassword(formData.email);
        if (error) {
          toast({
            title: "Password reset failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Password reset email sent",
            description: "Check your email for password reset instructions.",
          });
          setMode('login');
        }
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'login': return 'Welcome Back';
      case 'signup': return 'Create Account';
      case 'forgot-password': return 'Reset Password';
    }
  };

  const getSubtitle = () => {
    switch (mode) {
      case 'login': return 'Sign in to your account';
      case 'signup': return 'Join us and start your financial journey';
      case 'forgot-password': return 'Enter your email to reset your password';
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
                <h1 className="text-3xl font-bold mb-2">{getTitle()}</h1>
                <p className="text-muted-foreground">{getSubtitle()}</p>
              </div>

              <Card className="border-border shadow-subtle">
                <CardHeader>
                  {mode === 'forgot-password' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-fit p-0"
                      onClick={() => setMode('login')}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Login
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'signup' && (
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
                    )}

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

                    {mode !== 'forgot-password' && (
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
                    )}

                    {mode === 'signup' && (
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
                    )}

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </div>
                      ) : (
                        <>
                          {mode === 'login' && 'Sign In'}
                          {mode === 'signup' && 'Create Account'}
                          {mode === 'forgot-password' && 'Send Reset Email'}
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 text-center text-sm space-y-2">
                    {mode === 'login' && (
                      <>
                        <button
                          type="button"
                          onClick={() => setMode('forgot-password')}
                          className="text-finance-blue hover:text-finance-blue/80 transition"
                        >
                          Forgot your password?
                        </button>
                        <div>
                          Don't have an account?{' '}
                          <button
                            type="button"
                            onClick={() => setMode('signup')}
                            className="text-finance-blue hover:text-finance-blue/80 font-medium transition"
                          >
                            Sign up
                          </button>
                        </div>
                      </>
                    )}

                    {mode === 'signup' && (
                      <div>
                        Already have an account?{' '}
                        <button
                          type="button"
                          onClick={() => setMode('login')}
                          className="text-finance-blue hover:text-finance-blue/80 font-medium transition"
                        >
                          Sign in
                        </button>
                      </div>
                    )}
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

export default Auth;
