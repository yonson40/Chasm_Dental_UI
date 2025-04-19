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
import { AlertCircle, CheckCircle, Clock, Search } from 'lucide-react';

export default function InsuranceDiscovery() {
  const [selectedInsurance, setSelectedInsurance] = useState('delta');

  const handleSelectInsurance = (id: string) => {
    setSelectedInsurance(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-forestDark">Insurance Discovery</h1>
      </div>

      {/* Patient Summary */}
      <div className="bg-white rounded-lg p-4 flex items-center border border-taupe/20">
        <div className="w-12 h-12 rounded-full bg-forestGreen text-white flex items-center justify-center font-bold text-lg mr-4">
          JS
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-lg text-forestDark">John Smith</h2>
          <p className="text-sm text-forestDark-light">DOB: 05/15/1980 | ID: P12345 | Added: Today</p>
        </div>
        <Button variant="outline">Edit Patient</Button>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Insurance Discovery Results</CardTitle>
          <CardDescription>
            Our AI-powered discovery service found potential insurance coverage for this patient.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r">
            <div className="flex">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <p className="text-sm text-green-700">
                <strong>Success!</strong> We found 3 potential insurance coverages for John Smith using our AI-powered discovery service.
              </p>
            </div>
          </div>

          <Tabs defaultValue="discovered">
            <TabsList className="mb-4">
              <TabsTrigger value="discovered">Discovered Insurance</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="discovered">
              <p className="mb-4 text-forestDark">Select the insurance coverage to verify:</p>
              
              {/* Insurance Options */}
              <div className="space-y-4 mb-6">
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedInsurance === 'delta' 
                      ? 'bg-forestLight/50 border-forestGreen'
                      : 'border-taupe/20 hover:bg-forestLight/30'
                  }`}
                  onClick={() => handleSelectInsurance('delta')}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4 border border-taupe/10">
                        <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L4 8v12h5V10h6v10h5V8L12 2z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-forestDark">Delta Dental PPO</h3>
                        <p className="text-sm text-forestDark-light">
                          Member ID: DDN123456789<br />
                          Group: GRP12345
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      95% Confidence
                    </Badge>
                  </div>
                </div>

                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedInsurance === 'cigna' 
                      ? 'bg-forestLight/50 border-forestGreen'
                      : 'border-taupe/20 hover:bg-forestLight/30'
                  }`}
                  onClick={() => handleSelectInsurance('cigna')}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4 border border-taupe/10">
                        <svg className="w-8 h-8 text-blue-900" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-forestDark">Cigna Dental</h3>
                        <p className="text-sm text-forestDark-light">
                          Member ID: CGN987654321<br />
                          Group: CG54321
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                      75% Confidence
                    </Badge>
                  </div>
                </div>

                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedInsurance === 'aetna' 
                      ? 'bg-forestLight/50 border-forestGreen'
                      : 'border-taupe/20 hover:bg-forestLight/30'
                  }`}
                  onClick={() => handleSelectInsurance('aetna')}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4 border border-taupe/10">
                        <svg className="w-8 h-8 text-red-900" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 5c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 10.2c-1.25 1.9-3.41 3-8 3-4.59 0-6.75-1.1-8-3-.33-.5-.33-1.2 0-1.7 1.25-1.9 3.41-3 8-3 4.59 0 6.75 1.1 8 3 .33.5.33 1.2 0 1.7z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-forestDark">Aetna Dental</h3>
                        <p className="text-sm text-forestDark-light">
                          Member ID: AET567891234<br />
                          Group: AE98765
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-red-100 text-red-800 border-red-200">
                      45% Confidence
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Selected Insurance Details */}
              <div className="bg-forestLight/30 p-6 rounded-lg mb-6">
                <h3 className="font-medium text-lg mb-4 text-forestDark">Selected Insurance Details</h3>
                
                <div className="space-y-3 text-forestDark">
                  <div className="flex border-b border-taupe/20 pb-2">
                    <span className="w-1/3 font-medium">Insurance Provider</span>
                    <span className="w-2/3">Delta Dental</span>
                  </div>
                  <div className="flex border-b border-taupe/20 pb-2">
                    <span className="w-1/3 font-medium">Plan Type</span>
                    <span className="w-2/3">PPO</span>
                  </div>
                  <div className="flex border-b border-taupe/20 pb-2">
                    <span className="w-1/3 font-medium">Member ID</span>
                    <span className="w-2/3">DDN123456789</span>
                  </div>
                  <div className="flex border-b border-taupe/20 pb-2">
                    <span className="w-1/3 font-medium">Group Number</span>
                    <span className="w-2/3">GRP12345</span>
                  </div>
                  <div className="flex border-b border-taupe/20 pb-2">
                    <span className="w-1/3 font-medium">Coverage Start Date</span>
                    <span className="w-2/3">01/01/2025</span>
                  </div>
                  <div className="flex">
                    <span className="w-1/3 font-medium">Coverage End Date</span>
                    <span className="w-2/3">12/31/2025</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Verify Selected Insurance</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="verification">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-blue-500 mr-2" />
                  <p className="text-sm text-blue-700">
                    Click "Verify Selected Insurance" to begin the verification process.
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-center py-12">
                <Button size="lg">
                  Start Verification Process
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-taupe/10 pb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Search className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-forestDark">Insurance Discovery Initiated</p>
                      <p className="text-sm text-forestDark-light">Basic patient information used to search for coverage</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-forestDark">Today, 10:32 AM</p>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Complete
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b border-taupe/10 pb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-forestDark">3 Potential Coverages Found</p>
                      <p className="text-sm text-forestDark-light">Delta Dental, Cigna, and Aetna coverage identified</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-forestDark">Today, 10:32 AM</p>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Complete
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium text-forestDark">Insurance Verification</p>
                      <p className="text-sm text-forestDark-light">Verification of selected coverage pending</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-forestDark">Today, 10:33 AM</p>
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                      <Clock className="mr-1 h-3 w-3" />
                      Pending
                    </Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

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
              <h4 className="font-medium text-forestDark">Time Saved: 25 minutes</h4>
              <p className="text-sm text-forestDark-light">Insurance discovery completed in 5 seconds vs. traditional 25-minute process</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
