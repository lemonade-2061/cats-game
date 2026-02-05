"use client"

import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

export default function CarePage() {
    const [coin, setCoin] = useState<number>(0);
    const [hairball, setHairball] = useState<number>(0);
    const [catName, setCatName] = useState<string>("猫の名前");
    const hairballExpecter = 0;

    useEffect(() => {
        const fetchCurrency = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                // try to read existing profile
                const { data, error } = await supabase
                    .from("profile")
                    .select("money, hairball, cat_name")
                    .eq("id", user.id)
                    .maybeSingle();

                if (error) {
                    console.error("エラーが発生しました:", error.message);
                } else if (!data) {
                    // no row for this user yet — create one and use its values
                    const { data: inserted, error: insertError } = await supabase
                        .from("profile")
                        .upsert({
                        id: user.id,
                        money: 0,
                        hairball: 0,
                        cat_name: "猫の名前"
                        })
                        .select("money, hairball, cat_name")
                        .single();

                    if (insertError) {
                        console.error("profile の作成に失敗しました:", insertError.message);
                    } else if (inserted) {
                        console.log("profile 作成と受け取り成功");
                        setCoin(inserted.money ?? 0);
                        setHairball(inserted.hairball ?? 0);
                        if (inserted.cat_name) setCatName(inserted.cat_name);
                    }
                } else {
                    console.log("受け取り成功");
                    setCoin(data.money ?? 0);
                    setHairball(data.hairball ?? 0);
                    if (data.cat_name) setCatName(data.cat_name);
                }
            }
        }
        fetchCurrency();
    }, [])

    const handleBrush = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                alert("ユーザーが見つかりません");
                return;
            }

            // multiplier: 0.5 ~ 1.3
            const multiplier = 0.5 + Math.random() * 0.8;
            // use current hairball as base; if zero, use 1 so brush still has effect
            const base = hairball > 0 ? hairball : 1;
            const delta = Math.max(1, Math.round(base * multiplier));

            // Read latest value from DB to avoid relying only on local state
            const { data: currentRow, error: selectError } = await supabase
                .from("profile")
                .select("id, hairball")
                .eq("id", user.id)
                .single();

            if (selectError) {
                console.error("hairball の取得に失敗しました:", selectError.message);
                return;
            }

            const currentHairball = currentRow?.hairball ?? 0;
            const newHairball = currentHairball + delta;

            const { data: updated, error: updateError } = await supabase
                .from("profile")
                .update({ hairball: newHairball })
                .eq("id", user.id)
                .select("hairball")
                .single();

            if (updateError) {
                console.error("hairball の更新に失敗しました:", updateError.message);
                return;
            }

            setHairball(updated?.hairball ?? newHairball);
        } catch (err) {
            console.error(err);
        }
    };
    const handleToy = () => hairballExpecter + 2;
    const handleFood = () => hairballExpecter + 3;
    const handleShop = () => console.log("shop clicked");

    return (
        <main className="care-background">
            <div className="care-ui">
                <div className="top-left">{catName}</div>

                <div className="top-right" role="status" aria-label="currency-stats">
                    <div className="stat" aria-hidden="false">
                        <img src="/icon/coin.png" alt="coin" />
                        <span>{coin}</span>
                    </div>
                    <div className="stat" aria-hidden="false">
                        <img src="/icon/hairball.png" alt="hairball" />
                        <span>{hairball}</span>
                    </div>
                </div>

                <div className="left-tools">
                    <button className="icon-button" onClick={handleBrush} aria-label="brush">
                        <img src="/icon/brush.png" alt="brush" />
                    </button>
                    <button className="icon-button" onClick={handleToy} aria-label="toy">
                        <img src="/icon/toy.png" alt="toy" />
                    </button>
                    <button className="icon-button" onClick={handleFood} aria-label="food">
                        <img src="/icon/food.png" alt="food" />
                    </button>
                </div>

                <div className="right-tools">
                    <button className="icon-button" onClick={handleShop} aria-label="shop">
                        <img src="/icon/shop.png" alt="shop" />
                    </button>
                </div>

                <div className="center-cat">
                    <img src="/cat/brouncat.png" alt="cat" />
                </div>
            </div>
        </main>
    );
}
