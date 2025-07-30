'use client';

import { useEffect, useState } from 'react';

interface UpdateInfo {
  available: boolean;
  currentVersion: string;
  version?: string;
  date?: string;
  body?: string;
}

export default function Updater() {
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const checkForUpdates = async () => {
    try {
      setIsChecking(true);
      // 在生产环境中，这里会调用真实的更新检查API
      // const { check } = await import('@tauri-apps/plugin-updater');
      // const update = await check();
      
      // 模拟检查更新的过程
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟没有更新可用的情况
      setUpdateInfo({
        available: false,
        currentVersion: '0.1.0'
      });
    } catch (error) {
      console.error('检查更新失败:', error);
      setUpdateInfo({
        available: false,
        currentVersion: '0.1.0'
      });
    } finally {
      setIsChecking(false);
    }
  };

  const downloadAndInstall = async () => {
    if (!updateInfo?.available) return;

    try {
      setIsDownloading(true);
      
      // 模拟下载进度
      for (let i = 0; i <= 100; i += 10) {
        setDownloadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      // 在实际应用中，这里会调用真实的更新安装
      // const { check } = await import('@tauri-apps/plugin-updater');
      // const update = await check();
      // await update.downloadAndInstall();
      
      alert('更新下载完成！请手动重启应用以应用更新。');
    } catch (error) {
      console.error('更新失败:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  // 组件挂载时自动检查更新
  useEffect(() => {
    checkForUpdates();
  }, []);

  if (!updateInfo) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <p>正在检查更新...</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3">应用更新</h3>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          当前版本: <span className="font-medium">{updateInfo.currentVersion}</span>
        </p>
      </div>

      {updateInfo.available ? (
        <div className="space-y-4">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="text-blue-800 font-medium">
              发现新版本: {updateInfo.version}
            </p>
            {updateInfo.date && (
              <p className="text-blue-600 text-sm">
                发布日期: {new Date(updateInfo.date).toLocaleDateString()}
              </p>
            )}
          </div>

          {updateInfo.body && (
            <div className="p-3 bg-gray-50 rounded">
              <h4 className="font-medium mb-2">更新内容:</h4>
              <div className="text-sm text-gray-700 whitespace-pre-wrap">
                {updateInfo.body}
              </div>
            </div>
          )}

          {isDownloading && (
            <div className="space-y-2">
              <p className="text-sm">正在下载更新...</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${downloadProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">{downloadProgress.toFixed(1)}%</p>
            </div>
          )}

          <div className="flex space-x-3">
            <button
              onClick={downloadAndInstall}
              disabled={isDownloading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? '正在更新...' : '立即更新'}
            </button>
            <button
              onClick={checkForUpdates}
              disabled={isChecking || isDownloading}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              {isChecking ? '检查中...' : '重新检查'}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-green-600">✓ 您使用的是最新版本</p>
          <button
            onClick={checkForUpdates}
            disabled={isChecking}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            {isChecking ? '检查中...' : '检查更新'}
          </button>
        </div>
      )}
    </div>
  );
}
