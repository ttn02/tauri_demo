'use client';
import { Button } from "@/components/ui/button";
import { scan, Format } from '@tauri-apps/plugin-barcode-scanner';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [result, setResult] = useState('');
  const router = useRouter();
  useEffect(() => {
    if (window.__TAURI__?.invoke) {
      scan({ windowed: true, formats: [Format.QRCode] }).then((res) => {
        setResult(res.content);
      });
    }
  }, []);
  return (
    <div >
      <Button onClick={() => router.push('/test')}>跳转到test页面</Button>
    </div>
  );
}

