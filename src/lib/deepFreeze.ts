export default function deepFreeze(obj: { [key: string]: any }) {
  const propNames = Object.getOwnPropertyNames(obj);
  propNames.forEach(propName => {
    const prop = obj[propName];
    if (typeof prop == 'object' && prop !== null) deepFreeze(prop);
  });

  return Object.freeze(obj);
}
