import { Cat, GameRecord } from "@/types/models";

export const createCat = (name: string): Cat => {
    return {
        id: crypto.randomUUID(),
        name,
        age: 0,
        created_at: new Date().toISOString(),
        birthday: new Date().toISOString(),
    };
};

export const getHairball = (gameRecord: GameRecord): number => {
    return gameRecord.hairball_count;
};


