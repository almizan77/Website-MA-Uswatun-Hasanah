// Simple IndexedDB storage helper for high-resolution school building photos
const DB_NAME = 'SchoolAssetsDB';
const DB_VERSION = 1;
const STORE_NAME = 'images';
const HERO_KEY = 'custom_hero_image';
const SANTRI_KEY = 'custom_santri_image';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveCustomHeroImage(fileOrBlob: Blob): Promise<string> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const putRequest = store.put(fileOrBlob, HERO_KEY);
    putRequest.onsuccess = () => {
      const url = URL.createObjectURL(fileOrBlob);
      // Dispatch a custom event so all components update immediately
      window.dispatchEvent(new CustomEvent('hero-image-updated', { detail: url }));
      resolve(url);
    };
    putRequest.onerror = () => reject(putRequest.error);
  });
}

export async function getCustomHeroImage(): Promise<string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const getRequest = store.get(HERO_KEY);
      getRequest.onsuccess = () => {
        const result = getRequest.result;
        if (result && result instanceof Blob) {
          resolve(URL.createObjectURL(result));
        } else {
          resolve(null);
        }
      };
      getRequest.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function resetCustomHeroImage(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const delRequest = store.delete(HERO_KEY);
    delRequest.onsuccess = () => {
      window.dispatchEvent(new CustomEvent('hero-image-updated', { detail: null }));
      resolve();
    };
    delRequest.onerror = () => reject(delRequest.error);
  });
}

export async function saveCustomSantriImage(fileOrBlob: Blob): Promise<string> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const putRequest = store.put(fileOrBlob, SANTRI_KEY);
    putRequest.onsuccess = () => {
      const url = URL.createObjectURL(fileOrBlob);
      window.dispatchEvent(new CustomEvent('santri-image-updated', { detail: url }));
      resolve(url);
    };
    putRequest.onerror = () => reject(putRequest.error);
  });
}

export async function getCustomSantriImage(): Promise<string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const getRequest = store.get(SANTRI_KEY);
      getRequest.onsuccess = () => {
        const result = getRequest.result;
        if (result && result instanceof Blob) {
          resolve(URL.createObjectURL(result));
        } else {
          resolve(null);
        }
      };
      getRequest.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function resetCustomSantriImage(): Promise<void> {
  return resetNamedImage(SANTRI_KEY);
}

export async function saveNamedImage(key: string, fileOrBlob: Blob): Promise<string> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const putRequest = store.put(fileOrBlob, key);
    putRequest.onsuccess = () => {
      const url = URL.createObjectURL(fileOrBlob);
      window.dispatchEvent(new CustomEvent(`image-updated-${key}`, { detail: url }));
      resolve(url);
    };
    putRequest.onerror = () => reject(putRequest.error);
  });
}

export async function getNamedImage(key: string): Promise<string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const getRequest = store.get(key);
      getRequest.onsuccess = () => {
        const result = getRequest.result;
        if (result && result instanceof Blob) {
          resolve(URL.createObjectURL(result));
        } else {
          resolve(null);
        }
      };
      getRequest.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function resetNamedImage(key: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const delRequest = store.delete(key);
    delRequest.onsuccess = () => {
      window.dispatchEvent(new CustomEvent(`image-updated-${key}`, { detail: null }));
      resolve();
    };
    delRequest.onerror = () => reject(delRequest.error);
  });
}


