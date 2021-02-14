# Module 1

~Все переменные являются объектами~
**Все ведет себя как объект.**

**Все примитивные типы данных являются не изменяемыми**. 

```js
const a = 1;
typeof String(a) // string
typeof a // number
```

## String

Обратные кавычки помогают не только вставлять переменные, но и переносить строки.

```js
const string = `
  Hello World
`
```
С обычными кавычками так не получится. Только так:

```js
const string2 = "hello \n\"World"\""
```

```js
string.slice(1, 4)  // для взятия подстроки
string.substr() // не использовать
string.substring() // не использовать
string.split(',') // разделение строки на массив

const firstUpperName = name[0].toUpperCase() + name.slice(1) // преобразование первой буквы в верхний регистр
string.toLocaleUpperCase() // (toUpperCase) создает новую строку в верхнем регистре. Сама переменная string не изменилась.
```

#### Итерация строки

```js
cosnt str = 'hello world!'

for (const item in str) {
  console.log(item)
}
// 0, 1, 2, 3, 4, ...
// for in возвращает индекс элемента

for (const item of str) {
  console.lot(item)
}
// h, e, l, l, ...
// for of возвращает значение элемента
```

## Number


**В js есть только числа с плавающей точкой. Вещественные.** Т.е. у каждого числа есть какой-то хвостик
```js
console.log(0.1 + 0.2) // 0.3000000000..0004
console.log((0.1 * 10 + 0.2 * 10) / 10) // исправили
console.log((0.1 + 0.2).toFixed(1)) // исправили

console.log(1.0.toFixed(100)) // 1.000000...
```

```js
console.log(1 * 10 ** 309) // Infinity
console.log(1 / 0) // Infinity
```


Есть тип Bigint
```js
console.log(1n * 10n * 309n) // будет большое число
```
Лишен недоставков обычных числе

```js
console.log(1 / 'n') // NaN
NaN !== NaN // true
```


Вместо +"1" для приведения к number лучше использовать parseInt("1", 10)
parseInt откидывает строковую часть, если есть. У Number же если встречается строка то NaN.
Есть еще parseFloat('1.5')

'??' - такая же как '||', но игнорирует null и undefined


```js
const height = NaN
const defaultHeight = 10

const newValue = height ?? defaultHeight;

console.error('newValue', newValue) // NaN
```

## Boolean
Для приведения типов можно использовать
- ! или !!
- Boolean(1)
не использовать new Boolean (а также new String и т.п.)


## Object

Object.entries(obj) - возвращает массив массивов из ключа и значения
```js
const object1 = {
  a: 'somestring',
  b: 42
};

> Object.entries(object1)
< [["a", "somestring"], ["b", 42]] (2)
```
Это дает удобную возможность перебирать объект, лучше чем 'for (let key in obj)' потому что for перечисляет свойства еще и из прототипа
```js
for (let [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`);
}

// expected output:
// "a: somestring"
// "b: 42"
```

##### Деструктуризация объекта
```js
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

let {title, width, height} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```
Если мы хотим присвоить свойство объекта переменной с другим названием,
например, свойство options.width присвоить переменной w, то мы можем использовать двоеточие:
```js
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// { sourceProperty: targetVariable }
let {width: w, height: h, title} = options;
// width -> w
// height -> h
// title -> title

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

Для потенциально отсутствующих свойств мы можем установить значения по умолчанию
```js
let options = {
  title: "Menu"
};

let {width = 100, height = prompt("height?"), title} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // из prompt


// Мы также можем совмещать : и =:
let {width: w = 100, height: h = 200, title} = options;
```

Часть свойств объекта можно группировать в отдельную переменную через ...:
```js
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

// title = свойство с именем title
// rest = объект с остальными свойствами
let {title, ...rest} = options;

// сейчас title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100
```

Можно деструктировать и сложные объекты:
```js
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true
};

// деструктуризация разбита на несколько строк для ясности
let {
  size: { // положим size сюда
    width,
    height
  },
  items: [item1, item2], // добавим элементы к items
  title = "Menu" // отсутствует в объекте (используется значение по умолчанию)
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
// Заметим, что переменные для size и items отсутствуют, так как мы взяли сразу их содержимое.
```

