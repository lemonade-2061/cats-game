"use client"

import { useRouter } from "next/navigation";

export default function ShopPage() {
    const router = useRouter();
    return (
        <main className="shop-background" style={{position: "relative"}}>
            <div style={{position: "absolute",color: "#000000", top: "20px", right: "200px", display: "flex", gap: "20px", fontSize: "18px", fontWeight: "bold"}}>
                <div><img src="/cat/coin.png" style={{width: "20px", height: "20px"}}/><span>100</span></div>
                <div><img src="/cat/kedama.png" style={{width: "20px", height: "20px"}}/><span>100</span></div>
            </div>
            <></>
            <div className="shop-box">
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "150px"}}>
                    <img src="/cat/coin.png" alt="コイン画像" style={{width: "70px", height: "70px"}}/>
                    <p style={{margin: "5px 0"}}>コイン</p>
                    <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                        <img src="/cat/kedama.png" style={{width: "20px", height: "20px"}}/>
                        <button style={{padding: "5px 10px", fontSize: "12px", border: "2px solid #FF8C42"}}>10</button>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "150px"}}>
                    <img src="/cat/catcan.png" alt="猫缶画像" style={{width: "70px", height: "70px"}}/>
                    <p style={{margin: "5px 0"}}>猫缶</p>
                    <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                        <img src="/cat/coin.png" style={{width: "20px", height: "20px"}}/>
                        <button style={{padding: "5px 10px", fontSize: "12px", border: "2px solid #FF8C42"}}>50</button>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "150px"}}>
                    <img src="/cat/catfood.png" alt="猫の餌画像" style={{width: "70px", height: "70px"}}/>
                    <p style={{margin: "5px 0"}}>猫の餌</p>
                    <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                        <img src="/cat/coin.png" style={{width: "20px", height: "20px"}}/>
                        <button style={{padding: "5px 10px", fontSize: "12px", border: "2px solid #FF8C42"}}>100</button>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100px"}}>
                    <img src="/cat/food.png" alt="餌画像" style={{width: "70px", height: "70px"}}/>
                    <p style={{margin: "5px 0"}}>餌</p>
                    <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                        <img src="/cat/coin.png" style={{width: "20px", height: "20px"}}/>
                        <button style={{padding: "5px 10px", fontSize: "12px", border: "2px solid #FF8C42"}}>250</button>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "150px"}}>
                    <img src="/cat/bed.png" alt="ペットベット画像" style={{width: "70px", height: "70px"}}/>
                    <p style={{margin: "5px 0"}}>ベッド</p>
                    <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                        <img src="/cat/coin.png" style={{width: "20px", height: "20px"}}/>
                        <button style={{padding: "5px 10px", fontSize: "12px", border: "2px solid #FF8C42"}}>250</button>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "150px"}}>
                    <img src="/cat/toilet.png" alt="トイレ画像" style={{width: "70px", height: "70px"}}/>
                    <p style={{margin: "5px 0"}}>トイレ</p>
                    <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                        <img src="/cat/coin.png" style={{width: "20px", height: "20px"}}/>
                        <button style={{padding: "5px 10px", fontSize: "12px", border: "2px solid #FF8C42"}}>300</button>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "150px"}}>
                    <img src="/cat/gage.png" alt="ゲージ画像" style={{width: "70px", height: "70px"}}/>
                    <p style={{margin: "5px 0"}}>ゲージ</p>
                    <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                        <img src="/cat/coin.png" style={{width: "20px", height: "20px"}}/>
                        <button style={{padding: "5px 10px", fontSize: "12px", border: "2px solid #FF8C42"}}>500</button>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100px"}}>
                    <img src="/cat/cattawa-.png" alt="キャットタワー画像" style={{width: "70px", height: "70px"}}/>
                    <p style={{margin: "5px 0", fontSize: "14px"}}>キャットタワー</p>
                    <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                        <img src="/cat/coin.png" style={{width: "20px", height: "20px"}}/>
                        <button style={{padding: "5px 10px", fontSize: "12px", border: "2px solid #FF8C42"}}>1000</button>
                    </div>
                </div>
            </div>
            <button onClick={() => router.push("/care")} style={{padding: "10px 20px",backgroundColor: "#FF8C42", color: "#fff", fontSize: "14px", borderRadius: "5px", position: "fixed", bottom: "20px", left: "50%", transform: "translateX(-50%)"}}>戻る</button>
        </main>
    );
}