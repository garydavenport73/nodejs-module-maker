# nodejs-module-maker
This takes a function library using traditional function syntax and makes a nodejs module.

This script takes a nodejs (or javascript) library of functions and creates a nodejs module out of them so the functions can be imported into another nodejs file.

The functions **must have the traditional format and be non-nested** (no functions within functions):

```
function myFunction1(a,b){
    //code here
}

function myFunction2(){
    //code here
}
...

function lastFunction(x,y){
    //code here
}
```

and creates a new module file in the current directory:

```

modules.export={
    testImport,
    myFunction1,
    myFunction2,
    ...,
    lastFunction
}
```
Notice that it adds the function "testImport", which can be used to verify the import.

To call the new functions after importing them, you'll need to do something along these lines:

```
const newTools=require('./yourLibrary.js');
```
Then you can access the functions like this:
```
let result = newTools.myFunction2();
```
or if you don't want to use the namespace convention, like this:
```
const myFunction2 = newTools.myFunction2;
let result = myFunction2();
```

If your input library file is named "yourLibrary.js", the module will be named "moduleyourLibrary.js" and created in the working directory.

## And most importantly to use this script you'll of course have to have NodeJS installed on your machine, and then use the following syntax to create your module in the terminal:

```
nodejs modulemaker.js yourLibrary.js
```
and the module will be created in the current directory.
