export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  avatar: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  seller: User;
  createdAt: string;
  condition: string;
}

export interface HousingListing {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'apartment' | 'house' | 'room' | 'shared';
  location: string;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: string[];
  available: string;
  landlord: User;
  createdAt: string;
  utilities: boolean;
  petsAllowed: boolean;
  furnished: boolean;
}

export interface Message {
  id: string;
  sender: User;
  receiver: User;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: User;
  category: string;
  attendees: User[];
  maxAttendees?: number;
  price?: number;
  image?: string;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  category: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
  replies: ForumReply[];
}

export interface ForumReply {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  upvotes: number;
  downvotes: number;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'link' | 'video' | 'other';
  url: string;
  uploadedBy: User;
  createdAt: string;
  category: string;
  tags: string[];
  downloads: number;
  size?: string;
}