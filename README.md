normalizerdms helps you to effortlessly convert Data returned from RDMS in to a nicely formated JSON with nested Objects and Arrays.

## Install
    npm install normalizerdms

### Transform Array
```js
var inputData = [
		{'id':1, 'name':'john doe', 'address': 'Helsinki', 'Subject.id': 1, 'Subject.name': 'Maths', 'Subject.marks': 9, 'Subject.userId': 1},
		{'id':1, 'name':'john doe', 'address': 'Helsinki',  'Subject.id': 2, 'Subject.name': 'Physics', 'Subject.marks': 10, 'Subject.userId': 1},
		{'id':1, 'name':'john doe', 'address': 'Helsinki',  'Subject.id': 3, 'Subject.name': 'English', 'Subject.marks': 10, 'Subject.userId': 1},
		{'id':2, 'name':'alice', 'address': 'Turku',  'Subject.id': 2, 'Subject.name': 'Physics', 'Subject.marks': 10, 'Subject.userId': 2},
		{'id':2, 'name':'alice', 'address': 'Turku',  'Subject.id': 3, 'Subject.name': 'English', 'Subject.marks': 10, 'Subject.userId': 2},
		{'id':2, 'name':'alice', 'address': 'Turku',  'Subject.id': null, 'Subject.name': null, 'Subject.marks': null, 'Subject.userId': 2}
];
var innerTables = [
	{name: 'Subject', primaryKey: 'id', foreignKey: 'userId', type:'hasMay'}, 
	{name: 'Info', primaryKey: 'id', foreignKey: 'userId', type:'hasOne'}
];
var mainKeys = ['id', 'name', 'address'];
var primaryKey = 'id';

var transformed = normalizerdms.transform(inputData, primaryKey, mainKeys, innerTables);
```


## License

[MIT]