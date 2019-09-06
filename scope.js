// lexical scope 
// To define it somewhat circularly, lexical scope is scope that is defined at lexing time. 
// In other words, lexical scope is based on where variables and blocks of scope are authored, by you, 
// at write time, and thus is (mostly) set in stone by the time the lexer processes your code.

function foo(a) {

	var b = a * 2;

	function bar(c) {
		console.log( a, b, c );
	}

	bar(b * 3);
}

foo( 2 ); // 2 4 12
// There are three nested scopes inherent in this code example. 
// It may be helpful to think about these scopes as bubbles inside of each other.


// Function vs. Block Scope

// Functions are the most common unit of scope in JavaScript. Variables and functions that are declared inside another function are essentially "hidden" from any of the enclosing "scopes", which is an intentional design principle of good software.

// // But functions are by no means the only unit of scope. Block-scope refers to the idea 
// that variables and functions can belong to an arbitrary block (generally, any { .. } pair) of code, rather than only to the enclosing function.

// // Starting with ES3, the try/catch structure has block-scope in the catch clause.

// // // In ES6, the let keyword (a cousin to the var keyword) is introduced to allow 
// // declarations of variables in any arbitrary block of code. if (..) { let a = 2; } 
// // will declare a variable a that essentially hijacks the scope of the if's { .. } 
// // block and attaches itself there.

// // Though some seem to believe so, block scope should not be taken as an outright replacement of var function scope. Both functionalities co-exist, and developers can and should use both function-scope and block-scope techniques where respectively appropriate to produce better, more readable/maintainable code.

// HOISTING

// We can be tempted to look at var a = 2; as one statement, but the JavaScript Engine does not see it that way. 
// It sees var a and a = 2 as two separate statements, the first one a compiler-phase task, and the second one an execution-phase task.

// // What this leads to is that all declarations in a scope, regardless of where they appear, are processed first before the code itself is executed. You can visualize this as declarations (variables and functions) 
// being "moved" to the top of their respective scopes, which we call "hoisting".


// closure

//A closure is a function having access to the parent scope, even after the parent function has closed.
// Closures are important because they control what is and isn’t in scope in a particular function, 
// along with which variables are shared between sibling functions in the same containing scope.

function foo() {
	var a = 2;

	function bar() {
		console.log( a );
	}

	return bar;
}

var baz = foo();

baz(); // 2 -- Whoa, closure was just observed, man.

function buildName(name) { 
    var greeting = "Hello, " + name + "!"; 
    var sayName = function() {
        var welcome = greeting + " Welcome!";
        console.log(greeting); 
    };
    return sayName; 
}

var sayMyName = buildName("John");
sayMyName();  // Hello, John. Welcome!
sayMyName();  // Hello, John. Welcome!
sayMyName();  // Hello, John. Welcome!

// A closure is a function which has access to the variable from another function’s scope. 
// This is accomplished by creating a function inside a function. Of course, 
// the outer function does not have access to the inner scope.

// The sayName() function has it’s own local scope (with variable welcome) 
// and has also access to the outer (enclosing) function’s scope. 
// It this case, the variable greeting from buildName().

//another example

// Through closure, you can achieve real private data in Javascript. As we saw above, 
// is the gateway between the outer scope and the rest of the program. It can choose 
// what data to expose and what not
function initializeData() {
    var myVar = 1; 
    return { 
        getVar: function() {
            return myVar;
        },
        setVar: function(v) {
            myVar = v;
        }
    };
}

obj = initializeData();

console.log(obj.getVar()); // 1

obj.setVar(2);
console.log(obj.getVar()); // 2

obj.setVar("string");
console.log(obj.getVar()); // string