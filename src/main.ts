import { useLocalStorage } from './localStorage.ts';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string(),
  age: z.number().optional(),
});

const ageSchema = z.number();

const userLocalStorage = useLocalStorage('user', userSchema);
const ageLocalStorage = useLocalStorage('age', ageSchema);
const textLocalStorage = useLocalStorage('text', z.string());

userLocalStorage.save({
  name: 'Maciej',
  age: 34,
});

const user = userLocalStorage.load();
console.log('user', user?.name);

const age = ageLocalStorage.load();
console.log('age', age);

const text = textLocalStorage.load();
console.log('text', text);
