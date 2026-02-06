"use client"

import { supabase } from "@/lib/supabase";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSound } from "../../components/useSound";
import "@/app/globals.css"

export default function CarePage() {
    const [coin, setCoin] = useState<number>(0);
    const [hairball, setHairball] = useState<number>(0);
    const [catName, setCatName] = useState<string>("猫の名前");
    const [catKind, setCatKind] = useState<string>("猫１");
    const [hairballExpecter, sethairballExpecter] = useState<number>(0);
    const router = useRouter();

    const [nakigoe, setNakigoe] = useState(5);
    const [kouka, setKouka] = useState(5);

    const { play: playClick } = useSound("/sound/click.mp3", kouka);
    const { play: playCat1 } = useSound("/sound/cat1.mp3", nakigoe);
    const { play: playCat2 } = useSound("/sound/cat2.mp3", nakigoe);
    const { play: playCat3 } = useSound("/sound/cat3.mp3", nakigoe);

    useEffect(() => {
        const savedNaki = localStorage.getItem("vol_naki");
        const savedKouka = localStorage.getItem("vol_kouka");
        if (savedNaki) setNakigoe(Number(savedNaki));
        if (savedKouka) setKouka(Number(savedKouka));
        
    }, []);

    const playRandomCatSound = (v?: number) => {
        const sounds = [playCat1, playCat2, playCat3];
        const randomIndex = Math.floor(Math.random() * sounds.length);
        sounds[randomIndex](v);
    };

    useEffect(() => {
        const fetchCurrency = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                // try to read existing profile
                const { data, error } = await supabase
                    .from("profile")
                    .select("money, hairball, cat_name, catkind")
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
                        .select("money, hairball, cat_name, catkind")
                        .single();

                    if (insertError) {
                        console.error("profile の作成に失敗しました:", insertError.message);
                    } else if (inserted) {
                        console.log("profile 作成と受け取り成功");
                        setCoin(inserted.money ?? 0);
                        setHairball(inserted.hairball ?? 0);
                        if (inserted.cat_name) setCatName(inserted.cat_name);
                        if (inserted.catkind) setCatKind(inserted.catkind);
                    }
                } else {
                    console.log("受け取り成功");
                    setCoin(data.money ?? 0);
                    setHairball(data.hairball ?? 0);
                    if (data.cat_name) setCatName(data.cat_name);
                    if (data.catkind) setCatKind(data.catkind);
                }
            }
        }
        fetchCurrency();
    }, [])

    const handleBrush = async () => {
        playClick();
        playRandomCatSound(nakigoe);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                alert("ユーザーが見つかりません");
                return;
            }

            // multiplier: 0.5 ~ 1.3
            const multiplier = 0.5 + Math.random() * 0.8;
            const delta = Math.max(1, Math.round(hairballExpecter * multiplier));
            console.log("hairBallExpecter:" + Math.max(1, Math.round(hairballExpecter * multiplier)));

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
            } else {
                sethairballExpecter(0);
            }

            setHairball(updated?.hairball ?? newHairball);
        } catch (err) {
            console.error(err);
        }
    };
    const handleToy = () => {
        sethairballExpecter(hairballExpecter + 2);
        playClick();
    }
    const handleFood = () => {
        sethairballExpecter(hairballExpecter + 3);
        playClick();
    }
    const handleCatClick = () => {
        // 猫をクリックした時に鳴き声を再生
        playRandomCatSound(nakigoe);
    };
    const handleShop = () => {
        router.push("/shop");
        playClick();
    }
    const handleSetting = () => {
        router.push("/setting");
        playClick();
    }

    const getCatImage = () => {
        switch (catKind) {
            case "猫１":
                return "/cat/cat1.png";
            case "猫２":
                return "/cat/cat2.png";
            case "猫３":
                return "/cat/cat3.png";
            default:
                return "/cat/cat1.png";
        }
    };

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
                    <button className="icon-button" onClick={handleSetting} aria-label="setting">
                        <img src="/icon/setting.png" alt="setting" />
                    </button>
                </div>

                <div className="center-cat">
                    <button 
                        onClick={handleCatClick}
                        style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            padding: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        aria-label="cat"
                    >
                        <img src={getCatImage()} alt="cat" />
                    </button>
                </div>
            </div>
        </main>
    );
}
