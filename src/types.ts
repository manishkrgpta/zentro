/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  iconName: string; // Used to dynamic map to Lucide icons
  features: string[];
  metrics: {
    label: string;
    value: string;
  };
  techStack: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullOverview: string;
  metrics: {
    label: string;
    value: string;
  };
  stack: string[];
  demoType: 'crm' | 'chat' | 'finance' | 'healthcare' | 'restaurant' | 'realestate';
  details: {
    problem: string;
    solution: string;
    results: string[];
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  logoText: string;
  comment: string;
  rating: number;
  avatarSeed: string; // Used for a colorful styled abstract avatar
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  deliverables: string[];
  phase: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatarSeed: string;
  specialties: string[];
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  subtext: string;
}

export interface PricingService {
  name: string;
  marketPrice: string;
  zentroPrice: string;
  isStartingAt?: boolean;
}

export interface SimpleServicePrice {
  name: string;
  price: string;
}

export interface PricingPackage {
  name: string;
  price: string;
  iconName: string;
  description: string;
  features: string[];
  popular?: boolean;
}

