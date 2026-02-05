"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingPage() {
    const router = useRouter();
    const [nakigoe, setNakigoe] = useState(5);
    const [koukakuon, setKoukakuon] = useState(5);
    const [bgm, setBgm] = useState(5);

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
                        onChange={(e) => setNakigoe(Number(e.target.value))}
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
                        onChange={(e) => setKoukakuon(Number(e.target.value))}
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
                        onChange={(e) => setBgm(Number(e.target.value))}
                        style={{width: "100%", cursor: "pointer"}}
                    />
                </div>
                <button type="button" className="setting-back-button" onClick={() => router.push("/care")}>戻る</button>
            </form>
        </main>
    );
}