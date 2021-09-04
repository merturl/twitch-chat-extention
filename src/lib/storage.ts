function checkLocalStorage() {
  try {
    window.localStorage.setItem('test', 'test');
    window.localStorage.removeItem('test');
    return true;
  } catch (e) {
    return false;
  }
}

class FallbackStorage {
  fallbackStorage: {
    [key: string]: string;
  } = {};

  valid: boolean = checkLocalStorage();

  setItem(key: string, value: any) {
    const strValue = JSON.stringify(value);
    if (this.valid) {
      window.localStorage.setItem(key, strValue);
      return;
    }
    this.fallbackStorage[key] = strValue;
  }

  getItem(key: string) {
    let value = this.valid ? window.localStorage.getItem(key) : this.fallbackStorage[key];
    try {
      const parsed = JSON.parse(value || '');
      return parsed;
    } catch (e) {
      return null;
    }
  }

  removeItem(key: string) {
    if (this.valid) {
      window.localStorage.removeItem(key);
      return;
    }
    delete this.fallbackStorage[key];
  }
}

const storage = new FallbackStorage();

export default storage;
