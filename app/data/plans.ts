const features = [
    { name: "Limited course material uploads" },
    { name: "Access to basic assessment formats" },
    { name: "Basic tutor conversations" },
    { name: "Unlimited course material uploads" },
    { name: "Access to advanced assessment formats" },
    { name: "Highly customizable practice tests" },
    { name: "Advanced personal tutor interaction" },
    { name: "Priority support and assistance" },
  ];

  
export const plans = [
    {
      name: "Basic Plan",
      features: [
        { feature: features[0], supported: true },
        { feature: features[1], supported: true },
        { feature: features[2], supported: true },
        { feature: features[3], supported: false },
        { feature: features[4], supported: false },
        { feature: features[5], supported: false },
        { feature: features[6], supported: false },
        { feature: features[7], supported: false },
      ],
      recommended: false,
      price: 0.00,
      duration: "month"
    },
    {
      name: "Premium Plan",
      features: [
        { feature: features[0], supported: true },
        { feature: features[1], supported: true },
        { feature: features[2], supported: true },
        { feature: features[3], supported: true },
        { feature: features[4], supported: true },
        { feature: features[5], supported: true },
        { feature: features[6], supported: true },
        { feature: features[7], supported: true },
      ],
      recommended: true,
      price: 9.99,
      duration: "month"
    }
  ];

  