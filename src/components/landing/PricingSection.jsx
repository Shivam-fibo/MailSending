import React from "react";

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Recommended for people with at least 1 year experience in crypto markets.",
      features: [
        "Access to real-time inventory tracking",
        "Integration with Digital Marketing email",
        "Basic analytics and email support",
        "Custom dashboards and Phone support",
        "Real-time data tracking and 24/7 support"
      ],
      buttonText: "Free plan"
    },
    {
      name: "Premium",
      price: "$99",
      period: "/month",
      description: "Everything in the Free Plan plus advanced search, better analytics...",
      features: [
        "All Free Plan features",
        "Advanced data filtering search capabilities",
        "Custom branding options",
        "Extended API access for integrations",
        "Real-time data tracking and 24/7 support",
        "Dedicated account manager"
      ],
      buttonText: "Purchase Plan"
    },
    {
      name: "Enterprise",
      price: "$299",
      period: "/month",
      description: "Includes all Premium Plan features plus full logistics automation etc.",
      features: [
        "Custom onboarding process",
        "Priority support responses",
        "Access to exclusive webinars",
        "Monthly performance reviews",
        "Real-time data tracking and 24/7 support",
        "Dedicated account manager",
        "Tailored training sessions and resources"
      ],
      buttonText: "Purchase Plan"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50  py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Choose the best option for your logistic company
          </h2>
          <p className="text-black/70 mt-3 max-w-2xl mx-auto">
            A Comprehensive Breakdown of Our Pricing Plans to Help You Make the Best Choice!
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-sm border border-gray-300 flex flex-col"
            >
              <div className="p-6 flex-1 flex flex-col">
                {/* Plan Name */}
                <h3 className="text-2xl font-semibold text-black mb-2">
                  {plan.name}
                </h3>

                {/* Description */}
                <p className="text-black/70 mb-4">{plan.description}</p>

                {/* Price */}
                <div className="text-4xl font-bold text-black mb-4">
                  {plan.price}
                  <span className="text-lg font-normal text-black/60">
                    {plan.period}
                  </span>
                </div>

                {/* Button */}
                <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-900 transition mb-6">
                  {plan.buttonText}
                </button>

                {/* Features */}
                <div className="mt-auto">
                  <h4 className="font-semibold text-black mb-3">Features</h4>
                  <ul className="space-y-2 text-black/80 text-sm">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2">•</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
