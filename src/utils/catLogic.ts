import { Cat, GameRecord } from "@/types/DB";

export const createCat = (name: string, coatColor: string): Cat => {
    return {
        id: crypto.randomUUID(),
        name: name,
        age: 0,
        created_at: new Date().toISOString(),
        birthday: new Date().toISOString(),
    };
};
const HAIRBALL_INCREMENT = 3;
export const getHairball = (gameRecord: GameRecord): number => {
  return gameRecord.hairball_count + HAIRBALL_INCREMENT;
}