###### Передача большого кол-ва параметров в функцию может быть сделана через деструктуирование
```js
// мы передаём объект в функцию
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

// ...и она немедленно извлекает свойства в переменные
function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
  // title, items – взято из options,
  // width, height – используются значения по умолчанию
  alert( `${title} ${width} ${height}` ); // My Menu 200 100
  alert( items ); // Item1, Item2
}

showMenu(options);
```
а также и для более сложных структур
```js
function({
  incomingProperty: varName = defaultValue
  ...
})
```
деструктурирование подразумевает, что в showMenu() будет обязательно передан аргумент. 
Если нам нужны все значения по умолчанию, то нам следует передать пустой объект

```js
showMenu({}); // ок, все значения - по умолчанию
showMenu(); // так была бы ошибка
```
Мы можем исправить это, сделав {} значением по умолчанию для всего объекта параметров:
```js
function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```


## Array

Копирование массива:
const arrCopy = [...arr]
но он не копирует внутренние объекты, массивы получаются разные, но объекты одинаковые
copy = [...arr].map(item => ({...item})) - копирование и объектов внутри массива

не пользоваться для удаления элемента массива delete (объекта тоже не желательно, потому что мутирует)
удалять хорошо с помощью splice(index, deleteCount), правда он тоже мутирует
потому идеально удалять с помощью slice() - понять бы как )))

Не следует использовать цикл for..in для массивов (только для объектов), для массивов хорошо for..of.


**arr.slice()** создаёт копию массива arr
**arr.slice(1,4)** копирует элементы в массиве с 1 по 4 (без второго аргумента до конца)
**arr.splice(index, deleteCount, elem1, elem2, ...)** - удаляет элементы с index в кол-ве deleteCount и добваляет на их место elem1, elem2. 
Возвращает удаленные элементы, изменяет массив.

.sort, .splice, .reverse - мутируют массив, применять лучше сделав копию массива: [...arr].sort()

##### arr.concat
Он принимает любое количество аргументов, которые могут быть как массивами, так и простыми значениями.
Возвращает новый массив.


##### indexOf, lastIndexOf, includes
- Обратите внимание, что методы используют строгое сравнение ===. Таким образом, если мы ищем false, он находит именно false, а не ноль.

- Если мы хотим проверить наличие элемента, и нет необходимости знать его точный индекс, тогда предпочтительным является arr.includes.

- Кроме того, очень незначительным отличием includes является то, что он правильно обрабатывает NaN в отличие от indexOf/lastIndexOf:
```js
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1 (должен быть 0, но === проверка на равенство не работает для NaN)
alert( arr.includes(NaN) );// true (верно)
```

##### arr.find и arr.findIndex
- ищет первый элемент/индекс, по которому функция вернет true. Хорош для поиска в массиве объектов.
Для поиска в массиве примитивов хватит и **indexOf/lastIndexOf/includes**

```js
let users = [
  {id: 1, name: "Вася"},
  {id: 2, name: "Петя"},
  {id: 3, name: "Маша"}
];

let user = users.find(item => item.id == 1);

alert(user.name); // Вася
```

##### arr.map
- возвращает новый массив с измененными элементами
```js
let result = arr.map(function(item, index, array) {
  // возвращается новое значение вместо элемента
});

let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6
```

##### arr.sort()
- сортирует массив на месте, меняя в нём порядок элементов.
- Он возвращает отсортированный массив, но обычно возвращаемое значение игнорируется, так как изменяется сам arr.

```js
let arr = [ 1, 2, 15 ]
// метод сортирует содержимое arr
arr.sort();
alert( arr );  // 1, 15, 2
```
Чтобы использовать наш собственный порядок сортировки, нам нужно предоставить функцию в качестве аргумента arr.sort().
Функция должна для пары значений возвращать:
```js
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

let arr = [ 1, 2, 15 ];

arr.sort(compareNumeric);

alert(arr);  // 1, 2, 15

// Функции сравнения может вернуть любое число (положительное или отрицательное),
// это позволяет писать сравнения короче:
let arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr);  // 1, 2, 15

// или лучше так:
arr.sort( (a, b) => a - b );
```

