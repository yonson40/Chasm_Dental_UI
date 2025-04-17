import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { AlertCircle, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';

// Mock state options
const stateOptions = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  // Add other states as needed
];

export default function PatientOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [patientData, setPatientData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    state: 'CA',
    email: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientData(prev => ({ ...prev, [name]: value }));
  };

  const handleStateChange = (value: string) => {
    setPatientData(prev => ({ ...prev, state: value }));
  };

  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blueBlack dark:text-beige">New Patient Onboarding</h1>
      </div>

      {/* Progress Steps */}
      <div className="flex mb-8 relative">
        {/* Progress bar background */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted transform -translate-y-1/2 z-0"></div>
        
        {/* Steps */}
        {[
          'Patient Information', 
          'Insurance Discovery', 
          'Verification', 
          'Complete'
        ].map((step, index) => (
          <div key={index} className="flex-1 flex flex-col items-center relative z-10">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 
                ${currentStep > index + 1 
                  ? 'bg-forestGreen text-white' 
                  : currentStep === index + 1 
                    ? 'bg-mossGreen text-white' 
                    : 'bg-lightBeige text-forestDark border border-forestLight'}`}
            >
              {currentStep > index + 1 ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                index + 1
              )}
            </div>
            <span className={`text-xs text-center px-2 ${currentStep === index + 1 ? 'font-medium text-forestDark' : 'text-muted-foreground'}`}>
              {step}
            </span>
          </div>
        ))}
      </div>

      {/* Step 1: Patient Information */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Basic Patient Information</CardTitle>
            <CardDescription>
              Enter minimal patient information to begin the insurance discovery process.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-blue-500 mr-2" />
                <p className="text-sm text-blue-700">
                  Only basic information is needed to start. We'll use AI to discover insurance details.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  name="firstName" 
                  value={patientData.firstName} 
                  onChange={handleInputChange}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  name="lastName" 
                  value={patientData.lastName} 
                  onChange={handleInputChange}
                  placeholder="Smith"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input 
                  id="dateOfBirth" 
                  name="dateOfBirth" 
                  type="date" 
                  value={patientData.dateOfBirth} 
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select 
                  id="state" 
                  value={patientData.state} 
                  onValueChange={handleStateChange}
                >
                  {stateOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={patientData.email} 
                onChange={handleInputChange}
                placeholder="john.smith@example.com"
              />
            </div>

            <div className="space-y-2 mb-8">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone" 
                value={patientData.phone} 
                onChange={handleInputChange}
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleNextStep}>
                Continue to Insurance Discovery
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Insurance Discovery */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Insurance Discovery</CardTitle>
            <CardDescription>
              Our AI-powered system is searching for potential insurance coverage with minimal information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r">
              <div className="flex">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <p className="text-sm text-green-700">
                  We found 3 potential insurance coverages for {patientData.firstName || 'John'} {patientData.lastName || 'Smith'}.
                </p>
              </div>
            </div>

            {/* Insurance Options */}
            <div className="space-y-4 mb-8">
              <div className="border rounded-lg p-4 bg-lightBeige border-forestGreen">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4">
                      <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L4 8v12h5V10h6v10h5V8L12 2z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Delta Dental PPO</h3>
                      <p className="text-sm text-muted-foreground">Member ID: DDN123456789</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    95% Confidence
                  </span>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4">
                      <svg className="w-8 h-8 text-blue-900" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Cigna Dental</h3>
                      <p className="text-sm text-muted-foreground">Member ID: CGN987654321</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                    75% Confidence
                  </span>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4">
                      <svg className="w-8 h-8 text-red-900" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 5c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 10.2c-1.25 1.9-3.41 3-8 3-4.59 0-6.75-1.1-8-3-.33-.5-.33-1.2 0-1.7 1.25-1.9 3.41-3 8-3 4.59 0 6.75 1.1 8 3 .33.5.33 1.2 0 1.7z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Aetna Dental</h3>
                      <p className="text-sm text-muted-foreground">Member ID: AET567891234</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                    45% Confidence
                  </span>
                </div>
              </div>
            </div>

            {/* Selected Insurance Details */}
            <div className="bg-lightBeige p-6 rounded-lg mb-8">
              <h3 className="font-medium text-lg mb-4">Selected Insurance Details</h3>
              
              <div className="space-y-3">
                <div className="flex border-b border-forestLight pb-2">
                  <span className="w-1/3 font-medium">Insurance Provider</span>
                  <span className="w-2/3">Delta Dental</span>
                </div>
                <div className="flex border-b border-forestLight pb-2">
                  <span className="w-1/3 font-medium">Plan Type</span>
                  <span className="w-2/3">PPO</span>
                </div>
                <div className="flex border-b border-forestLight pb-2">
                  <span className="w-1/3 font-medium">Member ID</span>
                  <span className="w-2/3">DDN123456789</span>
                </div>
                <div className="flex border-b border-forestLight pb-2">
                  <span className="w-1/3 font-medium">Group Number</span>
                  <span className="w-2/3">GRP12345</span>
                </div>
                <div className="flex border-b border-forestLight pb-2">
                  <span className="w-1/3 font-medium">Coverage Start Date</span>
                  <span className="w-2/3">01/01/2025</span>
                </div>
                <div className="flex">
                  <span className="w-1/3 font-medium">Coverage End Date</span>
                  <span className="w-2/3">12/31/2025</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={handleNextStep}>
                Verify Selected Insurance
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Verification */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Insurance Verification</CardTitle>
            <CardDescription>
              Verifying insurance coverage details and benefits.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r">
              <div className="flex">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <p className="text-sm text-green-700">
                  Insurance verification successful! Coverage is active and benefits are available.
                </p>
              </div>
            </div>

            {/* Insurance Card */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <div className="flex">
                <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center mr-6">
                  <svg className="w-10 h-10 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L4 8v12h5V10h6v10h5V8L12 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-blue-900">Delta Dental PPO</h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm"><strong>Member:</strong> {patientData.firstName || 'John'} {patientData.lastName || 'Smith'}</p>
                    <p className="text-sm"><strong>Member ID:</strong> DDN123456789</p>
                    <p className="text-sm"><strong>Group:</strong> GRP12345</p>
                    <p className="text-sm"><strong>Plan:</strong> Premium PPO</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Summary */}
            <div className="mb-8">
              <h3 className="font-medium text-lg mb-4">Benefits Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between border-b border-forestLight pb-2">
                  <span className="font-medium">Annual Maximum</span>
                  <span className="font-medium text-forestGreen">$2,000</span>
                </div>
                <div className="flex justify-between border-b border-forestLight pb-2">
                  <span className="font-medium">Remaining Benefit</span>
                  <span className="font-medium text-forestGreen">$1,850</span>
                </div>
                <div className="flex justify-between border-b border-forestLight pb-2">
                  <span className="font-medium">Deductible</span>
                  <span className="font-medium text-forestGreen">$50 (Met)</span>
                </div>
                <div className="flex justify-between border-b border-forestLight pb-2">
                  <span className="font-medium">Preventive Coverage</span>
                  <span className="font-medium text-forestGreen">100%</span>
                </div>
                <div className="flex justify-between border-b border-forestLight pb-2">
                  <span className="font-medium">Basic Coverage</span>
                  <span className="font-medium text-forestGreen">80%</span>
                </div>
                <div className="flex justify-between border-b border-forestLight pb-2">
                  <span className="font-medium">Major Coverage</span>
                  <span className="font-medium text-forestGreen">50%</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Orthodontic Coverage</span>
                  <span className="font-medium text-forestGreen">50% ($1,500 lifetime)</span>
                </div>
              </div>
            </div>

            {/* Time Saved Indicator */}
            <div className="bg-green-50 p-4 rounded-lg flex items-center mb-8">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Time Saved: 28 minutes</h4>
                <p className="text-sm text-muted-foreground">Verification completed in 2 seconds vs. traditional 30-minute process</p>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={handleNextStep}>
                Complete Onboarding
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Complete */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Onboarding Complete</CardTitle>
            <CardDescription>
              Patient has been successfully added to the system with verified insurance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold mb-2">Patient Onboarding Successful!</h2>
              <p className="text-muted-foreground mb-8">
                {patientData.firstName || 'John'} {patientData.lastName || 'Smith'} has been added to your practice with verified Delta Dental PPO insurance.
              </p>
              
              <div className="flex flex-col space-y-4 max-w-md mx-auto">
                <Button>
                  View Patient Profile
                </Button>
                <Button variant="outline">
                  Schedule Appointment
                </Button>
                <Button variant="outline">
                  Return to Dashboard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
