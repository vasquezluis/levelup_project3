/**
 * * movies interface <contract>
 */

export interface Movie {
  name: string;
  poster: string;
  genders: string[];
  cost: number;
  description: string;
  schedules: string[];
  cinemas: string[];
  active: boolean 
}
