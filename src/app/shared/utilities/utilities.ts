export const isLatinStr = (str: string): boolean => {
  return !(/[^\u0000-\u00ff]/.test(str));
}

// take a str and split into a string array with max len
export const getStrArrayFromStr = (str: string, maxLen: number = 4, maxLatinLen: number = 8): string[] => {
  let result: string[] = [];
  str.split(' ').map(token => {
    // check if contain non-latin characters, then set maxLen
    const tokenMaxLen = isLatinStr(token) ? maxLatinLen : maxLen;
    const items = Math.ceil(token.length / tokenMaxLen);   // number of items for this token
    const len = Math.ceil(token.length / items);      // max string len for this token
    for (let index = 0; index < items; index++) {
      result.push(token.slice(index * len, (index + 1) * len));
    }
  })
  return result;
};

// groupby on an array of objects into map<key ,object>
// see https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
export const groupBy = (list, keyGetter) => {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

export const enumToArray = (PhoneType) => {
  return Object.keys(PhoneType).filter(
    (type) => isNaN(<any>type) && type !== 'values'
  );
}
