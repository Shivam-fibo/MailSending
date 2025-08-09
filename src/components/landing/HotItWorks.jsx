import React, { useState, useEffect } from "react";
import { Send, Mail, MessageSquare, Check } from "lucide-react";

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      id: 1,
      icon: Mail,
      title: "Add Recipients",
      description: "Enter email addresses separated by commas",
      placeholder: "john@example.com, sarah@company.com, team@startup.io"
    },
    {
      id: 2,
      icon: MessageSquare,
      title: "Compose Message",
      description: "Write your personalized message",
      placeholder: "Hello! We're excited to share our latest updates with you..."
    },
    {
      id: 3,
      icon: Send,
      title: "Send Instantly",
      description: "Deliver to all recipients with one click",
      placeholder: "✓ Ready to send"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50  py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          

          {/* Demo Interface */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-100">
            <div className="space-y-8">
              
              {steps.map((step, index) => (
                <div key={step.id} className={`transition-all duration-700 ${
                  activeStep === index 
                    ? 'transform translate-x-0 opacity-100' 
                    : activeStep > index 
                      ? 'transform -translate-x-4 opacity-60' 
                      : 'transform translate-x-4 opacity-40'
                }`}>
                  
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      activeStep >= index ? 'bg-black text-white' : 'bg-gray-300 text-gray-500'
                    }`}>
                      {activeStep > index ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-black mb-1">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>

                  {index < 2 ? (
                    <textarea
                      placeholder={step.placeholder}
                      className={`w-full border rounded-xl p-4 transition-all duration-500 resize-none ${
                        activeStep === index 
                          ? 'border-black bg-white shadow-md' 
                          : 'border-gray-200 bg-gray-100'
                      }`}
                      rows={index === 0 ? 3 : 4}
                      readOnly
                    />
                  ) : (
                    <div className="text-center">
                      <button className={`px-8 py-4 rounded-xl transition-all duration-500 flex items-center gap-3 mx-auto ${
                        activeStep === index 
                          ? 'bg-black text-white shadow-lg transform scale-105' 
                          : 'bg-gray-300 text-gray-500'
                      }`}>
                        <Send className="w-5 h-5" />
                        Send to All Recipients
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

         
          </div>

          {/* Features Grid */}
          <div className={`grid md:grid-cols-3 gap-8 mt-16 transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;