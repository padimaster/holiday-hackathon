import { Profile } from '@/types/profile'

export const mockProfiles: Record<string, Profile> = {
  'bob-ito': {
    handle: 'bob-ito',
    name: 'Bob',
    avatar: '/avatars/bob.jpg',
    bio: 'Building the future of tech education. Product Designer & Web3 enthusiast.',
    location: 'London',
    joinedDate: 'September 2011',
    website: undefined,
    following: 569,
    followers: 72,
    techScore: 25,
    role: 'Product Designer',
    organization: undefined
  },
  'padimaster': {
    handle: 'padimaster',
    name: 'Alex Padilla',
    avatar: '/avatars/alex.jpg',
    bio: 'Community builder and blockchain developer passionate about Web3 education',
    location: 'Ecuador',
    joinedDate: 'February 2023',
    website: 'padimaster.com',
    following: 143,
    followers: 69,
    techScore: 85,
    role: 'PSE Core Program - Community Manager',
    organization: 'Software Engineer | ETH Ecuador'
  },
  'satya': {
    handle: 'satya',
    name: 'Satya Dev',
    avatar: '/avatars/satya.jpg',
    bio: 'Senior Software Engineer | Web3 Developer | DeFi Researcher',
    location: 'Berlin',
    joinedDate: 'March 2022',
    website: 'satyadev.eth',
    following: 892,
    followers: 1204,
    techScore: 95,
    role: 'Senior Software Engineer',
    organization: 'DeFi Protocol Labs'
  },
  'elena-tech': {
    handle: 'elena-tech',
    name: 'Elena Rodriguez',
    avatar: '/avatars/elena.jpg',
    bio: 'Teaching the next generation of blockchain developers',
    location: 'Barcelona',
    joinedDate: 'June 2023',
    website: 'elenatech.dev',
    following: 345,
    followers: 289,
    techScore: 78,
    role: 'Developer Advocate',
    organization: 'Web3 Academy'
  },
  'crypto-sarah': {
    handle: 'crypto-sarah',
    name: 'Sarah Chen',
    avatar: '/avatars/sarah.jpg',
    bio: 'Blockchain Security Researcher | Smart Contract Auditor',
    location: 'Singapore',
    joinedDate: 'January 2024',
    website: 'sarah.tech',
    following: 231,
    followers: 567,
    techScore: 92,
    role: 'Security Engineer',
    organization: 'Blockchain Security DAO'
  }
}