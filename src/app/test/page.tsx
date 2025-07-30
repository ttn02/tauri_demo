'use client';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { platform } from "@tauri-apps/plugin-os";
import { useRouter } from "next/navigation";
import { load } from '@tauri-apps/plugin-store';

export default function Test() {
  const [currentPlatform, setCurrentPlatform] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const getPlatform = async () => {
      try {
        const result = await platform();
        console.log("平台信息：", result);
        setCurrentPlatform(result);
      } catch (error) {
        console.error("获取平台信息失败", error);
      }
    };

    if (typeof window !== "undefined" && window.__TAURI__?.invoke) {
      getPlatform();
    } else {
      console.warn("当前不在 Tauri 环境中");
    }

    const getStore = async () => {
      const store = await load('store.json', { autoSave: false });
      await store.set('some-key', { value: 5 });
      const val = await store.get<{ value: number }>('some-key');
      console.log(val); 
      await store.save();
    }
    getStore();
  }, []);

  return (
    <div>
      <div>当前平台：{currentPlatform || "加载中..."}</div>
      <Button onClick={() => router.push('/')}>跳转到home页面</Button>
    </div>
  );
}