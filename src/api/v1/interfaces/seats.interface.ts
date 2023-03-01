/**
 * * seats interface <contract>
 */

export interface Seat {
  movieId: string;
  movie: string;
  available: string[];
  occupied: string[];
  active: boolean;
}
