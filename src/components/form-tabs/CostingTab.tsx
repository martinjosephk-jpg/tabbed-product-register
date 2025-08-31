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
import { Switch } from '@/components/ui/switch';

interface CostingTabProps {
  form: UseFormReturn<any>;
}

export const CostingTab: React.FC<CostingTabProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Costing & Vendor</h3>
        <p className="text-sm text-muted-foreground">
          Configure cost management and vendor information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="ownerDepartment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner Department - Cost Center</FormLabel>
              <FormControl>
                <Input placeholder="Cost center reference" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="taxType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax Type</FormLabel>
              <FormControl>
                <Input placeholder="Default tax type for location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="standardCost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Standard Cost & Factor</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="0.01"
                  placeholder="Standard cost (WAG + OH)" 
                  {...field}
                  onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="averageCost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Average Cost</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="0.01"
                  placeholder="Company/Location wise average cost" 
                  {...field}
                  onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vendorCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vendor Code</FormLabel>
              <FormControl>
                <Input placeholder="Primary vendor code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="costControl"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Cost Control</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Flag for cost visibility
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
      </div>

      <div className="bg-muted/50 rounded-lg p-4 mt-6">
        <h4 className="font-medium mb-2">Cost Information Notes</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Standard Cost: WAG (Weighted Average) + Overhead</li>
          <li>• Average Cost: Updated as per company/location parameters</li>
          <li>• Cost Control: Determines cost visibility at location level</li>
          <li>• All cost flags are set to location stock level</li>
        </ul>
      </div>
    </div>
  );
};