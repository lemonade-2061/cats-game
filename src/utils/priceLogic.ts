import { GameRecord, Item } from "@/types/DB"

type Result = { success: true; data: GameRecord } | { success: false; message: string };

export const addMoney = (gameRecord: GameRecord): Result => {
    if (gameRecord.hairball_count < 10) {
        return { success: false, message: "毛玉が足りないよ！" };
    }
    return {
        success: true,
        data: {
            ...gameRecord,
            money: gameRecord.money + 1,
            hairball_count: gameRecord.hairball_count - 10,
        }
    }
};

export const buyItem = (gameRecord: GameRecord, item: Item): Result => {
    if (gameRecord.money < item.price) {
        return { success: false, message: "お金がないよ！" };
    }


    return {
        success: true,
        data: {
            ...gameRecord,
            money: gameRecord.money - item.price,
            items: [...gameRecord.items, item],
        }
    }
}