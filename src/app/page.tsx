import { redirect } from "next/navigation";

export default function RootPage() {
    // ログイン画面が /login というフォルダにある場合
    redirect("/login"); 
}