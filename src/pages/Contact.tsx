
import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, SendHorizontal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

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
              Contact Us
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Get in touch with our team of financial experts
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-8">
                <Card className="border-border shadow-subtle">
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="bg-finance-blue/10 rounded-full p-3 mr-4">
                        <Phone className="h-5 w-5 text-finance-blue" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">Phone</h3>
                        <p className="text-muted-foreground mb-1">Main: (123) 456-7890</p>
                        <p className="text-muted-foreground">Support: (123) 456-7891</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border shadow-subtle">
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="bg-finance-blue/10 rounded-full p-3 mr-4">
                        <Mail className="h-5 w-5 text-finance-blue" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">Email</h3>
                        <p className="text-muted-foreground mb-1">info@finadvisor.com</p>
                        <p className="text-muted-foreground">support@finadvisor.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border shadow-subtle">
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="bg-finance-blue/10 rounded-full p-3 mr-4">
                        <MapPin className="h-5 w-5 text-finance-blue" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">Office</h3>
                        <p className="text-muted-foreground">
                          123 Financial District<br />
                          Suite 4500<br />
                          New York, NY 10004
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border shadow-subtle">
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="bg-finance-blue/10 rounded-full p-3 mr-4">
                        <Clock className="h-5 w-5 text-finance-blue" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">Hours</h3>
                        <p className="text-muted-foreground mb-1">Monday - Friday: 9AM - 6PM</p>
                        <p className="text-muted-foreground">Saturday: 10AM - 2PM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-border shadow-subtle">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Full Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your email address"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Your phone number"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Subject of your message"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message..."
                        rows={6}
                        required
                      />
                    </div>

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
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <SendHorizontal className="mr-2 h-4 w-4" />
                          Send Message
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="mt-16">
            <Card className="border-border shadow-subtle overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.01397848459418!3d40.71066447933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a165bedccab%3A0x2cb2ddf003b5cea0!2sWall%20St%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2suk!4v1625583229184!5m2!1sen!2suk"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="FinAdvisor Office Location"
              ></iframe>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Contact;
