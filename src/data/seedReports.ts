import dogInjured from '@/assets/seed/dog-injured.jpg';
import catStray from '@/assets/seed/cat-stray.jpg';
import dogMalnourished from '@/assets/seed/dog-malnourished.jpg';
import birdInjured from '@/assets/seed/bird-injured.jpg';
import cowInjured from '@/assets/seed/cow-injured.jpg';
import puppiesAbandoned from '@/assets/seed/puppies-abandoned.jpg';

export interface SeedReport {
  id: string;
  animal_type: string;
  description: string;
  condition: string;
  image_urls: string[];
  address: string;
  city: string;
  state: string;
  landmark: string | null;
  latitude: number;
  longitude: number;
  contact_phone: string | null;
  status: string;
  created_at: string;
}

export const seedReports: SeedReport[] = [
  {
    id: 'seed-1',
    animal_type: 'dog',
    description: 'Injured street dog found lying on the sidewalk near Forum Mall, Koramangala. Appears to have a leg injury and is unable to walk. Needs immediate medical attention.',
    condition: 'Leg injury, unable to walk',
    image_urls: [dogInjured],
    address: '21, 80 Feet Rd, Koramangala 4th Block',
    city: 'Bangalore',
    state: 'Karnataka',
    landmark: 'Near Forum Mall',
    latitude: 12.9352,
    longitude: 77.6245,
    contact_phone: '+91 98765 43210',
    status: 'open',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'seed-2',
    animal_type: 'cat',
    description: 'Tiny stray kitten found hiding under a parked car in Indiranagar. Very scared and possibly dehydrated. Meowing constantly but won\'t come out.',
    condition: 'Dehydrated, scared, very young',
    image_urls: [catStray],
    address: '12th Main, HAL 2nd Stage, Indiranagar',
    city: 'Bangalore',
    state: 'Karnataka',
    landmark: 'Near 100ft Road signal',
    latitude: 12.9784,
    longitude: 77.6408,
    contact_phone: '+91 87654 32109',
    status: 'in_progress',
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'seed-3',
    animal_type: 'dog',
    description: 'Severely malnourished dog spotted near the bus stand in Jayanagar. Very thin, ribs visible. Friendly but weak. Has been here for days without food.',
    condition: 'Severe malnourishment, weak',
    image_urls: [dogMalnourished],
    address: 'Jayanagar 4th Block Bus Stand',
    city: 'Bangalore',
    state: 'Karnataka',
    landmark: 'Near Cool Joint',
    latitude: 12.9250,
    longitude: 77.5938,
    contact_phone: null,
    status: 'open',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'seed-4',
    animal_type: 'bird',
    description: 'Pigeon with a broken wing found on the ground near Cubbon Park. Cannot fly and is in danger from traffic and stray animals.',
    condition: 'Broken wing, grounded',
    image_urls: [birdInjured],
    address: 'Cubbon Park, Kasturba Road',
    city: 'Bangalore',
    state: 'Karnataka',
    landmark: 'Near Bandstand',
    latitude: 12.9763,
    longitude: 77.5929,
    contact_phone: '+91 76543 21098',
    status: 'rescued',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'seed-5',
    animal_type: 'cow',
    description: 'Cow with leg injury spotted on the busy main road near Majestic. Limping badly and causing traffic issues. Needs veterinary help urgently.',
    condition: 'Leg injury, limping',
    image_urls: [cowInjured],
    address: 'Dhanvantri Road, Majestic',
    city: 'Bangalore',
    state: 'Karnataka',
    landmark: 'Near Majestic Bus Stand',
    latitude: 12.9767,
    longitude: 77.5713,
    contact_phone: '+91 65432 10987',
    status: 'in_progress',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'seed-6',
    animal_type: 'dog',
    description: 'Group of 5 abandoned puppies found huddled together in an alley in BTM Layout. They appear to be 3-4 weeks old, no mother in sight. Need immediate foster care.',
    condition: 'Abandoned, very young, no mother',
    image_urls: [puppiesAbandoned],
    address: '1st Stage, BTM Layout',
    city: 'Bangalore',
    state: 'Karnataka',
    landmark: 'Behind Udupi Garden restaurant',
    latitude: 12.9166,
    longitude: 77.6101,
    contact_phone: '+91 54321 09876',
    status: 'open',
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
];
