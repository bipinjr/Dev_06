export interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  rating: number;
  specialties: string[];
  hours: string;
}

export const bangaloreClinics: Clinic[] = [
  {
    id: 'c1',
    name: 'CUPA (Compassion Unlimited Plus Action)',
    address: 'Veterinary College Campus, Hebbal, Bangalore - 560024',
    phone: '+91 80 2351 1523',
    latitude: 13.0358,
    longitude: 77.5970,
    rating: 4.5,
    specialties: ['Emergency Care', 'Surgery', 'Vaccination', 'Rescue'],
    hours: '24/7 Emergency',
  },
  {
    id: 'c2',
    name: 'Charlie\'s Animal Rescue Centre (CARE)',
    address: 'No. 7, 1st Cross, Kaveri Layout, Bangalore - 560078',
    phone: '+91 99002 53500',
    latitude: 12.8955,
    longitude: 77.5960,
    rating: 4.7,
    specialties: ['Rescue', 'Adoption', 'Sterilization', 'Rehabilitation'],
    hours: '9 AM - 7 PM',
  },
  {
    id: 'c3',
    name: 'Cessna Lifeline Veterinary Hospital',
    address: '1st Floor, No. 35, 1st Cross, JP Nagar 2nd Phase, Bangalore - 560078',
    phone: '+91 80 2649 3355',
    latitude: 12.9077,
    longitude: 77.5852,
    rating: 4.6,
    specialties: ['Surgery', 'Orthopedics', 'Dentistry', 'ICU'],
    hours: '9 AM - 9 PM',
  },
  {
    id: 'c4',
    name: 'Government Veterinary Hospital',
    address: 'Veterinary College Campus, Hebbal, Bangalore - 560024',
    phone: '+91 80 2341 1482',
    latitude: 13.0350,
    longitude: 77.5950,
    rating: 3.8,
    specialties: ['General Checkup', 'Vaccination', 'Anti-rabies', 'Emergency'],
    hours: '10 AM - 5 PM (Mon-Sat)',
  },
  {
    id: 'c5',
    name: 'The Bangalore Veterinary Hospital',
    address: 'No. 13, 5th Cross, Malleswaram, Bangalore - 560003',
    phone: '+91 80 2346 7890',
    latitude: 13.0035,
    longitude: 77.5700,
    rating: 4.3,
    specialties: ['General Medicine', 'Surgery', 'Dermatology', 'Lab'],
    hours: '9 AM - 8 PM',
  },
  {
    id: 'c6',
    name: 'VetCare Pet Clinic',
    address: 'No. 42, 11th Main, HSR Layout Sector 6, Bangalore - 560102',
    phone: '+91 80 4123 5678',
    latitude: 12.9116,
    longitude: 77.6389,
    rating: 4.4,
    specialties: ['Vaccination', 'Grooming', 'Surgery', 'Emergency'],
    hours: '8 AM - 10 PM',
  },
  {
    id: 'c7',
    name: 'Animal Rahat – Bangalore Centre',
    address: 'Kanakapura Road, JP Nagar 7th Phase, Bangalore - 560062',
    phone: '+91 80 2672 1234',
    latitude: 12.8890,
    longitude: 77.5850,
    rating: 4.2,
    specialties: ['Large Animals', 'Emergency', 'Rescue', 'Rehabilitation'],
    hours: '24/7',
  },
  {
    id: 'c8',
    name: 'Indiranagar Veterinary Clinic',
    address: '15, 12th Main, HAL 2nd Stage, Indiranagar, Bangalore - 560038',
    phone: '+91 80 2525 8899',
    latitude: 12.9780,
    longitude: 77.6400,
    rating: 4.5,
    specialties: ['General Medicine', 'Vaccination', 'Microchipping', 'Lab'],
    hours: '9 AM - 7 PM',
  },
];
