import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Clock, Star } from 'lucide-react';

interface WarrantyTabProps {
  form: UseFormReturn<any>;
}

const warrantyPlans = [
  {
    id: 'standard',
    name: 'Standard Warranty',
    description: '1 year manufacturer warranty',
    icon: Shield,
    features: ['Hardware defects coverage', 'Basic support', '1 year duration'],
  },
  {
    id: 'extended',
    name: 'Extended Warranty',
    description: '2 years comprehensive coverage',
    icon: Clock,
    features: ['Hardware defects coverage', 'Priority support', '2 year duration', 'Accidental damage'],
  },
  {
    id: 'premium',
    name: 'Premium Warranty',
    description: '3 years full protection',
    icon: Star,
    features: ['Hardware defects coverage', '24/7 premium support', '3 year duration', 'Accidental damage', 'Next-day replacement'],
  },
];

export const WarrantyTab: React.FC<WarrantyTabProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Warranty & Preferences</h3>
        <p className="text-sm text-muted-foreground">
          Choose your warranty plan and notification preferences
        </p>
      </div>

      <FormField
        control={form.control}
        name="warrantyPlan"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">Select Warranty Plan</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 gap-4 mt-4"
              >
                {warrantyPlans.map((plan) => {
                  const Icon = plan.icon;
                  return (
                    <div key={plan.id}>
                      <RadioGroupItem value={plan.id} id={plan.id} className="sr-only" />
                      <label
                        htmlFor={plan.id}
                        className="cursor-pointer"
                      >
                        <Card className={`
                          transition-all duration-200 hover:shadow-md
                          ${field.value === plan.id 
                            ? 'ring-2 ring-primary border-primary bg-accent/50' 
                            : 'hover:border-primary/50'
                          }
                        `}>
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                              <Icon className={`
                                h-6 w-6 mt-1 
                                ${field.value === plan.id ? 'text-primary' : 'text-muted-foreground'}
                              `} />
                              <div className="flex-1">
                                <h4 className="font-semibold">{plan.name}</h4>
                                <p className="text-sm text-muted-foreground mb-2">{plan.description}</p>
                                <ul className="text-xs space-y-1">
                                  {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center">
                                      <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </label>
                    </div>
                  );
                })}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <h4 className="font-medium">Notification Preferences</h4>
        
        <FormField
          control={form.control}
          name="notifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Warranty notifications
                </FormLabel>
                <FormDescription>
                  Receive important warranty updates and expiration reminders
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="marketingEmails"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Marketing emails
                </FormLabel>
                <FormDescription>
                  Receive product updates, offers, and company news
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};