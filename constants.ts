
import { User, UserRole, Facility, FacilityType, Feedback, Audit } from './types';

export const DUMMY_USERS: User[] = [
  { id: 'user-1', email: 'admin@saz.co.zw', password: 'admin', role: UserRole.Admin },
  { id: 'user-2', email: 'operator@hotel.com', password: 'password', role: UserRole.Operator },
  { id: 'user-3', email: 'tourist@gmail.com', password: 'password', role: UserRole.Tourist },
];

export const DUMMY_FACILITIES: Facility[] = [
  {
    id: 'fac-1',
    name: 'Bulawayo Rainbow Hotel',
    type: FacilityType.Hotel,
    location: { lat: -20.1534, lng: 28.5834 },
    address: 'Josiah Tongogara St, Bulawayo',
    image: 'https://picsum.photos/400/300?random=1',
    wheelchairAccess: true,
    visualImpairmentSupport: false,
    hearingImpairmentSupport: true,
  },
  {
    id: 'fac-2',
    name: 'Natural History Museum',
    type: FacilityType.Attraction,
    location: { lat: -20.1622, lng: 28.5956 },
    address: 'Leopold Takawira Ave, Bulawayo',
    image: 'https://picsum.photos/400/300?random=2',
    wheelchairAccess: true,
    visualImpairmentSupport: true,
    hearingImpairmentSupport: false,
  },
  {
    id: 'fac-3',
    name: 'The Cattleman Steakhouse',
    type: FacilityType.Restaurant,
    location: { lat: -20.1580, lng: 28.5880 },
    address: '26th Ave, Bulawayo',
    image: 'https://picsum.photos/400/300?random=3',
    wheelchairAccess: false,
    visualImpairmentSupport: false,
    hearingImpairmentSupport: false,
  },
   {
    id: 'fac-4',
    name: 'Cresta Churchill Hotel',
    type: FacilityType.Hotel,
    location: { lat: -20.1750, lng: 28.6250 },
    address: 'Matopos Rd, Bulawayo',
    image: 'https://picsum.photos/400/300?random=4',
    wheelchairAccess: true,
    visualImpairmentSupport: true,
    hearingImpairmentSupport: true,
  }
];

export const DUMMY_FEEDBACK: Feedback[] = [
  { id: 'fb-1', rating: 5, review: 'The museum had excellent ramp access.', submittedBy: 'tourist@gmail.com' },
  { id: 'fb-2', rating: 4, review: 'Staff at the hotel were very helpful.', submittedBy: 'tourist2@gmail.com' },
];

export const DUMMY_AUDITS: Audit[] = [
    {
        id: 'audit-1',
        facilityName: 'New Lodge',
        facilityType: FacilityType.Hotel,
        features: {
            wheelchairAccess: true,
            visualImpairmentSupport: false,
            hearingImpairmentSupport: false,
        },
        comments: 'Ramps installed at the main entrance.',
        submittedBy: 'operator@hotel.com'
    }
];
