import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';

export default function NetworkStatusVisualizer() {
  const [selectedProvider, setSelectedProvider] = useState('inNetwork');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-forestDark">Network Status Visualizer</h1>
      </div>

      {/* Patient Summary */}
      <div className="bg-white rounded-lg p-4 flex items-center border border-taupe/20">
        <div className="w-12 h-12 rounded-full bg-forestGreen text-white flex items-center justify-center font-bold text-lg mr-4">
          JS
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-lg text-forestDark">John Smith</h2>
          <p className="text-sm text-forestDark-light">DOB: 05/15/1980 | ID: P12345 | Insurance: Delta Dental PPO</p>
        </div>
        <Button variant="outline" size="sm">View Patient</Button>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Provider Network Status</CardTitle>
          <CardDescription>
            View network status for this patient's insurance plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Network Status Summary */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r">
            <div className="flex">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm text-green-700 font-medium">
                  Dr. Jane Doe is in-network with Delta Dental PPO
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Patient will receive maximum benefits with this provider
                </p>
              </div>
            </div>
          </div>

          {/* Network Status Visualization */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-64 h-64 relative">
              {/* Outer circle - All Providers */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-taupe/20"></div>
              
              {/* Middle circle - Delta Dental Network */}
              <div className="absolute inset-4 rounded-full border-2 border-forestGreen bg-forestLight/50"></div>
              
              {/* Inner circle - PPO Network */}
              <div className="absolute inset-12 rounded-full border-2 border-forestGreen bg-forestGreen/20"></div>
              
              {/* Center - Current Provider */}
              <div className="absolute inset-20 rounded-full bg-forestGreen flex items-center justify-center text-white font-bold">
                Dr. Doe
              </div>
              
              {/* Labels */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 text-xs font-medium text-forestDark-light">
                All Providers
              </div>
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-6 text-xs font-medium text-forestGreen">
                Delta Dental Network
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3 text-xs font-medium text-forestGreen">
                PPO Network
              </div>
            </div>
          </div>

          <Tabs defaultValue="coverage">
            <TabsList className="mb-4">
              <TabsTrigger value="coverage">Coverage Details</TabsTrigger>
              <TabsTrigger value="alternatives">Alternative Providers</TabsTrigger>
              <TabsTrigger value="benefits">Patient Benefits</TabsTrigger>
            </TabsList>
            
            <TabsContent value="coverage">
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-forestLight/50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-forestDark">In-Network Provider</p>
                    <p className="text-sm text-forestDark-light">Dr. Jane Doe is a participating provider with Delta Dental PPO</p>
                  </div>
                </div>

                <div className="space-y-3 text-forestDark">
                  <div className="flex border-b border-taupe/10 pb-2">
                    <span className="w-1/3 font-medium">Provider NPI</span>
                    <span className="w-2/3">1234567890</span>
                  </div>
                  <div className="flex border-b border-taupe/10 pb-2">
                    <span className="w-1/3 font-medium">Network Status</span>
                    <span className="w-2/3">
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        In-Network
                      </Badge>
                    </span>
                  </div>
                  <div className="flex border-b border-taupe/10 pb-2">
                    <span className="w-1/3 font-medium">Contract Effective</span>
                    <span className="w-2/3">01/01/2023</span>
                  </div>
                  <div className="flex border-b border-taupe/10 pb-2">
                    <span className="w-1/3 font-medium">Contract Renewal</span>
                    <span className="w-2/3">12/31/2025</span>
                  </div>
                  <div className="flex">
                    <span className="w-1/3 font-medium">Fee Schedule</span>
                    <span className="w-2/3">Delta Dental PPO Schedule</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="alternatives">
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Info className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Current Provider is In-Network</p>
                    <p className="text-sm text-blue-700">Alternative providers are only needed if current provider is out-of-network</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4 border-taupe/20">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-forestDark">Dr. Sarah Johnson</h3>
                        <p className="text-sm text-forestDark-light">
                          0.8 miles away | Delta Dental PPO
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4 border-taupe/20">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-forestDark">Dr. Michael Chen</h3>
                        <p className="text-sm text-forestDark-light">
                          1.2 miles away | Delta Dental PPO
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4 border-taupe/20">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-forestDark">Dr. Emily Rodriguez</h3>
                        <p className="text-sm text-forestDark-light">
                          2.5 miles away | Delta Dental PPO
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="benefits">
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-forestLight/50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-forestDark">In-Network Benefits Apply</p>
                    <p className="text-sm text-forestDark-light">Patient will receive maximum coverage with this provider</p>
                  </div>
                </div>

                <div className="space-y-3 text-forestDark">
                  <div className="flex justify-between border-b border-taupe/10 pb-2">
                    <span className="font-medium">Preventive Services</span>
                    <span className="font-medium text-forestGreen">100% Coverage</span>
                  </div>
                  <div className="flex justify-between border-b border-taupe/10 pb-2">
                    <span className="font-medium">Basic Services</span>
                    <span className="font-medium text-forestGreen">80% Coverage</span>
                  </div>
                  <div className="flex justify-between border-b border-taupe/10 pb-2">
                    <span className="font-medium">Major Services</span>
                    <span className="font-medium text-forestGreen">50% Coverage</span>
                  </div>
                  <div className="flex justify-between border-b border-taupe/10 pb-2">
                    <span className="font-medium">Deductible</span>
                    <span className="font-medium text-forestGreen">$50 Individual / $150 Family</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Annual Maximum</span>
                    <span className="font-medium text-forestGreen">$2,000</span>
                  </div>
                </div>

                <div className="mt-6 p-4 border border-amber-200 bg-amber-50 rounded-lg">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-amber-700 font-medium">
                        Out-of-Network Comparison
                      </p>
                      <p className="text-xs text-amber-600 mt-1">
                        If this provider was out-of-network, coverage would be reduced by approximately 30% and patient would be responsible for balance billing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Out of Network Example (Toggle Button) */}
      <div className="flex justify-center mb-4">
        <Button 
          variant={selectedProvider === 'inNetwork' ? 'outline' : 'default'}
          className="mr-2"
          onClick={() => setSelectedProvider('inNetwork')}
        >
          Show In-Network Example
        </Button>
        <Button 
          variant={selectedProvider === 'outNetwork' ? 'outline' : 'default'}
          onClick={() => setSelectedProvider('outNetwork')}
        >
          Show Out-of-Network Example
        </Button>
      </div>

      {selectedProvider === 'outNetwork' && (
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Out-of-Network Example</CardTitle>
            <CardDescription>
              This is how the visualization would appear for an out-of-network provider
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Network Status Summary - Out of Network */}
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r">
              <div className="flex">
                <XCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-red-700 font-medium">
                    Dr. Robert Williams is out-of-network with Delta Dental PPO
                  </p>
                  <p className="text-xs text-red-600 mt-1">
                    Patient will have reduced benefits and may be responsible for balance billing
                  </p>
                </div>
              </div>
            </div>

            {/* Network Status Visualization - Out of Network */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-64 h-64 relative">
                {/* Outer circle - All Providers */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-taupe/20"></div>
                
                {/* Middle circle - Delta Dental Network */}
                <div className="absolute inset-4 rounded-full border-2 border-forestGreen bg-forestLight/50"></div>
                
                {/* Inner circle - PPO Network */}
                <div className="absolute inset-12 rounded-full border-2 border-forestGreen bg-forestGreen/20"></div>
                
                {/* Out of Network Provider (positioned outside the network circles) */}
                <div className="absolute -right-4 top-1/2 transform translate-y-[-50%] w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xs">
                  Dr. Williams
                </div>
                
                {/* Labels */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 text-xs font-medium text-forestDark-light">
                  All Providers
                </div>
                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-6 text-xs font-medium text-forestGreen">
                  Delta Dental Network
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3 text-xs font-medium text-forestGreen">
                  PPO Network
                </div>
              </div>
            </div>

            {/* Alternative Providers Section */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-r">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-amber-700 font-medium">
                    We found 3 in-network alternatives near the patient
                  </p>
                  <p className="text-xs text-amber-600 mt-1">
                    Suggesting these providers could save the patient approximately $420 on their treatment plan
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-forestLight/30 border-taupe/20">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-forestDark">Dr. Sarah Johnson</h3>
                      <p className="text-sm text-forestDark-light">
                        0.8 miles away | Delta Dental PPO
                      </p>
                    </div>
                  </div>
                  <Button size="sm">Contact Office</Button>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-forestLight/30 border-taupe/20">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-forestDark">Dr. Michael Chen</h3>
                      <p className="text-sm text-forestDark-light">
                        1.2 miles away | Delta Dental PPO
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Contact Office</Button>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-forestLight/30 border-taupe/20">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-forestDark">Dr. Emily Rodriguez</h3>
                      <p className="text-sm text-forestDark-light">
                        2.5 miles away | Delta Dental PPO
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Contact Office</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Time Saved Indicator */}
      <Card className="bg-white">
        <CardContent className="pt-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-forestDark">Time Saved: 15 minutes</h4>
              <p className="text-sm text-forestDark-light">Network status visualization completed in 2 seconds vs. traditional 15-minute process</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
