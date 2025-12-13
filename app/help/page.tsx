"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  HelpCircle, Search, ChevronRight, MessageSquare,
  Phone, Mail, FileText, Video, Users, BookOpen,
  Download, Globe, ChevronDown, Star, Clock,
  CheckCircle, AlertCircle, Info, ExternalLink,
  Maximize2, Minimize2, X, Send,Eye
} from "lucide-react";
import NavBar from "../components/NavBar";

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  // FAQ data
  const faqs = [
    {
      id: 1,
      question: "How do I create a new discharge record?",
      answer: "Navigate to the Discharges page and click 'New Discharge'. Fill in the patient information, discharge details, and required documentation. Make sure to review all information before submitting.",
      category: "discharges",
      views: 245
    },
    {
      id: 2,
      question: "How can I export patient reports?",
      answer: "Go to the Reports section, select the reports you want to export, and click the 'Export' button. You can choose between PDF, CSV, or Excel formats. Make sure you have the necessary permissions to export sensitive data.",
      category: "reports",
      views: 189
    },
    {
      id: 3,
      question: "What should I do if I forget my password?",
      answer: "Click on 'Forgot Password' on the login page. Enter your registered email address and follow the instructions sent to your email. If you don't receive the email within 15 minutes, check your spam folder or contact IT support.",
      category: "account",
      views: 312
    },
    {
      id: 4,
      question: "How do I schedule a follow-up appointment?",
      answer: "Open the patient's profile, go to the 'Appointments' tab, and click 'Schedule Follow-up'. Select the date, time, and type of appointment. The system will notify both the patient and assigned staff members.",
      category: "appointments",
      views: 156
    },
    {
      id: 5,
      question: "Can I access the system on mobile devices?",
      answer: "Yes, the system is fully responsive and works on all mobile devices. For the best experience, we recommend using the latest version of Chrome, Safari, or Firefox on your mobile browser.",
      category: "technical",
      views: 278
    },
    {
      id: 6,
      question: "How do I update patient information?",
      answer: "Navigate to the Patients page, find the patient you want to update, click on their name to open their profile, and click the 'Edit' button. Make your changes and save. Note that some fields may require supervisor approval.",
      category: "patients",
      views: 203
    },
    {
      id: 7,
      question: "What is the average discharge processing time?",
      answer: "The average discharge process takes 2-4 hours from initiation to completion. However, this can vary based on patient complexity, documentation requirements, and department workflows.",
      category: "discharges",
      views: 178
    },
    {
      id: 8,
      question: "How do I generate performance reports?",
      answer: "Go to Reports > Analytics, select the metrics you want to include, choose your date range, and click 'Generate Report'. You can save report templates for future use.",
      category: "reports",
      views: 142
    }
  ];

  const categories = [
    { id: "all", label: "All Topics", count: 45 },
    { id: "discharges", label: "Discharges", count: 12 },
    { id: "patients", label: "Patient Care", count: 8 },
    { id: "reports", label: "Reports", count: 10 },
    { id: "account", label: "Account", count: 7 },
    { id: "technical", label: "Technical", count: 5 },
    { id: "appointments", label: "Appointments", count: 3 },
  ];

  const quickLinks = [
    { title: "User Manual", icon: BookOpen, description: "Complete guide to all features", link: "#" },
    { title: "Video Tutorials", icon: Video, description: "Step-by-step video guides", link: "#" },
    { title: "Training Schedule", icon: Clock, description: "Upcoming training sessions", link: "#" },
    { title: "System Updates", icon: Download, description: "Latest features and fixes", link: "#" },
  ];

  const supportChannels = [
    { type: "Live Chat", icon: MessageSquare, description: "Chat with support agent", response: "Typically replies in 5 min", color: "bg-blue-500" },
    { type: "Phone Support", icon: Phone, description: "Call our support line", response: "24/7 availability", color: "bg-green-500" },
    { type: "Email", icon: Mail, description: "Send us an email", response: "Response within 4 hours", color: "bg-orange-500" },
    { type: "Community", icon: Users, description: "Ask the community", response: "Peer-to-peer support", color: "bg-purple-500" },
  ];

  const tutorials = [
    { title: "Getting Started", duration: "5 min", level: "Beginner", views: "1.2k" },
    { title: "Discharge Workflow", duration: "12 min", level: "Intermediate", views: "845" },
    { title: "Report Generation", duration: "8 min", level: "Beginner", views: "923" },
    { title: "Advanced Analytics", duration: "15 min", level: "Advanced", views: "521" },
  ];

  const filteredFAQs = faqs.filter(faq => {
    if (activeCategory !== "all" && faq.category !== activeCategory) return false;
    if (searchTerm && !faq.question.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      console.log("Sending message:", chatMessage);
      setChatMessage("");
    }
  };

  return (
    <NavBar>
      <div className="min-h-screen bg-gray-50 p-3 md:p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center">
                  <HelpCircle className="h-4 w-4 text-orange-600" />
                </div>
                <h1 className="text-xl font-bold text-gray-800">Help & Support</h1>
              </div>
              <p className="text-gray-600 text-xs mt-0.5">Get help, find answers, and learn how to use the system</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1.5"
              onClick={() => setIsChatOpen(true)}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              Live Chat
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles, FAQs, or guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-4">
              <div className="p-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800">Browse by Category</h3>
              </div>
              <div className="p-3">
                <nav className="space-y-1">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center justify-between p-2 rounded text-sm transition-colors ${
                        activeCategory === category.id
                          ? "bg-orange-50 text-orange-700 border-l-3 border-orange-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <span>{category.label}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        activeCategory === category.id
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800">Quick Links</h3>
              </div>
              <div className="p-3">
                <div className="space-y-2">
                  {quickLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.link}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-left group"
                    >
                      <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <link.icon className="h-3.5 w-3.5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-800 truncate">{link.title}</p>
                        <p className="text-xs text-gray-500 truncate">{link.description}</p>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-gray-600" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - FAQs */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-4">
              <div className="p-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-800">Frequently Asked Questions</h3>
                  <span className="text-xs text-gray-500">{filteredFAQs.length} results</span>
                </div>
              </div>
              
              <div className="p-3">
                {filteredFAQs.length === 0 ? (
                  <div className="py-8 text-center">
                    <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h4 className="text-sm font-medium text-gray-900 mb-1">No results found</h4>
                    <p className="text-xs text-gray-500 mb-3">
                      Try adjusting your search or select a different category
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchTerm("");
                        setActiveCategory("all");
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredFAQs.map(faq => (
                      <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                          className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                                faq.category === 'discharges' ? 'bg-blue-100 text-blue-800' :
                                faq.category === 'reports' ? 'bg-green-100 text-green-800' :
                                faq.category === 'account' ? 'bg-purple-100 text-purple-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {faq.category}
                              </span>
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {faq.views} views
                              </span>
                            </div>
                            <h4 className="text-sm font-medium text-gray-800">{faq.question}</h4>
                          </div>
                          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${
                            expandedFAQ === faq.id ? 'rotate-180' : ''
                          }`} />
                        </button>
                        
                        {expandedFAQ === faq.id && (
                          <div className="p-3 border-t border-gray-200 bg-gray-50">
                            <p className="text-sm text-gray-600 mb-3">{faq.answer}</p>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" className="gap-1.5 text-xs h-7">
                                <Star className="h-3 w-3" />
                                Helpful
                              </Button>
                              <Button variant="outline" size="sm" className="gap-1.5 text-xs h-7">
                                <Info className="h-3 w-3" />
                                Learn More
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Support Channels */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-4">
              <div className="p-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800">Get Support</h3>
              </div>
              
              <div className="p-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {supportChannels.map((channel, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3 hover:border-orange-300 hover:bg-orange-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className={`${channel.color} p-2 rounded-lg`}>
                          <channel.icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-800 mb-1">{channel.type}</h4>
                          <p className="text-xs text-gray-600 mb-2">{channel.description}</p>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            {channel.response}
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-3 text-xs h-7"
                        onClick={() => setIsChatOpen(true)}
                      >
                        Get Help
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tutorials */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-800">Video Tutorials</h3>
                  <Button variant="ghost" size="sm" className="text-xs gap-1">
                    View All
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              
              <div className="p-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tutorials.map((tutorial, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3 hover:border-orange-300 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                          <Video className="h-5 w-5 text-orange-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-800 truncate">{tutorial.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">{tutorial.duration}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className={`text-xs px-1.5 py-0.5 rounded ${
                              tutorial.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                              tutorial.level === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {tutorial.level}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {tutorial.views} views
                        </span>
                        <Button variant="ghost" size="sm" className="h-6 text-xs gap-1">
                          Watch Now
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Phone className="h-4 w-4 text-blue-600" />
              <h4 className="text-xs font-semibold text-blue-800">Emergency Support</h4>
            </div>
            <p className="text-sm font-medium text-blue-700">1-800-HOSPITAL</p>
            <p className="text-xs text-blue-600">Available 24/7 for critical issues</p>
          </div>
          
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Mail className="h-4 w-4 text-green-600" />
              <h4 className="text-xs font-semibold text-green-800">Email Support</h4>
            </div>
            <p className="text-sm font-medium text-green-700">support@medicare.org</p>
            <p className="text-xs text-green-600">Response within 4 business hours</p>
          </div>
          
          <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Globe className="h-4 w-4 text-purple-600" />
              <h4 className="text-xs font-semibold text-purple-800">Knowledge Base</h4>
            </div>
            <p className="text-sm font-medium text-purple-700">help.medicare.org</p>
            <p className="text-xs text-purple-600">Search articles and guides</p>
          </div>
        </div>

        {/* Live Chat Modal */}
        {isChatOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsChatOpen(false)}
            />
            <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
              <div className="p-3 border-b border-gray-200 bg-orange-600 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-white" />
                    <h3 className="text-sm font-semibold text-white">Live Chat Support</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-white hover:bg-white/20"
                      onClick={() => setIsChatOpen(false)}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-xs text-white/90">Online • Typically replies in 5 min</span>
                </div>
              </div>
              
              <div className="h-64 p-3 overflow-y-auto bg-gray-50">
                <div className="space-y-2">
                  <div className="flex justify-start">
                    <div className="max-w-[80%]">
                      <div className="bg-gray-200 rounded-lg p-2">
                        <p className="text-xs text-gray-800">Hello! How can I help you today?</p>
                      </div>
                      <span className="text-xs text-gray-500 mt-1 block">Support Agent • Just now</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-orange-600 hover:bg-orange-700 h-9 px-3"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Our support team is available 24/7
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </NavBar>
  );
}