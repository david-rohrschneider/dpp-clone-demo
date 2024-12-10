import { DppData } from "../types/dpp-data";

export const generateId = (): string => {
    // Generate a random 8-character string
    return Math.random().toString(36).substring(2, 10);
};

const generateRandomNumber = (min: number, max: number): number => {
    return Number((Math.random() * (max - min) + min).toFixed(2));
};

const pickRandomElement = <T>(array: T[]): T =>
    array[Math.floor(Math.random() * array.length)];

const PRODUCT_NAMES = ["Product A", "Product B", "Product C"];
const MANUFACTURERS = ["Manufacturer A", "Manufacturer B", "Manufacturer C"];
const MODELS = ["Model A", "Model B", "Model C"];
const CATEGORIES = ["Category A", "Category B", "Category C"];

const generateDpp = (): DppData => {
    return {
        id: generateId(),
        origin: null,
        environmentalData: {
            energyConsumption: {
                value: generateRandomNumber(0, 100),
                unit: "kWh",
            },
            waterConsumption: {
                value: generateRandomNumber(0, 100),
                unit: "l",
            },
            co2Emissions: {
                value: generateRandomNumber(0, 100),
                unit: "kg",
            },
        },
        generalData: {
            productName: pickRandomElement(PRODUCT_NAMES),
            manufacturer: pickRandomElement(MANUFACTURERS),
            model: pickRandomElement(MODELS),
            category: pickRandomElement(CATEGORIES),
            height: generateRandomNumber(0, 100),
            width: generateRandomNumber(0, 100),
            depth: generateRandomNumber(0, 100),
            weight: generateRandomNumber(0, 1000),
        },
    };
};

export default generateDpp;
