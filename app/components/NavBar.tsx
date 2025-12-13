'use client'
import React, { useState } from 'react';
import { Menu, X, Sprout, Brain, Dna, BarChart, Search, User, ChevronDown, Globe, Shield, CloudRain, Bug, Droplets } from 'lucide-react';
import logo from "../../assets/logo.png";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navItems = [
    {
      label: 'AI Tools',
      icon: <Brain className="w-4 h-4" />,
      dropdown: [
        { label: 'Hybrid Prediction', description: 'Predict hybridization success' },
        { label: 'Trait Forecasting', description: 'Forecast drought tolerance' },
        { label: 'Pair Ranking', description: 'Rank plant pairs by potential' },
        { label: 'Trait Analysis', description: 'Analyze multiple traits' }
      ]
    },
    {
      label: 'Plant Database',
      icon: <Sprout className="w-4 h-4" />,
      dropdown: [
        { label: 'Plant Traits', description: 'Perenniality, woodiness, pollination' },
        { label: 'Climate Adaptation', description: 'Saharan, Coastal, High Plateau' },
        { label: 'Hybrid Records', description: 'Historical success/failure data' },
        { label: 'Species Library', description: 'Comprehensive plant species' }
      ]
    },
    {
      label: 'Trait Solutions',
      icon: <Dna className="w-4 h-4" />,
      dropdown: [
        { 
          label: 'Drought Tolerance', 
          description: 'Water-efficient varieties',
          icon: <CloudRain className="w-4 h-4" />
        },
        { 
          label: 'Disease Resistance', 
          description: 'Pathogen-resistant crops',
          icon: <Shield className="w-4 h-4" />
        },
        { 
          label: 'Salinity Tolerance', 
          description: 'Salt-resistant plants',
          icon: <Droplets className="w-4 h-4" />
        },
        { 
          label: 'Pest Resistance', 
          description: 'Insect-resistant varieties',
          icon: <Bug className="w-4 h-4" />
        }
      ]
    },
    {
      label: 'Research',
      icon: <BarChart className="w-4 h-4" />,
      dropdown: [
        { label: 'Methodology', description: 'Scientific approach & models' },
        { label: 'Case Studies', description: 'Real breeding applications' },
        { label: 'Publications', description: 'Research papers & findings' },
        { label: 'Data Analysis', description: 'Advanced analytics tools' }
      ]
    },
    { label: 'Climate Zones', icon: <Globe className="w-4 h-4" /> }
  ];

  return (
    <>
      {/* Announcement Bar - Now about plant breeding solutions */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-2 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm text-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></div>
            <span className="font-bold">NEW: </span>
            <span className="ml-2">AI-Powered Plant Breeding Platform • </span>
            <span className="ml-2">Reduce breeding failure rates by 40%</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-background-dark shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className=" rounded-xl">
                <img src={logo.src} alt="PlantAIBreed Logo" className="w-15 h-15 object-contain" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 tracking-tight">
                  
                  
                  Tahjin<span className="text-primary-600">LAB</span>
                </div>
                <div className="text-xs text-gray-600 font-medium">Intelligent Hybridization Platform</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-2 px-4 py-3 rounded-lg text-gray-700 hover:text-primary-700 hover:bg-primary-50 transition-all duration-200 font-medium">
                    {item.icon && item.icon}
                    <span>{item.label}</span>
                    {item.dropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    )}
                  </button>

                  {item.dropdown && activeDropdown === item.label && (
                    <div className="absolute left-0 mt-1 w-72 bg-white rounded-xl shadow-2xl border border-background-dark py-3 z-50 animate-in slide-in-from-top-5 duration-200">
                      {item.dropdown.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href="#"
                          className="flex items-start px-4 py-3 hover:bg-primary-50 transition-colors group/item gap-3"
                        >
                          {subItem.icon && (
                            <div className="p-1.5 rounded-lg bg-primary-100 text-primary-600">
                              {subItem.icon}
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900 group-hover/item:text-primary-700">
                              {subItem.label}
                            </span>
                            <span className="text-sm text-gray-600 mt-1">
                              {subItem.description}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side - Platform Specific */}
            <div className="hidden lg:flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-background-light transition-colors">
                <Search className="w-5 h-5" />
                <span className="font-medium">Search Plants</span>
              </button>
              
              <button className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-accent-green hover:from-primary-700 hover:to-accent-green/90 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg">
                Start Analysis
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-background-light transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />
            }
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden bg-white border-t border-background-dark mt-2 rounded-b-2xl shadow-xl animate-in slide-in-from-top duration-300">
              <div className="py-4">
                <div className="space-y-1">
                  {navItems.map((item, index) => (
                    <div key={index} className="border-b border-background-light last:border-0">
                      <button
                        onClick={() => setActiveDropdown(
                          activeDropdown === item.label ? null : item.label
                        )}
                        className="flex items-center justify-between w-full px-4 py-4 text-left hover:bg-primary-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {item.icon && item.icon}
                          <span className="font-medium text-gray-900">{item.label}</span>
                        </div>
                        {item.dropdown && (
                          <ChevronDown className={`w-5 h-5 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                        )}
                      </button>
                      
                      {item.dropdown && activeDropdown === item.label && (
                        <div className="bg-background-light px-4 py-2 space-y-2">
                          {item.dropdown.map((subItem, subIndex) => (
                            <a
                              key={subIndex}
                              href="#"
                              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-white transition-colors"
                            >
                              {subItem.icon && (
                                <div className="p-1.5 rounded-lg bg-primary-100 text-primary-600">
                                  {subItem.icon}
                                </div>
                              )}
                              <div>
                                <div className="font-medium text-gray-900">{subItem.label}</div>
                                <div className="text-sm text-gray-600 mt-1">{subItem.description}</div>
                              </div>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="px-4 py-6 space-y-4 border-t border-background-dark mt-4">
                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-secondary-300 rounded-lg font-medium hover:border-primary-500 transition-colors">
                      <Search className="w-5 h-5" />
                      Search Plants
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-primary-600 to-accent-green text-white rounded-lg font-semibold py-3 transition-colors">
                      Start Analysis
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;