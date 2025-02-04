export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  avatar: string;
  whatsapp?: string;
  verifiedEmail?: boolean;
  verifiedStudent?: boolean;
  verifiedFaculty?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate: string;
  location: string;
  type: string;
  organizer: User;
  category <boltAction type="file" filePath="src/types/index.ts">
  category: string;
  attendees: User[];
  maxAttendees: number;
  registrationDeadline: string;
  eligibility: string;
  status: 'active' | 'inactive';
  visibility: 'public' | 'private';
  image?: string;
  department: string;
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
  expiresAt: string;
  reported?: boolean;
  reportCount?: number;
  suspiciousFlags?: string[];
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
  expiresAt: string;
  utilities: boolean;
  petsAllowed: boolean;
  furnished: boolean;
  reported?: boolean;
  reportCount?: number;
  suspiciousFlags?: string[];
}

export interface Message {
  id: string;
  sender: User;
  receiver: User;
  content: string;
  timestamp: string;
  read: boolean;
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
  reported?: boolean;
  reportCount?: number;
  suspiciousFlags?: string[];
}

export interface ForumReply {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  reported?: boolean;
  reportCount?: number;
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

export interface Bookmark {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'listing' | 'housing' | 'event';
  createdAt: string;
}

export interface Report {
  id: string;
  itemId: string;
  itemType: 'listing' | 'housing' | 'post' | 'reply';
  reporterId: string;
  reason: string;
  description?: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  createdAt: string;
  updatedAt: string;
}