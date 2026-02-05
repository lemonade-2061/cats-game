"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSound } from "../../components/useSound";

export default function SettingPage() {
    const router = useRouter();
    const [nakigoe, setNakigoe] = useState(5);
    const [koukakuon, setKoukakuon] = useState(5);
    const [bgm, setBgm] = useState(5);
    //AI
    useEffect(() => {
        const savedNaki = localStorage.getItem("vol_naki");
        const savedKouka = localStorage.getItem("vol_kouka");
        const savedBgm = localStorage.getItem("vol_bgm");

        if (savedNaki !== null) setNakigoe(Number(savedNaki));
        if (savedKouka !== null) setKoukakuon(Number(savedKouka));
        if (savedBgm !== null) setBgm(Number(savedBgm));
    }, []);
    //ここまで
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
    //ここまで
    return (
        <main className="setting-background">
            <form className="setting-form">
                <input style={{marginRight: "100px",fontSize: "30px",textAlign: "center",margin: "auto"}} placeholder="猫の名前"/>
                <select>
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
                <button type="button" className="setting-back-button" onClick={() => router.push("/care")}>戻る</button>
            </form>
        </main>
    );
}