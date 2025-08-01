"use client";
import { check } from "@tauri-apps/plugin-updater";
import { Button } from "@/components/ui/button";

export default function Updater() {
  const checkUpdate = async () => {
    try {
      const update = await check();
      if (update) {
        console.log("新版本可用:", update?.version);
      } else {
        console.log("已是最新版本");
      }
    } catch (error) {
      console.error("检查更新出错", error);
    }
  };

  return (
    <div>
      <Button onClick={checkUpdate}>检查伪造更新</Button>
    </div>
  );
}