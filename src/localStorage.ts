import { z, ZodType } from 'zod';

export function useLocalStorage<T extends ZodType>(key: string, schema: T) {
  type SchemaType = z.infer<T>;

  function save(value: SchemaType) {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  }

  function load(): SchemaType | null {
    const localStorageValue = localStorage.getItem(key);
    const parsedValue = parseLocalStorageValue(localStorageValue);
    const value = schema.safeParse(parsedValue);

    if (value.error) {
      console.log(value.error.errors);
      return null;
    }

    return value.data;
  }

  function parseLocalStorageValue(value: any) {
    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  }

  return {
    save,
    load,
  };
}
