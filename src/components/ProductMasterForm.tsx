import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { BasicInfoTab } from './form-tabs/BasicInfoTab';
import { ClassificationTab } from './form-tabs/ClassificationTab';
import { OperationsTab } from './form-tabs/OperationsTab';
import { CostingTab } from './form-tabs/CostingTab';
import { CheckCircle, Info, Tag, Settings, DollarSign } from 'lucide-react';

const formSchema = z.object({
  // Basic Information
  productId: z.string().min(1, 'Product ID is required'),
  itemCode: z.string().min(1, 'Item Code is required'),
  itemName: z.string().min(1, 'Item Name is required').max(80, 'Item Name must be 80 characters or less'),
  alternateName: z.string().optional(),
  description: z.string().optional(),
  partNumber: z.string().optional(),
  brand: z.string().optional(),
  countryOfOrigin: z.string().optional(),
  
  // Classification & Category
  itemType: z.enum(['product', 'service', 'fa']),
  itemStatus: z.enum(['live', 'delisted', 'hold']),
  itemActive: z.boolean().default(true),
  hsnCode: z.string().optional(),
  categoryCode: z.string().optional(),
  subCategoryCode: z.string().optional(),
  departmentGroup: z.string().optional(),
  activityCode: z.string().optional(),
  
  // Operations & Inventory
  baseUnit: z.string().min(1, 'Base Unit is required'),
  weighedItem: z.boolean().default(false),
  lotWiseStockMgmt: z.boolean().default(false),
  itemOperation: z.enum(['co', 'lo']),
  stockMgmt: z.enum(['fifo', 'lifo']),
  centralPurchase: z.boolean().default(false),
  controlledOperations: z.boolean().default(false),
  negativeStockMgmt: z.boolean().default(false),
  warrantyItem: z.boolean().default(false),
  
  // Costing & Vendor
  ownerDepartment: z.string().optional(),
  taxType: z.string().optional(),
  costControl: z.boolean().default(false),
  standardCost: z.number().optional(),
  averageCost: z.number().optional(),
  vendorCode: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const tabs = [
  { id: 'basic', label: 'Basic Info', icon: Info },
  { id: 'classification', label: 'Classification', icon: Tag },
  { id: 'operations', label: 'Operations', icon: Settings },
  { id: 'costing', label: 'Costing', icon: DollarSign },
];

export const ProductMasterForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemType: 'product',
      itemStatus: 'live',
      itemActive: true,
      weighedItem: false,
      lotWiseStockMgmt: false,
      itemOperation: 'co',
      stockMgmt: 'fifo',
      centralPurchase: false,
      controlledOperations: false,
      negativeStockMgmt: false,
      warrantyItem: false,
      costControl: false,
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
      
      console.log('Product Master Data:', data);
      setIsSubmitted(true);
      toast({
        title: 'Product Master Created!',
        description: 'Product master data has been successfully saved.',
      });
    } catch (error) {
      toast({
        title: 'Save Failed',
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
            <h2 className="text-2xl font-bold mb-2">Product Master Created!</h2>
            <p className="text-muted-foreground mb-6">
              Your product master data has been successfully saved to the database.
            </p>
            <Button onClick={() => window.location.reload()} className="w-full">
              Create Another Product
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Product Master Data
          </h1>
          <p className="text-muted-foreground text-lg">
            Create and manage comprehensive product information
          </p>
        </div>

        <Card className="shadow-form">
          <CardHeader className="border-b bg-form-section">
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-xl">Product Master Form</CardTitle>
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
                {activeTab === 0 && <BasicInfoTab form={form} />}
                {activeTab === 1 && <ClassificationTab form={form} />}
                {activeTab === 2 && <OperationsTab form={form} />}
                {activeTab === 3 && <CostingTab form={form} />}

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
                      Save Product Master
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