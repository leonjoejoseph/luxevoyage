export interface PackageType {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  rating: number;
  reviews: number;
  category: string[];
  image: string;
  badge: string;
  badgeColor: string;
  includes: string[];
}

export interface DestinationType {
  name: string;
  subtitle: string;
  price: string;
  duration: string;
  image: string;
  description: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  destination?: string;
  travelDate?: string;
  budget?: string;
  message?: string;
}

export interface SocialLink {
  icon: string;
  href: string;
  label: string;
}

export interface ContactItem {
  icon: string;
  label: string;
  value: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface StatItem {
  count: number;
  label: string;
  suffix?: string;
}
