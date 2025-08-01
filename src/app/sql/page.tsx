"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { getDatabaseInstance } from "@/lib/database/database-connection";

export default function Sql() {
  // 明确指定 data 的类型，防止 unknown 类型报错
// 明确指定 data 的类型为 id: number，防止 string 类型传入 deleteCategory
const [data, setData] = useState<{ id: number; name: string }[]>([]);
  const [name, setName] = useState<string>("");

  // const db = async () => {
  //   // 检查是否在 Tauri 环境中
  //   if (typeof window !== 'undefined' && window.__TAURI__) {
  //     try {
  //       // 动态导入 Tauri SQL 插件
  //       const { default: Database } = await import('@tauri-apps/plugin-sql');
  //       const db = await Database.load('https://tjeftfaumcgwkqbrfbzg.supabase.co');
  //       await db.execute('CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)');
  //       if (name.trim()) {
  //         await db.execute('INSERT INTO categories (name) VALUES ($1)', [name]);
  //         console.log("数据已插入到本地 SQLite 数据库");
  //       }
  //     } catch (error) {
  //       console.error("Tauri SQL 操作失败:", error);
  //     }
  //   } else {
  //     console.log("当前不在 Tauri 环境中，跳过本地数据库操作");
  //   }
  // }

  // 获取分类列表
  const cetegoriesList = async () => {
    const supabase = await getDatabaseInstance();
    const { data, error } = await supabase.from("categories").select("*");
    if (error) {
      console.error("获取分类列表失败", error);
    }
    console.log("获取分类列表成功", data);
    setData(data || []);
  };

  // 添加分类
  const addCategory = async () => {
    const supabase = await getDatabaseInstance();
    const { data, error } = await supabase.from("categories").insert({ name });
    if (error) {
      console.error("添加分类失败", error);
    }
    console.log("添加分类成功", data);
    cetegoriesList();
    setName("");
  };

  // 删除分类
  const deleteCategory = async (id: number) => {
    const supabase = await getDatabaseInstance();
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) {
      console.error("删除分类失败", error);
    }
    console.log("删除分类成功");
    cetegoriesList();
  };

  // 更新分类
  const updateCategory = async (id: number, name: string) => {
    const supabase = await getDatabaseInstance();
    const { error } = await supabase
      .from("categories")
      .update({ name })
      .eq("id", id);
    if (error) {
      console.error("更新分类失败", error);
    }
    console.log("更新分类成功");
    cetegoriesList();
  };

  useEffect(() => {
    cetegoriesList();
    // db();
  }, []);

  return (
    <div>
      <h1>分类列表</h1>
      <ol>
        {data.map((item) => {
          // 类型保护，防止 item.id 或 item.name 为 undefined
          const id = typeof item.id === "number" ? item.id : 0;
          const name = typeof item.name === "string" ? item.name : '';
          return (
            <li key={id}>
              {name}
              <Button onClick={() => deleteCategory(id)}>删除</Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">修改</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const newName = formData.get("name") as string;
                      updateCategory(item.id, newName);
                      // 关闭对话框
                      const closeButton = e.currentTarget
                        .closest('[role="dialog"]')
                        ?.querySelector(
                          "[data-dialog-close]"
                        ) as HTMLButtonElement;
                      closeButton?.click();
                    }}
                  >
                    <DialogHeader>
                      <DialogTitle>修改分类名称</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor={`name-${item.id}`}>
                          修改你的分类名称
                        </Label>
                        <Input
                          id={`name-${item.id}`}
                          name="name"
                          defaultValue={item.name}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant="outline"
                          data-dialog-close
                        >
                          取消
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button type="submit">保存</Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </li>
          );
        })}
      </ol>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={addCategory}>添加分类</Button>
    </div>
  );
}
