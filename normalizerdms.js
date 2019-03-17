"use strict";

	var dottie = require('dottie');

	var verifyInnerTable = function (innerTables) {
  	  if (!Array.isArray(innerTables)) {
		throw new Error('innerTables is not an array.');
	  }
	  for(var table of innerTables) {
		if(!table.hasOwnProperty('type') || !table.hasOwnProperty('name') || !table.hasOwnProperty('foreignKey') || !table.hasOwnProperty('primaryKey')) {
		  let errorMessage = 'One of the properties is missing for the InnerTables Object, make sure to include name, type, primaryKey & foreignKey properties.';
		  throw Error(errorMessage);
		}
	  }		
	}
	
	var verifyInputData = function (inputData, primaryKey, mainKeys, innerTables) {
		if (!Array.isArray(inputData)) {
			throw new Error('inputData is not an array.');
		}
		if (!Array.isArray(mainKeys)) {
			throw new Error('mainKeys is not an array.');
		}
		if (typeof myVar === 'string') {
			throw new Error('primaryKey is not a string.');
		}
		verifyInnerTable(innerTables);
		
	}
	
	// inputData, primaryKey, mainKeys, innerTables
	var Normalize = function() {
		var args = Array.prototype.slice.call(arguments);
		if (args.length < 4) {
		  return inputData;
		}		
		return Normalize.transform.apply(this, args);
	}
	
	Normalize.transform = function transform(inputData, primaryKey, mainKeys, innerTables) {
		verifyInputData(inputData, primaryKey, mainKeys, innerTables);
		
		  var reduceData = inputData.reduce((accummulator, currentValue)=> {
			if(!accummulator[currentValue[primaryKey]]){
				accummulator[currentValue[primaryKey]] = {};
					for(var key of mainKeys) {
						accummulator[currentValue[primaryKey]][key] = currentValue[key];
					}
					for(var table of innerTables) {
						var objectToDecide = table['type'] === 'hasMay' ? [] : {};
						accummulator[currentValue[primaryKey]][table['name']] = objectToDecide;
					}
			}
			var transformed = dottie.transform(currentValue);
			for(var table of innerTables) {
				var derivedData = transformed[table['name']];
				var foreignKey = table['foreignKey'];
				var innerPrimaryKey = table['primaryKey'];
				if(!derivedData || !derivedData[foreignKey] || !derivedData[innerPrimaryKey]) continue;
				if(table['type'] === 'hasOne'){
					accummulator[currentValue[primaryKey]][table['name']] = derivedData;
					continue;
				}
				var found = accummulator[currentValue[primaryKey]][table['name']].some(el => el[innerPrimaryKey] === derivedData[innerPrimaryKey]);
				if(found) continue;
				accummulator[currentValue[primaryKey]][table['name']].push(derivedData);
			}
			return accummulator;
		  },{});


		  return Object.keys(reduceData).map((key=>{
			return reduceData[key];
		  }));		
			
	}

exports = module.exports = Normalize;