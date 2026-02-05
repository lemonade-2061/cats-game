import { GameRecord, Item } from "@/types/models";
import { HAIRBALL_INCREMENT } from "./constants";

type Result = { success: true; data: GameRecord } | { success: false; message: string };

export const addMoney = (gameRecord: GameRecord): Result => {
    if (gameRecord.hairball_count < HAIRBALL_INCREMENT) {
        return { success: false, message: `毛玉が${HAIRBALL_INCREMENT - gameRecord.hairball_count}個足りないよ！` };
    }
    return {
        success: true,
        data: {
            ...gameRecord,
            money: gameRecord.money + 1,
            hairball_count: gameRecord.hairball_count - HAIRBALL_INCREMENT,
        }
    }
};

export const buyItem = (gameRecord: GameRecord, item: Item & { icon: string }): Result => {
    const isCoinItem = item.icon === "coin.png";
    const currency = isCoinItem ? gameRecord.money : gameRecord.hairball_count;
    
    if (currency < item.price) {
        const currencyName = isCoinItem ? "コイン" : "毛玉";
        return { success: false, message: `${currencyName}が足りないよ！` };
    }

    return {
        success: true,
        data: {
            ...gameRecord,
            money: isCoinItem ? gameRecord.money - item.price : gameRecord.money,
            hairball_count: isCoinItem ? gameRecord.hairball_count : gameRecord.hairball_count - item.price,
            items: [...gameRecord.items, item],
        }
    }
};