export function getLocalStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (err) {
    return null;
  }
}

export function setLocalStorage(key: string, data: string): void {
  try {
    localStorage.setItem(key, data);
  } catch (err) {
    console.error(err);
  }
}

export function removeLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(err);
  }
}

export function clearLocalStorage(): void {
  localStorage.clear();
}

export function getSessionStorage(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch (err) {
    return null;
  }
}

export function setSessionStorage(key: string, data: string): void {
  try {
    sessionStorage.setItem(key, data);
  } catch (err) {
    console.error(err);
  }
}

export function removeSessionStorage(key: string): void {
  try {
    sessionStorage.removeItem(key);
  } catch (err) {
    console.error(err);
  }
}

export function clearSessionStorage(): void {
  sessionStorage.clear();
}
