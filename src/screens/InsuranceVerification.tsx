import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';

const InsuranceVerification: React.FC = () => {
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verifying' | 'verified' | 'failed'>('pending');
  const [activeTab, setActiveTab] = useState('scan');

  const handleVerify = () => {
    setVerificationStatus('verifying');
    
    // Simulate verification process
    setTimeout(() => {
      setVerificationStatus('verified');
    }, 2000);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-forest-green-dark">Insurance Verification</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Patient Name</label>
              <input 
                type="text" 
                className="w-full p-2 border border-forest-taupe rounded-md" 
                value="John Smith" 
                readOnly 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date of Birth</label>
              <input 
                type="text" 
                className="w-full p-2 border border-forest-taupe rounded-md" 
                value="05/15/1980" 
                readOnly 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Patient ID</label>
              <input 
                type="text" 
                className="w-full p-2 border border-forest-taupe rounded-md" 
                value="P12345" 
                readOnly 
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {verificationStatus === 'verified' ? (
        <div className="space-y-6">
          <div className="flex items-center p-4 bg-forest-green-light/20 rounded-md border-l-4 border-forest-green">
            <div className="w-12 h-12 rounded-full bg-forest-green flex items-center justify-center text-white text-xl mr-4">
              ✓
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-forest-green">Verification Successful</h3>
              <p className="text-forest-taupe-dark">Insurance verified in 1.2 seconds</p>
              <p className="text-sm text-forest-taupe mt-1">Verified on April 16, 2025 at 2:44 PM</p>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Insurance Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex p-4 bg-forest-sand-light rounded-md mb-6">
                <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center mr-4">
                  <div className="text-forest-green font-bold">DD</div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-forest-navy">Delta Dental PPO</h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2 text-sm">
                    <div><span className="text-forest-taupe-dark">Member ID:</span> <strong>DD123456789</strong></div>
                    <div><span className="text-forest-taupe-dark">Group:</span> <strong>GRP987654</strong></div>
                    <div><span className="text-forest-taupe-dark">Effective Date:</span> <strong>01/01/2025</strong></div>
                    <div><span className="text-forest-taupe-dark">Plan Type:</span> <strong>PPO</strong></div>
                  </div>
                </div>
              </div>
              
              <h3 className="font-semibold mb-3">Benefits Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-forest-taupe">
                  <span>Preventive Care</span>
                  <span className="font-semibold text-forest-green">100% Covered</span>
                </div>
                <div className="flex justify-between py-2 border-b border-forest-taupe">
                  <span>Basic Procedures</span>
                  <span className="font-semibold text-forest-green">80% Covered</span>
                </div>
                <div className="flex justify-between py-2 border-b border-forest-taupe">
                  <span>Major Procedures</span>
                  <span className="font-semibold text-forest-green">50% Covered</span>
                </div>
                <div className="flex justify-between py-2 border-b border-forest-taupe">
                  <span>Orthodontics</span>
                  <span className="font-semibold text-forest-green">50% Covered</span>
                </div>
                <div className="flex justify-between py-2 border-b border-forest-taupe">
                  <span>Annual Maximum</span>
                  <span className="font-semibold text-forest-navy">$2,000</span>
                </div>
                <div className="flex justify-between py-2 border-b border-forest-taupe">
                  <span>Deductible</span>
                  <span className="font-semibold text-forest-navy">$50 Individual / $150 Family</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Remaining Benefit</span>
                  <span className="font-semibold text-forest-navy">$1,750</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full">
                <Button variant="outline">Print Details</Button>
                <Button className="bg-forest-green hover:bg-forest-green-dark">
                  View Network Status
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <div className="bg-forest-sand-light p-4 rounded-md border-l-4 border-forest-green flex items-center">
            <div className="text-forest-green text-xl mr-3">⏱️</div>
            <div>
              <h3 className="font-medium">Time Saved</h3>
              <p className="text-sm text-forest-taupe-dark">Traditional verification would have taken 15-30 minutes. Chasm saved you approximately 29 minutes.</p>
            </div>
          </div>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Verify Insurance</CardTitle>
              {verificationStatus === 'verifying' && (
                <Badge className="bg-forest-taupe text-white">Verifying...</Badge>
              )}
            </div>
            <CardDescription>
              Choose a verification method below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="scan">Scan Card</TabsTrigger>
                <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                <TabsTrigger value="auto">Auto-Discovery</TabsTrigger>
              </TabsList>
              
              <TabsContent value="scan" className="mt-4">
                <div className="border-2 border-dashed border-forest-taupe p-8 rounded-md text-center cursor-pointer hover:border-forest-green hover:bg-forest-green-light/5 transition-colors">
                  <div className="text-4xl mb-3 text-forest-green">📷</div>
                  <p className="text-forest-taupe-dark font-medium mb-4">Click to scan insurance card or drag and drop image here</p>
                  <div className="space-x-2">
                    <Button variant="outline" className="mr-2">Scan Card</Button>
                    <Button variant="outline">Upload Image</Button>
                  </div>
                </div>
                
                <div className="bg-forest-sand-light p-4 rounded-md mt-4 border-l-4 border-forest-green">
                  <p className="text-forest-navy">Position the insurance card within the frame and ensure all text is clearly visible.</p>
                </div>
                
                <div className="mt-6">
                  <Button 
                    className="w-full bg-forest-green hover:bg-forest-green-dark"
                    onClick={handleVerify}
                    disabled={verificationStatus === 'verifying'}
                  >
                    {verificationStatus === 'verifying' ? 'Verifying...' : 'Verify Insurance'}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="manual" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Insurance Provider</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-forest-taupe rounded-md" 
                    placeholder="e.g., Delta Dental"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Member ID</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-forest-taupe rounded-md" 
                      placeholder="Member ID"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Group Number</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-forest-taupe rounded-md" 
                      placeholder="Group Number"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Policyholder Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-forest-taupe rounded-md" 
                    placeholder="If different from patient"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Relationship to Patient</label>
                    <select className="w-full p-2 border border-forest-taupe rounded-md">
                      <option value="self">Self</option>
                      <option value="spouse">Spouse</option>
                      <option value="child">Child</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Plan Type</label>
                    <select className="w-full p-2 border border-forest-taupe rounded-md">
                      <option value="ppo">PPO</option>
                      <option value="hmo">HMO</option>
                      <option value="epo">EPO</option>
                      <option value="pos">POS</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button 
                    className="w-full bg-forest-green hover:bg-forest-green-dark"
                    onClick={handleVerify}
                    disabled={verificationStatus === 'verifying'}
                  >
                    {verificationStatus === 'verifying' ? 'Verifying...' : 'Verify Insurance'}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="auto" className="space-y-4 mt-4">
                <div className="bg-forest-sand-light p-4 rounded-md border-l-4 border-forest-green mb-4">
                  <p className="text-forest-navy">Our AI-powered insurance discovery service can find patient insurance with minimal information.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Patient Name</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-forest-taupe rounded-md" 
                      value="John Smith"
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date of Birth</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-forest-taupe rounded-md" 
                      value="05/15/1980"
                      readOnly
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">State of Residence</label>
                  <select className="w-full p-2 border border-forest-taupe rounded-md">
                    <option value="">Select state</option>
                    <option value="CA">California</option>
                    <option value="NY">New York</option>
                    <option value="TX">Texas</option>
                    {/* More states would be listed here */}
                  </select>
                </div>
                
                <div className="mt-6">
                  <Button 
                    className="w-full bg-forest-green hover:bg-forest-green-dark"
                    onClick={handleVerify}
                    disabled={verificationStatus === 'verifying'}
                  >
                    {verificationStatus === 'verifying' ? 'Discovering Insurance...' : 'Discover & Verify Insurance'}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
      
      {verificationStatus === 'pending' && (
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Verification History</h3>
          <div className="bg-white rounded-md shadow-sm">
            <div className="border-b border-forest-taupe p-3 flex">
              <div className="w-32 text-sm text-forest-taupe-dark">Apr 10, 2025</div>
              <div className="flex-1">Verified Delta Dental PPO</div>
              <div className="w-24 text-right font-medium text-forest-green">Verified</div>
            </div>
            <div className="border-b border-forest-taupe p-3 flex">
              <div className="w-32 text-sm text-forest-taupe-dark">Jan 15, 2025</div>
              <div className="flex-1">Verified Delta Dental PPO</div>
              <div className="w-24 text-right font-medium text-forest-green">Verified</div>
            </div>
            <div className="p-3 flex">
              <div className="w-32 text-sm text-forest-taupe-dark">Oct 05, 2024</div>
              <div className="flex-1">Verified Delta Dental PPO</div>
              <div className="w-24 text-right font-medium text-forest-green">Verified</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsuranceVerification;
