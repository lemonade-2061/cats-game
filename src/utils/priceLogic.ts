import { GameRecord, Item } from "@/types/models";
import { HAIRBALL_INCREMENT } from "./constants";
import { SupabaseClient } from "@supabase/supabase-js";

type Result = { success: true; data: GameRecord } | { success: false, message: string };

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

export const buyItem = async (
    gameRecord: GameRecord,
    item: Item & { icon: string },
    supabase: SupabaseClient,
    userId: string
): Promise<Result> => {
    const isCoinItem = item.icon === "coin.png";
    const currency = isCoinItem ? gameRecord.money : gameRecord.hairball_count;
    
    if (currency < item.price) {
        const currencyName = isCoinItem ? "コイン" : "毛玉";
        return { success: false, message: `${currencyName}が足りないよ！` };
    }

    try {
        // user_items で既存アイテムをチェック
        const { data: existingItem } = await supabase
            .from("user_items")
            .select("id, quantity")
            .eq("user_id", userId)
            .eq("item_id", item.id)
            .single();

        if (existingItem) {
            // quantity を増やす
            await supabase
                .from("user_items")
                .update({ quantity: existingItem.quantity + 1 })
                .eq("id", existingItem.id);
        } else {
            // 新規作成
            await supabase
                .from("user_items")
                .insert({
                    user_id: userId,
                    item_id: item.id,
                    item_name: item.name,
                    quantity: 1,
                });
        }

        // profile を更新
        const updateData = isCoinItem
            ? { money: gameRecord.money - item.price }
            : { hairball_count: gameRecord.hairball_count - item.price };

        await supabase
            .from("profile")
            .update(updateData)
            .eq("id", userId);

        return {
            success: true,
            data: {
                ...gameRecord,
                money: isCoinItem ? gameRecord.money - item.price : gameRecord.money,
                hairball_count: isCoinItem ? gameRecord.hairball_count : gameRecord.hairball_count - item.price,
            }
        };
    } catch (error) {
        return { success: false, message: "購入処理でエラー" };
    }
};