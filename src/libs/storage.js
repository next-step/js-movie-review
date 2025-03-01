export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`스토리지에서 키 [${key}]를 가져오는 중 오류 발생`, error);
      return defaultValue;
    }
  },

  update: (key, value) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`스토리지에 키 [${key}]를 저장하는 중 오류 발생`, error);
    }
  },

  delete: (key) => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`스토리지에서 키 [${key}]를 삭제하는 중 오류 발생`, error);
    }
  },

  reset: () => {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error(`스토리지를 초기화하는 중 오류 발생`, error);
    }
  },
};
