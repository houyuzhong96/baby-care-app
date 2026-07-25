
// 自动云同步服务 - 使用 jsonblob.com 免费 JSON 存储

const SYNC_URL_KEY = 'sync_blob_url';
const DEEPSEEK_KEY = 'deepseek_key';
const DEFAULT_KEY = ''; // 在设置中配置你的API Key

// 初始化 API Key（如果没有设置就用默认值）
export function initApiKey() {
  if (!localStorage.getItem(DEEPSEEK_KEY)) {
    localStorage.setItem(DEEPSEEK_KEY, DEFAULT_KEY);
  }
  return localStorage.getItem(DEEPSEEK_KEY) || '';
}

// 获取所有 localStorage 数据
export function getAllData(): Record<string, any> {
  const data: Record<string, any> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)!;
    try { data[key] = JSON.parse(localStorage.getItem(key)!); } 
    catch { data[key] = localStorage.getItem(key); }
  }
  return data;
}

// 上传数据到云端（创建或更新 blob）
export async function pushToCloud(): Promise<string | null> {
  const data = getAllData();
  const existingUrl = localStorage.getItem(SYNC_URL_KEY);
  
  try {
    if (existingUrl) {
      // 更新已有 blob
      await fetch(existingUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return existingUrl;
    } else {
      // 创建新 blob
      const res = await fetch('https://jsonblob.com/api/jsonBlob', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const blobUrl = res.headers.get('Location') || '';
        if (blobUrl) {
          localStorage.setItem(SYNC_URL_KEY, blobUrl);
          return blobUrl;
        }
      }
      throw new Error('创建同步失败');
    }
  } catch (e) {
    console.warn('Cloud sync failed:', e);
    return null;
  }
}

// 从云端拉取数据
export async function pullFromCloud(): Promise<boolean> {
  const url = localStorage.getItem(SYNC_URL_KEY);
  if (!url) return false;
  
  try {
    const res = await fetch(url);
    if (!res.ok) return false;
    const data = await res.json();
    
    // 合并云端数据到本地（云端优先）
    for (const [key, value] of Object.entries(data)) {
      localStorage.setItem(key, typeof value === 'string' ? value as string : JSON.stringify(value));
    }
    return true;
  } catch {
    return false;
  }
}

// 设置同步 URL（用于在其他设备上连接已有同步）
export function setSyncUrl(url: string) {
  if (url.includes('jsonblob.com')) {
    localStorage.setItem(SYNC_URL_KEY, url);
  }
}

// 获取当前同步 URL
export function getSyncUrl(): string {
  return localStorage.getItem(SYNC_URL_KEY) || '';
}
