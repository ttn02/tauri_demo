"use client";
import { platform } from "os";
import { Button } from "@/components/ui/button";


export default function OsInfo() {
  const getPlatform = () => {
    try {
      // 打印result，是browse而不是操作系统
      const result = platform();
      console.log("平台信息：", result);
    } catch (error) {
      console.error("获取平台信息失败", error);
    }
  };

  return <div>
    <Button onClick={() => getPlatform()}>获取平台信息</Button>
  </div>;
}
