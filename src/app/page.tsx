'use client';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <div >
      <Button onClick={() => router.push('/test')}>跳转到test页面</Button>
      <Button onClick={() => router.push('/os-info')}>跳转到os-info页面</Button>
      <Button onClick={() => router.push('/updater')}>跳转到updater页面</Button>
      <Button onClick={() => router.push('/file-system')}>跳转到file-system页面</Button>
      <Button onClick={() => router.push('/sql')}>跳转到sql页面</Button>
    </div>
  );
}

