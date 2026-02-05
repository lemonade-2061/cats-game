import { Cat, GameRecord } from "@/types/DB";

export const createCat = (name: string, coartColor: string): Cat => {
    return {
        id: crypto.randomUUID(),
        name: name,
        coatColor: coartColor,
        age: 0,
        created_at: new Date().toISOString(),
        birthday: new Date().toISOString(),
    };
};

export const getHairball = (gameRecord: GameRecord): number => {
    return gameRecord.hairball_count += 3;
}


