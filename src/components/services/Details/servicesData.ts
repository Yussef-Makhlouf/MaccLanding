// // This file contains all services data that can be used across different pages

// export interface ServiceItem {
//   id: string; // Format: "serviceName-itemNumber" e.g. "hard-01"
//   number: string; // Display number like "01", "02"
//   category: string;
//   title: string;
//   description: string;
//   image: string;
//   color: string;
// }

// export interface ServiceHeroData {
//   subtitle: string;
//   title: string;
//   description: string;
//   backgroundImage: string;
//   color: string;
//   titleColor?: string;
// }

// export interface ServicePageData {
//   slug: string;
//   hero: ServiceHeroData;
//   items: ServiceItem[];
// }

// // Hard Services Hero
// export const hardServicesHero: ServiceHeroData = {
//   subtitle: "RELIABLE TECHNICAL & ENGINEERING SERVICES",
//   title: "HARD SERVICES",
//   description:
//     "FROM ELECTRICAL AND HVAC SYSTEMS TO FIRE SAFETY AND PLUMBING, WE ENSURE SEAMLESS OPERATION THROUGH PRECISION AND PROFESSIONALISM.",
//   backgroundImage: "/images/services/hard-hero.png",
//   color: "#4361EE",
//   titleColor: "#FFFFFF",
// };

// // Soft Services Hero
// export const softServicesHero: ServiceHeroData = {
//   subtitle: "CREATING CLEAN, COMFORTABLE ENVIRONMENTS",
//   title: "SOFT SERVICES",
//   description:
//     "WE PROVIDE HYGIENE, COMFORT, AND PEACE OF MIND THROUGH PROFESSIONAL CLEANING, PEST CONTROL, AND CUSTOMER-CENTERED SUPPORT.",
//   backgroundImage: "/images/services/soft-hero.png",
//   color: "#FFB800",
//   titleColor: "#D4AF37",
// };

// // Ground Services Hero
// export const groundServicesHero: ServiceHeroData = {
//   subtitle: "SUSTAINABLE LANDSCAPING & OUTDOOR CARE",
//   title: "GROUND SERVICES",
//   description:
//     "WE DESIGN AND MAINTAIN OUTDOOR ENVIRONMENTS THAT PROMOTE BEAUTY, SUSTAINABILITY, AND COMFORT FOR EVERY FACILITY.",
//   backgroundImage: "/images/services/ground-hero.png",
//   color: "#15AC9E",
//   titleColor: "#4CAF50",
// };

// // Special Projects Hero
// export const specialProjectsHero: ServiceHeroData = {
//   subtitle: "DELIVERING EXCELLENCE BEYOND STANDARDS",
//   title: "SPECIAL PROJECTS SERVICES",
//   description:
//     "OUR SPECIAL PROJECTS DIVISION MANAGES HIGH-IMPACT, CUSTOM-BUILT FACILITY SOLUTIONS THAT MEET COMPLEX CLIENT REQUIREMENTS WITH PRECISION AND INNOVATION.",
//   backgroundImage: "/images/services/special-hero.png",
//   color: "#8B5CF6",
//   titleColor: "#6C63FF",
// };

// // Engineering Services Hero
// export const engineeringServicesHero: ServiceHeroData = {
//   subtitle: "SMART ENGINEERING FOR MODERN FACILITIES",
//   title: "ENGINEERING SERVICES",
//   description:
//     "WE DESIGN AND MAINTAIN OUTDOOR ENVIRONMENTS THAT PROMOTE BEAUTY, SUSTAINABILITY, AND COMFORT FOR EVERY FACILITY.",
//   backgroundImage: "/images/services/engineering-hero.png",
//   color: "#FF6B00",
//   titleColor: "#007ACC",
// };

// // Catering Services Hero
// export const cateringServicesHero: ServiceHeroData = {
//   subtitle: "PREMIUM CATERING FOR EVERY FACILITY",
//   title: "CATERING SERVICES",
//   description:
//     "WE DELIVER SAFE, HIGH-QUALITY, AND CUSTOMIZED FOOD SERVICES DESIGNED TO ENHANCE EMPLOYEE SATISFACTION, WORKPLACE COMFORT, AND OVERALL WELL-BEING.",
//   backgroundImage: "/images/services/catering-hero.png",
//   color: "#D97706",
//   titleColor: "#C69C6D",
// };

