import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Package, User, Shield, Mail, Phone, MapPin, Calendar, Hash } from 'lucide-react';

interface ReviewTabProps {
  form: UseFormReturn<any>;
}

export const ReviewTab: React.FC<ReviewTabProps> = ({ form }) => {
  const formData = form.getValues();

  const warrantyLabels = {
    standard: 'Standard Warranty (1 year)',
    extended: 'Extended Warranty (2 years)',
    premium: 'Premium Warranty (3 years)',
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Review Your Information</h3>
        <p className="text-sm text-muted-foreground">
          Please review all details before completing registration
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-primary" />
              <span>Product Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Model:</span>
              <span className="font-medium">{formData.productModel || 'Not specified'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground flex items-center">
                <Hash className="h-3 w-3 mr-1" />
                Serial:
              </span>
              <span className="font-medium">{formData.serialNumber || 'Not specified'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Purchased:
              </span>
              <span className="font-medium">
                {formData.purchaseDate ? format(formData.purchaseDate, 'PPP') : 'Not specified'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Location:</span>
              <span className="font-medium">{formData.purchaseLocation || 'Not specified'}</span>
            </div>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <span>Customer Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Name:</span>
              <span className="font-medium">
                {formData.firstName && formData.lastName 
                  ? `${formData.firstName} ${formData.lastName}` 
                  : 'Not specified'
                }
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground flex items-center">
                <Mail className="h-3 w-3 mr-1" />
                Email:
              </span>
              <span className="font-medium">{formData.email || 'Not specified'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground flex items-center">
                <Phone className="h-3 w-3 mr-1" />
                Phone:
              </span>
              <span className="font-medium">{formData.phone || 'Not specified'}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-muted-foreground flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                Address:
              </span>
              <div className="text-right font-medium">
                {formData.address && (
                  <>
                    <div>{formData.address}</div>
                    <div>
                      {formData.city && formData.zipCode 
                        ? `${formData.city}, ${formData.zipCode}` 
                        : formData.city || formData.zipCode || ''
                      }
                    </div>
                  </>
                )}
                {!formData.address && <span>Not specified</span>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Warranty & Preferences */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Warranty & Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Warranty Plan:</span>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {warrantyLabels[formData.warrantyPlan as keyof typeof warrantyLabels] || 'Standard Warranty'}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Notification Preferences:</span>
              <div className="flex flex-wrap gap-2">
                {formData.notifications && (
                  <Badge variant="outline">Warranty Notifications</Badge>
                )}
                {formData.marketingEmails && (
                  <Badge variant="outline">Marketing Emails</Badge>
                )}
                {!formData.notifications && !formData.marketingEmails && (
                  <span className="text-sm text-muted-foreground">No notifications selected</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-accent/50 border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-center text-muted-foreground">
          By completing this registration, you agree to our terms of service and privacy policy. 
          Your warranty will be activated immediately upon submission.
        </p>
      </div>
    </div>
  );
};