var expect = require('chai').expect
  , normalizerdms = require('../normalizerdms');

  
describe("normalizerdms.transform", function () {
  it("should create a normalized nested object from a RDMS array, provided shaped in dottie format", function () {
	var results = [
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
	
    var transformed = normalizerdms.transform(results, primaryKey, mainKeys, innerTables);
    expect(transformed.length).to.equal(2);
    expect(transformed[0].Subject.length).to.equal(3);

    expect(transformed[0].Info).to.be.an('object');
  });	
	
	
});