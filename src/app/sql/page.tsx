"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";

const supabase = createClient(
  "https://tjeftfaumcgwkqbrfbzg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqZWZ0ZmF1bWNnd2txYnJmYnpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMDA0NDcsImV4cCI6MjA2ODY3NjQ0N30.1UT-BUSAh-sRPWijHHJ1m6Uz0HM2emL5q6TDH-_Vv_o"
);

export default function Sql() {
  const [data, setData] = useState<any[]>([]);
  const [name, setName] = useState<string>("");

  // 获取分类列表
  const cetegoriesList = async () => {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) {
      console.error("获取分类列表失败", error);
    }
    console.log("获取分类列表成功", data);
    setData(data || []);
  };

  // 添加分类
  const addCategory = async () => {
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
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) {
      console.error("删除分类失败", error);
    }
    console.log("删除分类成功");
    cetegoriesList();
  };

  // 更新分类
  const updateCategory = async (id: number, name: string) => {
    const { error } = await supabase.from("categories").update({ name }).eq("id", id);
    if (error) {
      console.error("更新分类失败", error);
    }
    console.log("更新分类成功");
    cetegoriesList();
  };

  useEffect(() => {
    cetegoriesList();
  }, []);

  return (
    <div>
      <h1>分类列表</h1>
      <ol>
        {
          data.map((item) => {
           return <li key={item.id}>
              {item.name}
              <Button onClick={() => deleteCategory(item.id)}>删除</Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">修改</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const newName = formData.get('name') as string;
                    updateCategory(item.id, newName);
                    // 关闭对话框
                    const closeButton = e.currentTarget.closest('[role="dialog"]')?.querySelector('[data-dialog-close]') as HTMLButtonElement;
                    closeButton?.click();
                  }}>
                    <DialogHeader>
                      <DialogTitle>修改分类名称</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor={`name-${item.id}`}>修改你的分类名称</Label>
                        <Input id={`name-${item.id}`} name="name" defaultValue={item.name} />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="outline" data-dialog-close>取消</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button type="submit">保存</Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </li>
          })
        }
      </ol>
      <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <Button onClick={addCategory}>添加分类</Button>
    </div>
  );
}
