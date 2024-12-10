type Unit = "kg" | "l" | "kWh";

type DppDataValue = {
    value: number;
    unit: Unit;
};

export type DppData = {
    id: string;
    origin: string | null;
    environmentalData: {
        energyConsumption: DppDataValue;
        waterConsumption: DppDataValue;
        co2Emissions: DppDataValue;
    };
    generalData: {
        productName: string;
        manufacturer: string;
        model: string;
        category: string;
        height: number;
        width: number;
        depth: number;
        weight: number;
    };
};
