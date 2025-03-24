export interface Address {
  id: string;
  label: string;
  name: string;
  lotNumber: string;
  planet: "Marte" | "Terra";
  details?: string;
  isDefault?: boolean;
}
