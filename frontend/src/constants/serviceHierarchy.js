/** Maps backend service IDs (knowledgeBase) to browseable sub-services */
export const serviceHierarchy = {
  1: {
    name: "Home Cleaning",
    icon: "cleaning",
    categories: {
      "Room Cleaning": [
        { name: "Kitchen Deep Clean", price: 500 },
        { name: "Bathroom Sanitization", price: 400 },
        { name: "Bedroom Cleaning", price: 350 },
        { name: "Living Room Cleaning", price: 450 },
        { name: "Balcony Cleaning", price: 300 },
      ],
      "Deep Cleaning": [
        { name: "Deep Sofa Cleaning", price: 800 },
        { name: "Kitchen Chimney Cleaning", price: 600 },
        { name: "Carpet Shampooing", price: 700 },
        { name: "Wall & Ceiling Cleaning", price: 550 },
      ],
    },
  },
  2: {
    name: "Salon at Home",
    icon: "salon",
    categories: {
      "Hair Services": [
        { name: "Haircut", price: 300 },
        { name: "Hair Styling", price: 400 },
        { name: "Hair Coloring", price: 1000 },
        { name: "Hair Spa Treatment", price: 800 },
      ],
      "Body Care": [
        { name: "Full Body Waxing", price: 500 },
        { name: "Threading", price: 200 },
        { name: "Manicure", price: 300 },
        { name: "Pedicure", price: 400 },
        { name: "Grooming Package", price: 600 },
      ],
    },
  },
  3: {
    name: "Appliance Repair",
    icon: "repair",
    categories: {
      "AC Cleaning": [
        { name: "Foam Cleaning", price: 549 },
        { name: "Normal / Basic Cleaning", price: 399 },
        { name: "Jet / Power Cleaning", price: 649 },
        { name: "Split AC Full Service", price: 799 },
      ],
      "AC Repair & Gas": [
        { name: "AC Gas Refill & Leak Check", price: 600 },
        { name: "AC Not Cooling Diagnosis", price: 499 },
        { name: "Compressor / PCB Repair", price: 1200 },
      ],
      "AC Installation": [
        { name: "Split AC Installation", price: 1500 },
        { name: "Window AC Installation", price: 1200 },
        { name: "AC Uninstallation", price: 800 },
        { name: "AC Shifting (Same City)", price: 999 },
      ],
      "Washing Machine": [
        { name: "Washing Machine Repair", price: 700 },
        { name: "Installation", price: 900 },
        { name: "Drum Cleaning Service", price: 500 },
      ],
      "Refrigerator": [
        { name: "Refrigerator Repair", price: 900 },
        { name: "Installation", price: 1000 },
        { name: "Cooling Issue Fix", price: 650 },
      ],
      "Other Appliances": [
        { name: "Microwave Repair", price: 500 },
        { name: "TV Repair", price: 1000 },
        { name: "Geyser Repair", price: 600 },
        { name: "Air Cooler Repair", price: 500 },
      ],
    },
  },
  4: {
    name: "Plumbing",
    icon: "plumbing",
    categories: {
      "Common Issues": [
        { name: "Blocked Drain Cleaning", price: 400 },
        { name: "Leaky Tap Repair", price: 350 },
        { name: "Pipe Leak Repair", price: 600 },
        { name: "Geyser Plumbing", price: 700 },
      ],
      "Installation": [
        { name: "Faucet Installation", price: 500 },
        { name: "Bathroom Fittings", price: 800 },
        { name: "Water Tank Installation", price: 1500 },
      ],
    },
  },
  5: {
    name: "Electrical Services",
    icon: "electrical",
    categories: {
      "Installations": [
        { name: "House Wiring", price: 800 },
        { name: "Switchboard Installation", price: 1000 },
        { name: "Ceiling Fan Installation", price: 400 },
        { name: "Light Fitting", price: 300 },
      ],
      "Maintenance": [
        { name: "Inverter Service", price: 600 },
        { name: "Safety Inspection", price: 500 },
        { name: "Fault Troubleshooting", price: 400 },
      ],
    },
  },
  6: {
    name: "Pest Control",
    icon: "pest",
    categories: {
      "Pest Types": [
        { name: "Mosquito Treatment", price: 700 },
        { name: "Cockroach Treatment", price: 800 },
        { name: "Rodent Treatment", price: 900 },
        { name: "Ant Treatment", price: 600 },
        { name: "Termite Treatment", price: 1200 },
      ],
      "Plans": [
        { name: "Standard Treatment", price: 500 },
        { name: "Premium Treatment", price: 1000 },
        { name: "Annual Maintenance Plan", price: 800 },
      ],
    },
  },
};

export const serviceIcons = {
  cleaning: "🧹",
  salon: "💇",
  repair: "❄️",
  plumbing: "🚰",
  electrical: "⚡",
  pest: "🛡️",
};
