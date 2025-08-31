import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { ProductDetailsTab } from './form-tabs/ProductDetailsTab';
import { CustomerInfoTab } from './form-tabs/CustomerInfoTab';
import { WarrantyTab } from './form-tabs/WarrantyTab';
import { ReviewTab } from './form-tabs/ReviewTab';
import { CheckCircle, Package, User, Shield, FileText } from 'lucide-react';

const formSchema = z.object({
  // Product Details
  productModel: z.string().min(1, 'Product model is required'),
  serialNumber: z.string().min(1, 'Serial number is required'),
  purchaseDate: z.date({
    required_error: 'Purchase date is required',
  }),
  purchaseLocation: z.string().min(1, 'Purchase location is required'),
  
  // Customer Information
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  zipCode: z.string().min(5, 'ZIP code is required'),
  
  // Warranty
  warrantyPlan: z.enum(['standard', 'extended', 'premium']),
  notifications: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

const tabs = [
  { id: 'product', label: 'Product Details', icon: Package },
  { id: 'customer', label: 'Customer Info', icon: User },
  { id: 'warranty', label: 'Warranty', icon: Shield },
  { id: 'review', label: 'Review', icon: FileText },
];

export const ProductRegistrationForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      warrantyPlan: 'standard',
      notifications: true,
      marketingEmails: false,
    },
  });

  const progress = ((activeTab + 1) / tabs.length) * 100;

  const nextTab = () => {
    if (activeTab < tabs.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  const prevTab = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', data);
      setIsSubmitted(true);
      toast({
        title: 'Registration Complete!',
        description: 'Your product has been successfully registered.',
      });
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-elevated">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Registration Complete!</h2>
            <p className="text-muted-foreground mb-6">
              Your product has been successfully registered. You'll receive a confirmation email shortly.
            </p>
            <Button onClick={() => window.location.reload()} className="w-full">
              Register Another Product
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Product Registration
          </h1>
          <p className="text-muted-foreground text-lg">
            Register your product to activate warranty and receive support
          </p>
        </div>

        <Card className="shadow-form">
          <CardHeader className="border-b bg-form-section">
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-xl">Registration Form</CardTitle>
              <span className="text-sm text-muted-foreground">
                Step {activeTab + 1} of {tabs.length}
              </span>
            </div>
            
            <Progress value={progress} className="w-full" />
            
            <div className="flex items-center justify-between mt-6">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = index === activeTab;
                const isCompleted = index < activeTab;
                
                return (
                  <div
                    key={tab.id}
                    className="flex items-center space-x-2 cursor-pointer transition-colors"
                    onClick={() => setActiveTab(index)}
                  >
                    <div
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all
                        ${isCompleted 
                          ? 'bg-primary text-primary-foreground' 
                          : isActive 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }
                      `}
                    >
                      {isCompleted ? <CheckCircle className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </div>
                    <span
                      className={`
                        text-sm font-medium transition-colors hidden md:block
                        ${isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground'}
                      `}
                    >
                      {tab.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {activeTab === 0 && <ProductDetailsTab form={form} />}
                {activeTab === 1 && <CustomerInfoTab form={form} />}
                {activeTab === 2 && <WarrantyTab form={form} />}
                {activeTab === 3 && <ReviewTab form={form} />}

                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevTab}
                    disabled={activeTab === 0}
                  >
                    Previous
                  </Button>

                  {activeTab === tabs.length - 1 ? (
                    <Button type="submit" className="bg-gradient-primary">
                      Complete Registration
                    </Button>
                  ) : (
                    <Button type="button" onClick={nextTab}>
                      Next
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};