// // Hard Services Data
// export const hardServicesData: ServiceItem[] = [
//   {
//     id: "hard-01",
//     number: "01",
//     category: "Electrical & Power Systems",
//     title: "Reliable Electrical Solutions For Every Facility !",
//     description:
//       "From Power Distribution To Energy Optimization, We Ensure Safe, Compliant, And Uninterrupted Power For Uninterrupted Operations.",
//     image: "/images/services/hard1.png",
//     color: "#5C677D",
//   },
//   {
//     id: "hard-02",
//     number: "02",
//     category: "HVAC & Cooling Systems",
//     title: "Smart HVAC For Comfort And Efficiency !",
//     description:
//       "We Design And Maintain HVAC Systems That Deliver Perfect Temperature Control And Energy Efficiency Year-Round.",
//     image: "/images/services/hard2.png",
//     color: "#5C677D",
//   },
//   {
//     id: "hard-03",
//     number: "03",
//     category: "Fire Safety & Protection",
//     title: "Safeguarding Facilities Through Fire Safety Excellence !",
//     description:
//       "Installation And Maintenance Of Advanced Fire Detection And Suppression Systems For Maximum Safety.",
//     image: "/images/services/hard3.png",
//     color: "#5C677D",
//   },
//   {
//     id: "hard-04",
//     number: "04",
//     category: "Plumbing & Water Systems",
//     title: "Reliable Plumbing And Water Flow Management !",
//     description:
//       "From Leak Detection To Pipeline Maintenance, We Guarantee Continuous Safe And Efficient Water Distribution.",
//     image: "/images/services/hard4.png",
//     color: "#5C677D",
//   },
// ];

// // Soft Services Data
// export const softServicesData: ServiceItem[] = [
//   {
//     id: "soft-01",
//     number: "01",
//     category: "Cleaning Services",
//     title: "Professional Hygiene Solutions !",
//     description:
//       "Delivering Spotless Environments Through Routine And Deep Cleaning For Offices, Malls, And Residential Facilities.",
//     image: "/images/services/soft1.png",
//     color: "#D4AF37",
//   },
//   {
//     id: "soft-02",
//     number: "02",
//     category: "Waste Management",
//     title: "Redefining Waste Into Opportunity !",
//     description:
//       "Modern Waste Collection, Recycling, And Disposal Systems Built For Efficiency And Environmental Care.",
//     image: "/images/services/soft2.png",
//     color: "#D4AF37",
//   },
//   {
//     id: "soft-03",
//     number: "03",
//     category: "Laundry & Linen Service",
//     title: "Flawless Laundry Care For Premium Facilities !",
//     description:
//       "Providing High-Quality Washing, Pressing, And Linen Management For Hotels, Hospitals, And Corporate Clients.",
//     image: "/images/services/soft3.png",
//     color: "#D4AF37",
//   },
// ];

// // Ground Services Data
// export const groundServicesData: ServiceItem[] = [
//   {
//     id: "ground-01",
//     number: "01",
//     category: "Landscaping Design",
//     title: "Beautiful Outdoor Spaces That Inspire !",
//     description:
//       "We Design And Shape Beautiful Green Areas That Blend Nature With Modern Functionality And Vision.",
//     image: "/images/services/ground1.png",
//     color: "#4CAF50",
//   },
//   {
//     id: "ground-02",
//     number: "02",
//     category: "Irrigation Systems",
//     title: "Smart Watering For Greener Spaces !",
//     description:
//       "Automated Irrigation Systems Designed To Save Water While Keeping Your Landscapes Lush All Year Long.",
//     image: "/images/services/ground2.png",
//     color: "#4CAF50",
//   },
//   {
//     id: "ground-03",
//     number: "03",
//     category: "Garden Maintenance",
//     title: "Keeping Every Leaf In Perfect Shape !",
//     description:
//       "Our Expert Teams Ensure Your Gardens Stay Clean, Healthy, And Beautiful Through Regular Care.",
//     image: "/images/services/ground3.png",
//     color: "#4CAF50",
//   },
//   {
//     id: "ground-04",
//     number: "04",
//     category: "Green Sustainability",
//     title: "Nature-Friendly Solutions For Modern Spaces !",
//     description:
//       "We Integrate Eco-Friendly Materials And Sustainable Landscaping Methods That Protect The Planet.",
//     image: "/images/services/ground4.png",
//     color: "#4CAF50",
//   },
// ];

// // Special Projects Data
// export const specialProjectsData: ServiceItem[] = [
//   {
//     id: "special-01",
//     number: "01",
//     category: "Custom Facility Design",
//     title: "Tailor-Made Facility Designs For Every Industry !",
//     description:
//       "We Craft Customized Layouts And Structures That Meet Each Client's Unique Operational Needs.",
//     image: "/images/services/special1.png",
//     color: "#6C63FF",
//   },
//   {
//     id: "special-02",
//     number: "02",
//     category: "Smart Building Integration",
//     title: "Connecting Technology With Architecture !",
//     description:
//       "From IoT Sensors To Automated Control Systems, We Bring Intelligence To Your Buildings.",
//     image: "/images/services/special2.png",
//     color: "#6C63FF",
//   },
//   {
//     id: "special-03",
//     number: "03",
//     category: "High-Security Projects",
//     title: "Precision Engineering For Secure Facilities !",
//     description:
//       "Specialized Builds Designed For Restricted, High-Security Environments And Advanced Monitoring Systems.",
//     image: "/images/services/special3.png",
//     color: "#6C63FF",
//   },
//   {
//     id: "special-04",
//     number: "04",
//     category: "Facility Upgrades",
//     title: "Transforming Existing Spaces Into Modern Standards !",
//     description:
//       "Our Creative Retrofits Outdated Systems And Structures, Delivering Better And Efficient Performance.",
//     image: "/images/services/special4.png",
//     color: "#6C63FF",
//   },
// ];