##### forEach
позволяет запускать функцию для каждого элемента массива.
```js
// Вызов alert для каждого элемента
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);

// А этот вдобавок расскажет и о своей позиции в массиве:
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} имеет позицию ${index} в ${array}`);
});
```


##### reduce/reduceRight
Если нам нужно перебрать массив – мы можем использовать forEach, for или for..of.
Если нам нужно перебрать массив и вернуть данные для каждого элемента – мы используем map.
Методы arr.reduce и arr.reduceRight похожи на методы выше, но они немного сложнее. Они используются для вычисления какого-нибудь единого значения на основе всего массива.
```js
let value = arr.reduce(function(previousValue, item, index, array) {
  // ...
}, [initial]);
```
Функция применяется по очереди ко всем элементам массива и «переносит» свой результат на следующий вызов.

Аргументы:
- previousValue – результат предыдущего вызова этой функции, равен initial при первом вызове (если передан initial),
- item – очередной элемент массива,
- index – его индекс,
- array – сам массив.

Тут мы получим сумму всех элементов массива всего одной строкой:
```js
let arr = [1, 2, 3, 4, 5];
let result = arr.reduce((sum, current) => sum + current, 0);
alert(result); // 15
```
При отсутствии initial в качестве первого значения берётся первый элемент массива, а перебор стартует со второго.


##### arr.some(fn)/arr.every(fn) проверяет массив.
Функция fn вызывается для каждого элемента массива аналогично map. Если какие-либо/все результаты вызовов являются true, то метод возвращает true, иначе false.

##### arr.fill(value, start, end) – заполняет массив повторяющимися value, начиная с индекса start до end.

##### arr.copyWithin(target, start, end) – копирует свои элементы, начиная со start и заканчивая end, в собственную позицию target (перезаписывает существующие).


#### Деструкторизация массива
```js
// у нас есть массив с именем и фамилией
let arr = ["Ilya", "Kantor"]
// деструктурирующее присваивание
// записывает firstName=arr[0], surname=arr[1]
let [firstName, surname] = arr;
alert(firstName); // Ilya
alert(surname);  // Kantor

// Очень хорошо для разбивки строк в переменные
let [firstName, surname] = "Ilya Kantor".split(' ');

// второй элемент не нужен
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
alert( title ); // Consul

// а можно и так
let user = {};
[user.name, user.surname] = "Ilya Kantor".split(' ');
alert(user.name); // Ilya

// и так
let [a, b, c] = "abc";
let [one, two, three] = new Set([1, 2, 3]);


let user = {
  name: "John",
  age: 30
};
// цикл по ключам и значениям
for (let [key, value] of Object.entries(user)) {
  alert(`${key}:${value}`); // name:John, затем age:30
}
```

###### Значения по умолчанию
```js
let [firstName, surname] = [];
alert(firstName); // undefined
alert(surname); // undefined

// значения по умолчанию
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
alert(name);    // Julius (из массива)
alert(surname); // Anonymous (значение по умолчанию)

// в качестве значения по умолчанию можно использовать функцию
// prompt запустится только для surname
let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];
alert(name);    // Julius (из массива)
alert(surname); // результат prompt
```

##### Остаточные параметры «…»

```js
let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert(name1); // Julius
alert(name2); // Caesar

// Обратите внимание, что `rest` является массивом.
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
```

# MAP

Map – это коллекция ключ/значение, как и Object. Но основное отличие в том, что Map позволяет использовать ключи любого типа.

Методы и свойства:

new Map() – создаёт коллекцию.
map.set(key, value) – записывает по ключу key значение value.
map.get(key) – возвращает значение по ключу или undefined, если ключ key отсутствует.
map.has(key) – возвращает true, если ключ key присутствует в коллекции, иначе false.
map.delete(key) – удаляет элемент по ключу key.
map.clear() – очищает коллекцию от всех элементов.
map.size – возвращает текущее количество элементов.


# Function

```js
// обычный синтаксис функции
sayHi: function () {
  alert('Hi')
}

// сокращенный вариант
sayHi () {
  alert('Hi')
}

// стрелочные функции
sayHi: () => {
  alert('Hi')
}
```

У стрелочных функций нет своего "собственного" **this**.
Если мы используем **this** внутри стрелочной функции, то его значение берется из внешней "нормальной" функции.
Например, здесь arrow() использует значение **this** из внешнего метода user.sayHi():
```js
let user = {
  firstName: "Илья",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // Илья

COPY ./docker/development/vue-cli-config.json /root/.vue-cli-ui/db.json
```

## Замыкания

```js
function hi() {
  const name = "Peter"

  return () => {
    console.error(name)
  }
}

hi()()
// or
const func = hi();
func();
```
