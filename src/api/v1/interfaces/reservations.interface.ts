/**
 * * reservations interface <contract>
 */

export interface Reservation {
  userId: string;
  movieId: string
  schedule: string
  cinema: string
  active: boolean
}
