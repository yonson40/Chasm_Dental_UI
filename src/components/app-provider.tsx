import React, { useState } from 'react';
import { ThemeProvider } from '@/lib/theme-provider';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileCheck, 
  Users, 
  Search, 
  CheckSquare, 
  Activity, 
  DollarSign, 
  FileText,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider defaultTheme="light">
      {children}
    </ThemeProvider>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { 
      path: '/', 
      name: 'Dashboard', 
      icon: <Home className="h-5 w-5" /> 
    },
    { 
      section: 'patients',
      name: 'Patient Management',
      icon: <Users className="h-5 w-5" />,
      items: [
        { 
          path: '/patient-onboarding', 
          name: 'Patient Onboarding', 
          icon: <Users className="h-4 w-4" /> 
        },
      ]
    },
    { 
      section: 'insurance',
      name: 'Insurance',
      icon: <FileCheck className="h-5 w-5" />,
      items: [
        { 
          path: '/insurance-verification', 
          name: 'Insurance Verification', 
          icon: <CheckSquare className="h-4 w-4" /> 
        },
        { 
          path: '/insurance-discovery', 
          name: 'Insurance Discovery', 
          icon: <Search className="h-4 w-4" /> 
        },
        { 
          path: '/network-status', 
          name: 'Network Status', 
          icon: <Activity className="h-4 w-4" /> 
        },
      ]
    },
    { 
      section: 'claims',
      name: 'Claims',
      icon: <FileText className="h-5 w-5" />,
      items: [
        { 
          path: '/claim-submission', 
          name: 'Claim Submission', 
          icon: <FileText className="h-4 w-4" /> 
        },
        { 
          path: '/pre-submission-validation', 
          name: 'Pre-submission Validation', 
          icon: <CheckSquare className="h-4 w-4" /> 
        },
        { 
          path: '/document-retrieval', 
          name: 'Document Retrieval', 
          icon: <FileText className="h-4 w-4" /> 
        },
      ]
    },
    { 
      section: 'financial',
      name: 'Financial',
      icon: <DollarSign className="h-5 w-5" />,
      items: [
        { 
          path: '/cost-estimator', 
          name: 'Cost Estimator', 
          icon: <DollarSign className="h-4 w-4" /> 
        },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-taupe/20 bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-forestGreen">
              Chasm
            </h1>
            <span className="ml-2 text-xs bg-forestGreen text-white px-2 py-0.5 rounded">
              Dental Billing
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-1.5 rounded-md border border-input bg-background text-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        <aside className="hidden md:block w-64 border-r border-taupe/20 bg-lightBeige h-[calc(100vh-60px)] sticky top-[60px] overflow-y-auto">
          <nav className="p-4 space-y-1">
            {navItems.map((item, index) => {
              if ('path' in item) {
                const path = item.path as string;
                return (
                <Link
                  key={index}
                    to={path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                      isActive(path)
                      ? 'bg-forestGreen text-white'
                        : 'text-forestDark hover:bg-forestGreen/10'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
                );
              } else {
                return (
                <div key={index}>
                  <button
                    onClick={() => toggleSection(item.section)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-md text-forestDark hover:bg-forestGreen/10 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${
                      expandedSection === item.section ? 'transform rotate-180' : ''
                    }`} />
                  </button>
                  
                  {expandedSection === item.section && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.items.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                            isActive(subItem.path)
                              ? 'bg-forestGreen text-white'
                                : 'text-forestDark hover:bg-forestGreen/10'
                          }`}
                        >
                          {subItem.icon}
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                );
              }
            })}
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-6 max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