// // Engineering Services Data
// export const engineeringServicesData: ServiceItem[] = [
//   {
//     id: "engineering-01",
//     number: "01",
//     category: "Mechanical Engineering",
//     title: "Innovative HVAC & Energy Systems !",
//     description:
//       "We Design And Maintain Efficient Heating, Ventilation, And Cooling Systems That Optimize Energy Use And Ensure Comfort.",
//     image: "/images/services/engineering1.png",
//     color: "#007ACC",
//   },
//   {
//     id: "engineering-02",
//     number: "02",
//     category: "Electrical Engineering",
//     title: "Powering Facilities With Precision !",
//     description:
//       "From Power Distribution To Lighting And Automation, We Deliver Reliable Electrical Systems That Drive Performance.",
//     image: "/images/services/engineering2.png",
//     color: "#007ACC",
//   },
//   {
//     id: "engineering-03",
//     number: "03",
//     category: "Structural Engineering",
//     title: "Building The Backbone Of Every Facility !",
//     description:
//       "Our Structural Designs Combine Strength, Innovation, And Safety For Long-Lasting And High-Performing.",
//     image: "/images/services/engineering3.png",
//     color: "#007ACC",
//   },
//   {
//     id: "engineering-04",
//     number: "04",
//     category: "Automation & Control",
//     title: "Smart Systems For Smarter Operations !",
//     description:
//       "We Integrate Automation Control Systems That Monitor, Adjust, And Improve Performance For Sustainable Facility Management.",
//     image: "/images/services/engineering4.png",
//     color: "#007ACC",
//   },
// ];

// // Corporate Catering Data (Additional service)
// export const cateringServicesData: ServiceItem[] = [
//   {
//     id: "catering-01",
//     number: "01",
//     category: "Corporate Catering",
//     title: "Tailored Meals For Every Workforce !",
//     description:
//       "We Provide Healthy, Delicious, And Customized Meal Plans To Keep Teams Energized And Productive Throughout.",
//     image: "/images/services/catering1.png",
//     color: "#C69C6D",
//   },
//   {
//     id: "catering-02",
//     number: "02",
//     category: "Event Catering",
//     title: "Seamless Hospitality For Every Occasion !",
//     description:
//       "From Conferences To Corporate Gatherings, We Deliver Elegant Catering Solutions That Impress Guests And Simplify Logistics.",
//     image: "/images/services/catering2.png",
//     color: "#C69C6D",
//   },
//   {
//     id: "catering-03",
//     number: "03",
//     category: "Industrial Catering",
//     title: "Large-Scale Nutrition, Simplified !",
//     description:
//       "We Manage Bulk Catering Operations For Factories And Industrial Sites Of Hygiene And On-Catering.",
//     image: "/images/services/catering3.png",
//     color: "#C69C6D",
//   },
//   {
//     id: "catering-04",
//     number: "04",
//     category: "Pantry Management",
//     title: "Daily Comfort, Professionally Managed !",
//     description:
//       "Our Pantry Services Ensure A Clean, Well-Stocked, And Pleasant Environment That Boosts Employee Satisfaction And Morale.",
//     image: "/images/services/catering4.png",
//     color: "#C69C6D",
//   },
// ];

// // Combined data for general overview page
// export const allServicesData: ServiceItem[] = [
//   ...hardServicesData,
//   ...softServicesData,
//   ...groundServicesData,
//   ...specialProjectsData,
//   ...engineeringServicesData,
//   ...cateringServicesData,
// ];

// // Complete Service Pages Data (Hero + Items)
// export const servicesPages: Record<string, ServicePageData> = {
//   hard: {
//     slug: "hard",
//     hero: hardServicesHero,
//     items: hardServicesData,
//   },
//   soft: {
//     slug: "soft",
//     hero: softServicesHero,
//     items: softServicesData,
//   },
//   ground: {
//     slug: "ground",
//     hero: groundServicesHero,
//     items: groundServicesData,
//   },
//   special: {
//     slug: "special",
//     hero: specialProjectsHero,
//     items: specialProjectsData,
//   },
//   engineering: {
//     slug: "engineering",
//     hero: engineeringServicesHero,
//     items: engineeringServicesData,
//   },
//   catering: {
//     slug: "catering",
//     hero: cateringServicesHero,
//     items: cateringServicesData,
//   },
// };

// // Helper function to get service data by slug
// export const getServiceBySlug = (slug: string): ServicePageData | undefined => {
//   return servicesPages[slug];
// };