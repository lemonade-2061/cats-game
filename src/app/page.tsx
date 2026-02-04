'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase' // パスが不安ならこれで

export default function Home() {
  const [name, setName] = useState('')

  const createCat = async () => {
    // ボタンが押されたか確認
    console.log('登録ボタン押したよ:', name)

    const { data, error } = await supabase
      .from('cats')
      .insert([{ name: name }])
      .select()

    if (error) {
      alert('エラー: ' + error.message)
    } else {
      alert('成功！猫が登録されました')
      setName('')
    }
  }

  return (
    <main style={{ padding: '50px' }}>
      <h1>猫ゲーテスト</h1>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="猫の名前"
        style={{ color: 'black', padding: '8px', marginRight: '10px' }}
      />
      <button onClick={createCat} style={{ padding: '8px 16px' }}>
        猫を登録
      </button>
    </main>
  )
}