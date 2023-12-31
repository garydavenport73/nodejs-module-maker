fs=require('fs');
//console.log(process.argv);
if (process.argv.length!==3){
	console.log("Need filename, example: modulemaker mylibrary.js");
	process.exit(1);
}
//get library name
let filename=process.argv[2];
//get contents of library
let contents=fs.readFileSync(filename,"utf8");
//regular expression for finding function name capture group
const regex = /(function )(.*)\(/g;

//collect function names
let functionNames=[];

//search and add first match
let match=regex.exec(contents);
if (match!==null){
	functionNames.push(match[2]);
}
//continue searching and adding until no more
while (match!==null){
	match=regex.exec(contents);
	if (match!==null){
		functionNames.push(match[2]);
	}
}
console.log("Adding to module:")
console.log(functionNames);

//build string for exporting to file

//this adds a test function to the module to make sure it has imported
let str="\nfunction testImport(){\n";
str+="	console.log(\"imported module from file: "+filename+"\");\n";
str+="}\n\n";

//start adding the exports (add testImport() function first)
str+="module.exports = {\n";
str+="\ttestImport,\n"

//add function names from library
for (let i = 0 ;i < functionNames.length; i++){
	str+="\t"+functionNames[i]+",\n";
}
str=str.substring(0,str.length-2);
str+="\n};"

//save the built string to a new module file
console.log("writing module"+filename+" to current directory.");
fs.writeFileSync("module"+filename,contents+str);
console.log("...finished.");
process.exit(0);
