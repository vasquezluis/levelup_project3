/**
 * * accreditation interface <contract>
 */

export interface Accreditation {
  userId: string;
  credits: number;
  coupon: string;
  paid: boolean;
  accepted: boolean;
  active: boolean;
}
