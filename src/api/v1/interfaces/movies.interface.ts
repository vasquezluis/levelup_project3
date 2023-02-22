/**
 * * movies interface <contract>
 */

export interface Movie {
  name: string;
  poster: string;
  trailer: string;
  genders: string[];
  cost: number;
  description: string;
  schedules: any[];
  active: boolean;
}
