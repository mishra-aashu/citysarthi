export const VEHICLE_CATEGORIES = [
  { id: 'hatchback', name: 'Hatchback', icon: 'car-side' },
  { id: 'sedan', name: 'Sedan', icon: 'car' },
  { id: 'suv', name: 'SUV / MUV', icon: 'car-estate' },
  { id: 'luxury', name: 'Luxury', icon: 'car-sports' },
  { id: 'bike', name: 'Bike Taxi', icon: 'motorbike' },
  { id: 'auto', name: 'Auto Rickshaw', icon: 'rickshaw' },
  { id: 'tempo', name: 'Tempo / Goods', icon: 'truck' },
  { id: 'bus', name: 'Bus / Traveller', icon: 'bus' },
];

export const TRIP_TYPES = {
  INSTANT: 'INSTANT_RIDE',
  SCHEDULE: 'SCHEDULE_LATER',
  SELF_DRIVE: 'SELF_DRIVE_RENTAL',
};

export const USER_ROLES = {
  CUSTOMER: 'CUSTOMER',
  DRIVER: 'DRIVER',
  HOST: 'HOST',
};
