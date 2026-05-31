export interface Service {
  id: string;
  name: string;
  badge: string;
  image: string;
  icon: string;
  description: string;
}

export interface ComponentItem {
  name: string;
  tag: string;
  image: string;
  desc: string;
  specs: string[];
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  serviceType: string;
  brand: string;
  issue: string;
  timestamp: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
  tech?: string;
}
