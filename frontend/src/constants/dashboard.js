export const HERO_SLIDES = [
  {
    image: "/images/ac-1.png",
    title: "AC repair & service",
    subtitle: "Certified technicians at your home",
    serviceId: 3,
  },
  {
    image: "/images/ac-2.png",
    title: "Outdoor unit experts",
    subtitle: "Installation & maintenance",
    serviceId: 3,
  },
  {
    image: "/images/ac-3.png",
    title: "Split AC specialists",
    subtitle: "Repair with genuine parts",
    serviceId: 3,
  },
  {
    image: "/images/ac-4.png",
    title: "Deep AC cleaning",
    subtitle: "Foam & jet wash options",
    serviceId: 3,
  },
];

export const CATEGORY_CHIPS = [
  { id: 3, label: "AC & Appliance", icon: "❄️", highlight: true },
  { id: 1, label: "Cleaning", icon: "🧹" },
  { id: 2, label: "Salon", icon: "💇" },
  { id: 4, label: "Plumbing", icon: "🚰" },
  { id: 5, label: "Electrical", icon: "⚡" },
  { id: 6, label: "Pest Control", icon: "🛡️" },
];

export const FEATURED_AC = [
  { name: "Foam Cleaning", price: 549, rating: 4.76, tag: "Popular" },
  { name: "Jet / Power Cleaning", price: 649, rating: 4.8, tag: "Trending" },
  { name: "AC Gas Refill", price: 600, rating: 4.78 },
  { name: "Split AC Installation", price: 1500, rating: 4.77 },
];

export const STATUS_LABELS = {
  pending_approval: { label: "Waiting for approval", className: "status--pending" },
  approved: { label: "Approved", className: "status--approved" },
  rejected: { label: "Rejected", className: "status--rejected" },
  completed: { label: "Completed", className: "status--completed" },
};
