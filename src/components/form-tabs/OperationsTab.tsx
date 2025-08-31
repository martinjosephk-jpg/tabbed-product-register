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

interface OperationsTabProps {
  form: UseFormReturn<any>;
}

export const OperationsTab: React.FC<OperationsTabProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Operations & Inventory</h3>
        <p className="text-sm text-muted-foreground">
          Configure inventory management and operational settings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="baseUnit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Base Unit *</FormLabel>
              <FormControl>
                <Input placeholder="Unit of measure (e.g., KG, PCS)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="itemOperation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Operation (Co/Lo) *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select operation type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="co">Co (Company)</SelectItem>
                  <SelectItem value="lo">Lo (Location)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stockMgmt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock Management *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stock method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="fifo">FIFO (First In, First Out)</SelectItem>
                  <SelectItem value="lifo">LIFO (Last In, First Out)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="weighedItem"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Weighed Item</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    Flag for weighed items
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
            name="lotWiseStockMgmt"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Lot wise Stock Mgmt</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    Flag for stock management mode
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
            name="centralPurchase"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Central Purchase</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    Flag for purchase mode
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
            name="controlledOperations"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Controlled Operations</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    Item operations control level
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
            name="negativeStockMgmt"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Negative Stock Mgmt</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    Flag for negative stock levels
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
            name="warrantyItem"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Warranty Item</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    Flag for warranty and serial number
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
      </div>
    </div>
  );
};