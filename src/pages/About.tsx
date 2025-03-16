
import MainLayout from '@/layouts/MainLayout';
import { motion } from 'framer-motion';
import { BadgeCheck, Trophy, Users, Brain } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <MainLayout>
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About FinAdvisor
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Your trusted partner for innovative financial solutions
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                At FinAdvisor, our mission is to democratize access to high-quality 
                financial advice through innovative technology and expert human guidance.
                We believe everyone deserves a secure financial future, regardless of 
                their wealth or background.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                We combine cutting-edge AI technology with human expertise to provide 
                personalized financial advice that helps our clients achieve their goals.
                Our approach bridges the gap between traditional financial services and 
                modern technological capabilities.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <BadgeCheck className="h-6 w-6 text-finance-blue shrink-0 mt-1 mr-3" />
                  <p>
                    <span className="font-medium">Personalized Guidance</span> - Tailored 
                    financial strategies designed for your unique situation and goals.
                  </p>
                </div>
                <div className="flex items-start">
                  <BadgeCheck className="h-6 w-6 text-finance-blue shrink-0 mt-1 mr-3" />
                  <p>
                    <span className="font-medium">Innovative Technology</span> - Leveraging 
                    the latest AI and data analysis tools to optimize financial outcomes.
                  </p>
                </div>
                <div className="flex items-start">
                  <BadgeCheck className="h-6 w-6 text-finance-blue shrink-0 mt-1 mr-3" />
                  <p>
                    <span className="font-medium">Financial Education</span> - Empowering 
                    clients with knowledge to make informed decisions about their future.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="relative rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Financial advisors in a meeting" 
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h2 
              className="text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Our Values
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="h-full border-border shadow-subtle hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-finance-blue/10 rounded-full p-3 w-fit mb-4 mx-auto">
                    <Trophy className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">Excellence</h3>
                  <p className="text-muted-foreground text-center">
                    We strive for excellence in everything we do, from the advice we provide 
                    to the technology we develop and the service we deliver.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="h-full border-border shadow-subtle hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-finance-blue/10 rounded-full p-3 w-fit mb-4 mx-auto">
                    <BadgeCheck className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">Integrity</h3>
                  <p className="text-muted-foreground text-center">
                    We act with honesty, transparency, and ethical principles, always putting 
                    our clients' best interests first in everything we do.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className="h-full border-border shadow-subtle hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-finance-blue/10 rounded-full p-3 w-fit mb-4 mx-auto">
                    <Brain className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">Innovation</h3>
                  <p className="text-muted-foreground text-center">
                    We continuously seek innovative solutions to enhance our services, 
                    leveraging technology to improve financial outcomes for our clients.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Card className="h-full border-border shadow-subtle hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-finance-blue/10 rounded-full p-3 w-fit mb-4 mx-auto">
                    <Users className="h-6 w-6 text-finance-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">Empowerment</h3>
                  <p className="text-muted-foreground text-center">
                    We empower our clients with knowledge and tools to take control of their 
                    financial future and make informed decisions with confidence.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="bg-finance-light-grey rounded-xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2 
                className="text-3xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Our Team
              </motion.h2>
              <motion.p 
                className="text-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                FinAdvisor brings together a diverse team of financial experts, technologists, 
                and customer service professionals dedicated to your financial success.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                <Button size="lg" asChild>
                  <Link to="/about/team">
                    Meet Our Team
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
