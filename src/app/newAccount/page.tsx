"use client"

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewAccountPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) alert(error.message);
        else router.push("/login");
        setLoading(false);
    };

    const enterLoginPage = async () => {
        router.push("/login");
    };

    return (
        <main className="ninshou-background">

            <form
                onSubmit={signUp}
                className="login-form"
            >
                <h1 style={{ margin: 0, textAlign: "center", fontSize: "28px" }}>新規登録</h1>

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="メールアドレス"
                    required
                    style={{ padding: 12, borderRadius: 8, border: "1px solid #ccc" }}
                />

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="パスワード"
                    required
                    style={{ padding: 12, borderRadius: 8, border: "1px solid #ccc" }}
                />

                <button type="submit" disabled={loading} style={{ padding: 12, borderRadius: 8, cursor: "pointer" }}>
                    {loading ? "読み込み中..." : "新規登録"}
                </button>

                <button type="button" onClick={enterLoginPage} style={{ padding: 12, borderRadius: 8, cursor: "pointer" }}>
                    ログインへ
                </button>
            </form>
        </main>
    );
}

