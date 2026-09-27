export interface JobDetail {
  guid: string;
  title: string;
  excerpt: string;
  companyName: string;
  companyLogo: string;
  employmentType: string;
  minSalary: number | null;
  maxSalary: number | null;
  currency: string;
  locationRestrictions: string[];
  description: string;
  applicationLink: string;
  pubDate: number;
  seniority: string;
}
