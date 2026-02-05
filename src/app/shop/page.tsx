"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { buyItem } from "@/utils/priceLogic";
import type { GameRecord, Item } from "@/types/DB";

const SHOP_ITEMS = [
    { id: "1", name: "コイン", image: "coin.png", price: 10, icon: "hairball.png" },
    { id: "2", name: "猫缶", image: "catcan.png", price: 50, icon: "coin.png" },
    { id: "3", name: "猫の餌", image: "catfood.png", price: 100, icon: "coin.png" },
    { id: "4", name: "餌", image: "food.png", price: 250, icon: "coin.png" },
    { id: "5", name: "ベッド", image: "bed.png", price: 250, icon: "coin.png" },
    { id: "6", name: "トイレ", image: "toilet.png", price: 300, icon: "coin.png" },
    { id: "7", name: "ゲージ", image: "gage.png", price: 500, icon: "coin.png" },
    { id: "8", name: "キャットタワー", image: "cattawa-.png", price: 1000, icon: "coin.png" },
];
//AI
export default function ShopPage() {
    const router = useRouter();
    const [coin, setCoin] = useState(0);
    const [hairball, setHairball] = useState(0);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState<string>("");

    useEffect(() => {
        const fetchBalance = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserId(user.id);
                const { data } = await supabase
                    .from("profile")
                    .select("money, hairball_count")
                    .eq("id", user.id)
                    .single();
                if (data) {
                    setCoin(data.money ?? 0);
                    setHairball(data.hairball_count ?? 0);
                }
            }
        };
        fetchBalance();
    }, []);

    const handleBuy = async (item: Item & { icon: string }) => {
        if (!userId) {
            alert("ユーザーが見つかりません");
            return;
        }

        setLoading(true);
        try {
            const { data: currentRecord } = await supabase
                .from("profile")
                .select("money, hairball_count, items")
                .eq("id", userId)
                .single();

            if (!currentRecord) {
                alert("プロフィール取得失敗");
                return;
            }

            const gameRecord: GameRecord = {
                id: userId,
                user_id: userId,
                cat_id: "",
                created_at: "",
                money: currentRecord.money ?? 0,
                hairball_count: currentRecord.hairball_count ?? 0,
                total_hairball: 0,
                days_played: 0,
                items: currentRecord.items ?? [],
            };

            const result = buyItem(gameRecord, item);
            if (!result.success) {
                alert(result.message);
                setLoading(false);
                return;
            }

            const { error } = await supabase
                .from("profile")
                .update({
                    money: result.data.money,
                    items: result.data.items,
                })
                .eq("id", userId);

            if (error) {
                alert("購入失敗");
                return;
            }

            setCoin(result.data.money);
            alert(`${item.name}を購入しました！`);
        } catch (err) {
            console.error(err);
            alert("購入エラー");
        } finally {
            setLoading(false);
        }
    };
//ここまで
    return (
        <main className="shop-background" style={{position: "relative"}}>
            <div style={{position: "absolute",color: "#000000", top: "20px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "20px", fontSize: "24px", fontWeight: "bold"}}>
                <div style={{display: "flex", alignItems: "center", gap: "5px"}}><img src="/icon/coin.png" alt="coin" style={{width: "28px", height: "28px"}}/><span>{coin}</span></div>
                <div style={{display: "flex", alignItems: "center", gap: "5px"}}><img src="/icon/hairball.png" alt="hairball" style={{width: "28px", height: "28px"}}/><span>{hairball}</span></div>
            </div>

            <div className="shop-box">
                {SHOP_ITEMS.map((item) => (
                    <div key={item.id} style={{display: "flex", flexDirection: "column", alignItems: "center", width: "150px"}}>
                        <img src={`/cat/${item.image}`} alt={item.name} style={{width: "70px", height: "70px"}}/>
                        <p style={{margin: "5px 0"}}>{item.name}</p>
                        <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                            <img src={`/icon/${item.icon}`} alt={item.icon} style={{width: "20px", height: "20px"}}/>
                            <button 
                                onClick={() => handleBuy(item)}
                                disabled={loading || (item.icon === "kedama.png" ? hairball < item.price : coin < item.price)}
                                style={{padding: "5px 10px", fontSize: "12px", border: "2px solid #FF8C42", backgroundColor: (item.icon === "kedama.png" ? hairball < item.price : coin < item.price) ? "#ccc" : "#fff", cursor: (item.icon === "kedama.png" ? hairball < item.price : coin < item.price) || loading ? "not-allowed" : "pointer"}}
                            >
                                {item.price}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={() => router.push("/care")} style={{padding: "10px 20px",backgroundColor: "#FF8C42", color: "#fff", fontSize: "14px", borderRadius: "5px", position: "fixed", bottom: "20px", left: "50%", transform: "translateX(-50%)"}}>戻る</button>
        </main>
    );
}