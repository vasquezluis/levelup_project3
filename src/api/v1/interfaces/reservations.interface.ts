/**
 * * reservations interface <contract>
 */

export interface Reservation {
  userId: string;
  movieId: string;
  schedule: string;
  active: boolean;
}
