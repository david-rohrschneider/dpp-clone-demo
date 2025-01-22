type Unit = "kg" | "l" | "kWh";

type DppDataValue = {
  value: number;
  unit: Unit;
};

export type EnvironmentalData = {
  energyConsumption: DppDataValue;
  waterConsumption: DppDataValue;
  co2Emissions: DppDataValue;
};

export type GeneralData = {
  productName: string;
  manufacturer: string;
  model: string;
  category: string;
  height: number;
  width: number;
  depth: number;
  weight: number;
};

export type DppData = {
  id: string;
  origin: string | null;
  environmentalData: EnvironmentalData;
  generalData: GeneralData;
};

export type DppUpdate = {
  environmentalData?: Partial<EnvironmentalData>;
  generalData?: Partial<GeneralData>;
};
