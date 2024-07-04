const features = [
    { name: "Limited course material uploads" },
    { name: "Access to MCQ assessments only" },
    { name: "Limited tutor conversations" },
    { name: "Unlimited course material uploads" },
    { name: "Access to all assessment formats" },
    { name: "Unlimited tutor conversations" },
    { name: "Priority customer support" }
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
        { feature: features[6], supported: false }
      ],
      recommended: false,
      price: "$0.00/month"
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
        { feature: features[6], supported: true }
      ],
      recommended: true,
      price: "$19.99/month"
    }
  ];

  