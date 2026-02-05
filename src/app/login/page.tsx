"use client"

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) alert(error.message);
        else router.push("/care");
        setLoading(false);
    };

    const EnterNewAccountPage = async () => {
        router.push("/newAccount");
    };

    return (
        <main className="login-background">
            
            <form
                onSubmit={handleLogin}
                className="login-form"
            >
                <h1 style={{ margin: 0, textAlign: "center", fontSize: "28px" }}>ログイン</h1>

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
                    {loading ? "読み込み中..." : "ログイン"}
                </button>

                <button type="button" onClick={EnterNewAccountPage} style={{ padding: 12, borderRadius: 8, cursor: "pointer" }}>
                    新規登録へ
                </button>
            </form>
        </main>
    );
}

