"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSound } from "../../components/useSound";
import { supabase } from "@/lib/supabase"
import "@/app/globals.css"

export default function SettingPage() {
    const router = useRouter();
    const getInitial = (key: string, fallback: number) => {
        if (typeof window === "undefined") return fallback;
        const v = localStorage.getItem(key);
        return v !== null ? Number(v) : fallback;
    };

    const [newCatName, setNewCatName] = useState("");
    const [newCatKind, setNewCatKind] = useState("");
    const [nakigoe, setNakigoe] = useState<number>(() => getInitial("vol_naki", 5));
    const [koukakuon, setKoukakuon] = useState<number>(() => getInitial("vol_kouka", 5));
    const [bgm, setBgm] = useState<number>(() => getInitial("vol_bgm", 5));

    const { play: playClick } = useSound("/sound/click.mp3", koukakuon);
    const { play: playCat1 } = useSound("/sound/cat1.mp3", nakigoe);
    const { play: playCat2 } = useSound("/sound/cat2.mp3", nakigoe);
    const { play: playCat3 } = useSound("/sound/cat3.mp3", nakigoe);
    //AI
    const playRandomCatSound = (v?: number) => {
        const sounds = [playCat1, playCat2, playCat3];
        const randomIndex = Math.floor(Math.random() * sounds.length);
        sounds[randomIndex](v);
    }

    const handleReturn = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            const { data, error } = await supabase
                .from("profile")
                .update({ cat_name: newCatName, catkind: newCatKind })
                .eq("id", user.id);

            if (error) {
                console.error("settingの保存に失敗しました：" + error.message);
            } else {
                router.push("/care");
            }
        }
    }
    //ここまで
    return (
        <main className="setting-background">
            <form className="setting-form">
                <input　
                    style={{marginRight: "100px",fontSize: "30px",textAlign: "center",margin: "auto"}} 
                    placeholder="猫の名前"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                />
                <select
                    value={newCatKind}
                    onChange={(e) => setNewCatKind(e.target.value)}
                >
                    <option>猫１</option>
                    <option>猫２</option>
                    <option>猫３</option>
                </select>
                
                <div style={{width: "100%"}}>
                    <label>鳴き声: {nakigoe}</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="10" 
                        value={nakigoe}
                        onChange={(e) => {
                            const newVal = Number(e.target.value);
                            setNakigoe(newVal);
                            localStorage.setItem("vol_naki", String(newVal));
                            playRandomCatSound(newVal);
                        }}
                        style={{width: "100%", cursor: "pointer"}}
                    />
                </div>
                <div style={{width: "100%"}}>
                    <label>効果音: {koukakuon}</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="10" 
                        value={koukakuon}
                        onChange={(e) => {
                            const newVal = Number(e.target.value);
                            setKoukakuon(newVal);
                            localStorage.setItem("vol_kouka", String(newVal));
                            playClick(newVal);
                            }}
                        style={{width: "100%", cursor: "pointer"}}
                    />
                </div>
                <div style={{width: "100%"}}>
                    <label>バックミュージック: {bgm}</label>
                    <input 
                        type="range" 
                        min="0" 
                        max="10" 
                        value={bgm}
                        onChange={(e) => {
                            const newVal = Number(e.target.value);
                            setBgm(newVal);
                            localStorage.setItem("vol_bgm", String(newVal));
                        }}
                        style={{width: "100%", cursor: "pointer"}}
                    />
                </div>
                <button type="button" className="setting-back-button" onClick={handleReturn}>戻る</button>
            </form>
        </main>
    );
}