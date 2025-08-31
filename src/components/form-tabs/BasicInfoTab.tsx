import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface BasicInfoTabProps {
  form: UseFormReturn<any>;
}

export const BasicInfoTab: React.FC<BasicInfoTabProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Basic Information</h3>
        <p className="text-sm text-muted-foreground">
          Enter the fundamental product identification details
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="productId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product ID *</FormLabel>
              <FormControl>
                <Input placeholder="e.g., P10001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="itemCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Code *</FormLabel>
              <FormControl>
                <Input placeholder="Transaction item identifier" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="itemName"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Item Name * (Max 80 characters)</FormLabel>
              <FormControl>
                <Input placeholder="Enter item name" maxLength={80} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="alternateName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alternate Name</FormLabel>
              <FormControl>
                <Input placeholder="Name in another language" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="partNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Part Number</FormLabel>
              <FormControl>
                <Input placeholder="Item specific reference" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <FormControl>
                <Input placeholder="Product brand" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="countryOfOrigin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country of Origin</FormLabel>
              <FormControl>
                <Input placeholder="Manufacturing country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Detailed product description" 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};