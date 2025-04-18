import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertCircle,
  ArrowLeft,
  CheckCircle, 
  ChevronRight,
  Clock, 
  FileText, 
  Info,
  Search, 
  Settings, 
  Shield,
  Upload,
  UserCircle, 
  XCircle 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ClaimSubmission() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Navigation - Needs update for light theme */}
      <div className="w-64 bg-lightBeige text-forestDark p-4 flex flex-col border-r border-taupe/20">
        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center text-forestGreen">
            <img src="/logo.svg" alt="Chasm Logo" className="w-8 h-8 mr-2" />
            Chasm
          </h1>
        </div>
        
        <nav className="space-y-1 flex-1">
          <a href="#" className="flex items-center px-4 py-3 text-forestDark hover:bg-forestGreen/10 rounded-md">
            <FileText className="w-5 h-5 mr-3" />
            Dashboard
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-forestDark hover:bg-forestGreen/10 rounded-md">
            <Shield className="w-5 h-5 mr-3" />
            Insurance Verification
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-forestDark hover:bg-forestGreen/10 rounded-md">
            <UserCircle className="w-5 h-5 mr-3" />
            Patients
          </a>
          <a href="#" className="flex items-center px-4 py-3 bg-forestGreen text-white rounded-md">
            <FileText className="w-5 h-5 mr-3" />
            Claims
          </a>
        </nav>
        
        <div className="mt-auto">
          <a href="#" className="flex items-center px-4 py-3 text-forestDark hover:bg-forestGreen/10 rounded-md">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </a>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Use bg-white, adjust text, remove dark: */}
        <header className="bg-white border-b border-taupe/20 h-16 flex items-center justify-between px-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-xl font-semibold text-forestDark">Submit New Claim</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-forestGreen/20 flex items-center justify-center text-forestGreen font-medium">
              JD
            </div>
          </div>
        </header>
        
        {/* Content Area - Use bg-background, remove dark: */}
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          <div className="max-w-5xl mx-auto">
            {/* Progress Indicator - Adjust colors */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-forestGreen">Step 2 of 4: Claim Details</span>
                <span className="text-sm text-taupe">50% Complete</span>
              </div>
              {/* Use primary color for progress bar fill */}
              <Progress value={50} className="h-2 bg-taupe/20 [&>div]:bg-forestGreen" />
            </div>
            
            {/* Form Tabs - Adjust bg/border/trigger styles, remove dark: */}
            <Tabs defaultValue="claim-details" className="mb-8">
              <TabsList className="grid grid-cols-4 bg-white border border-taupe/20">
                <TabsTrigger value="patient-info" className="data-[state=active]:bg-forestGreen/10 data-[state=active]:text-forestGreen text-forestDark">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-forestGreen" />
                    <span>Patient Info</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="claim-details" className="data-[state=active]:bg-forestGreen/10 data-[state=active]:text-forestGreen text-forestDark">
                  <div className="flex items-center">
                    <span className="w-5 h-5 rounded-full bg-forestGreen text-white text-xs flex items-center justify-center mr-2">2</span>
                    <span>Claim Details</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="attachments" className="text-taupe" disabled>
                  <div className="flex items-center">
                    <span className="w-5 h-5 rounded-full bg-taupe/40 text-white text-xs flex items-center justify-center mr-2">3</span>
                    <span>Attachments</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="review" className="text-taupe" disabled>
                  <div className="flex items-center">
                    <span className="w-5 h-5 rounded-full bg-taupe/40 text-white text-xs flex items-center justify-center mr-2">4</span>
                    <span>Review & Submit</span>
                  </div>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="patient-info" className="mt-6">
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>Patient Information</CardTitle>
                    <CardDescription>
                      Basic patient and insurance details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-taupe">Patient information form (completed)</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="claim-details" className="mt-6">
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>Claim Details</CardTitle>
                    <CardDescription>
                      Enter procedure and diagnostic information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Service Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-forestDark">Service Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="service-date">Date of Service</Label>
                          <Input id="service-date" type="date" defaultValue="2025-04-16" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="place-of-service">Place of Service</Label>
                          <Select defaultValue="office">
                            <SelectTrigger id="place-of-service">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="office">Office (11)</SelectItem>
                              <SelectItem value="hospital">Hospital (21)</SelectItem>
                              <SelectItem value="asc">Ambulatory Surgical Center (24)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="procedures">Procedures</Label>
                          <Button variant="ghost" size="sm" className="h-8 text-forestGreen">
                            + Add Procedure
                          </Button>
                        </div>
                        
                        <div className="rounded-md border border-taupe/30 divide-y divide-taupe/10">
                          {/* Procedure 1 */}
                          <div className="p-4 bg-white">
                            <div className="flex justify-between mb-4">
                              <h4 className="font-medium text-forestDark">Procedure 1</h4>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="cdt-code-1">CDT Code</Label>
                                <div className="relative">
                                  <Input id="cdt-code-1" defaultValue="D2740" />
                                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-forestGreen/10 text-forestGreen text-xs px-2 py-1 rounded-full">
                                    Crown
                                  </div>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="tooth-number-1">Tooth Number</Label>
                                <Input id="tooth-number-1" defaultValue="19" />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="fee-1">Fee</Label>
                                <Input id="fee-1" defaultValue="1200.00" />
                              </div>
                            </div>
                          </div>
                          
                          {/* Procedure 2 */}
                          <div className="p-4 bg-white">
                            <div className="flex justify-between mb-4">
                              <h4 className="font-medium text-forestDark">Procedure 2</h4>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="cdt-code-2">CDT Code</Label>
                                <div className="relative">
                                  <Input id="cdt-code-2" defaultValue="D0220" />
                                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-forestGreen/10 text-forestGreen text-xs px-2 py-1 rounded-full">
                                    X-ray
                                  </div>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="tooth-number-2">Tooth Number</Label>
                                <Input id="tooth-number-2" defaultValue="19" />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="fee-2">Fee</Label>
                                <Input id="fee-2" defaultValue="65.00" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Diagnosis Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-forestDark">Diagnosis Information</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="diagnosis-code">Diagnosis Code (ICD-10)</Label>
                        <div className="relative">
                          <Input id="diagnosis-code" defaultValue="K02.9" />
                          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-forestGreen/10 text-forestGreen text-xs px-2 py-1 rounded-full">
                            Dental caries, unspecified
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="diagnosis-notes">Additional Notes</Label>
                        <Textarea id="diagnosis-notes" placeholder="Enter any additional notes..." />
                      </div>
                    </div>
                    
                    {/* AI Validation Results */}
                    <div className="bg-green-50 border border-green-200 rounded-md p-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-forestDark">AI Validation Passed</h4>
                          <p className="text-sm text-taupe mt-1">
                            All procedures and diagnoses are properly coded and documented. No issues detected.
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge variant="outline" className="bg-green-100/50 text-green-800 border-green-200">
                              Proper Documentation
                            </Badge>
                            <Badge variant="outline" className="bg-green-100/50 text-green-800 border-green-200">
                              Valid CDT Codes
                            </Badge>
                            <Badge variant="outline" className="bg-green-100/50 text-green-800 border-green-200">
                              Diagnosis Matches Procedure
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">
                      Back to Patient Info
                    </Button>
                    <Button>
                      Continue to Attachments
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="attachments" className="mt-6">
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>Attachments</CardTitle>
                    <CardDescription>
                      Upload supporting documentation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-taupe">Attachments form (not yet available)</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="review" className="mt-6">
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>Review & Submit</CardTitle>
                    <CardDescription>
                      Review claim information before submission
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-taupe">Review form (not yet available)</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            {/* Claim Submission Tips - Use bg-white, adjust text, remove dark: */}
            <Card className="bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-forestDark">Claim Submission Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex">
                    <Info className="w-5 h-5 text-forestGreen mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm text-taupe">
                      <span className="font-medium text-forestDark">Proper documentation is key.</span> Ensure all procedures are properly documented with appropriate CDT codes and supporting diagnosis.
                    </p>
                  </div>
                  
                  <div className="flex">
                    <Info className="w-5 h-5 text-forestGreen mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm text-taupe">
                      <span className="font-medium text-forestDark">Include relevant X-rays.</span> For crown procedures, pre-operative X-rays are typically required by insurance companies.
                    </p>
                  </div>
                  
                  <div className="flex">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm text-taupe">
                      <span className="font-medium text-forestDark">Verify insurance benefits.</span> This patient has a $50 deductible remaining and 80% coverage for major procedures.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
