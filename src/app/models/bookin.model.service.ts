export interface Booking {
  _id: string;
  clientId: string;
  serviceId: { _id: string; name: string };  // Note: an object
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  notes?: string;
  // …
}
