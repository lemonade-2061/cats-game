import { Cat, GameRecord } from "@/types/DB";

export const createCat = (name: string, coatColor: string): Cat => {
    return {
        id: crypto.randomUUID(),
        name,
        age: 0,
        created_at: new Date().toISOString(),
        birthday: new Date().toISOString(),
        coat_color: coatColor,
    };
};

export const getHairball = (gameRecord: GameRecord): number => {
    return gameRecord.hairball_count;
};


