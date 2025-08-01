"use client";

import { exists } from "@tauri-apps/plugin-fs";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function FileSystem() {
  const [exist, setExists] = useState("");
  const file = async () => {
    const exist = await exists("$APPDATA/demo.txt");
    console.log("文件是否存在:", exist);
    setExists(exist ? "存在" : "不存在");
  };
  return (
    <div>
      <Button onClick={file}>检查文件是否存在</Button>
      <p>{exist}</p>
    </div>
  );
}
