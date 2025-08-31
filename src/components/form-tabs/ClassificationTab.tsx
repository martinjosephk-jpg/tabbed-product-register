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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface ClassificationTabProps {
  form: UseFormReturn<any>;
}

export const ClassificationTab: React.FC<ClassificationTabProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Classification & Category</h3>
        <p className="text-sm text-muted-foreground">
          Define product type, status, and categorization details
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="itemType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Type *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select item type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="fa">Fixed Asset</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="itemStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Status *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="live">Live</SelectItem>
                  <SelectItem value="delisted">Delisted</SelectItem>
                  <SelectItem value="hold">Hold (Lock)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="itemActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Item Active</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Indicator if item is active
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hsnCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>HSN Code</FormLabel>
              <FormControl>
                <Input placeholder="External reference for tax" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Code</FormLabel>
              <FormControl>
                <Input placeholder="Product category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subCategoryCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub Category Code</FormLabel>
              <FormControl>
                <Input placeholder="Sub category classification" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="departmentGroup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department/Group</FormLabel>
              <FormControl>
                <Input placeholder="Top level grouping" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="activityCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activity Code/Finance Ref</FormLabel>
              <FormControl>
                <Input placeholder="Activity code filter with product type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};