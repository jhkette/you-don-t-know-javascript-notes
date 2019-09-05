/******* THIS ***********/

// this is a binding made for each function invocation, 
// based entirely on its call-site (how the function is called).

//default binding
// binds to global object  - UNLESS in strict mode
 
function foo() {
	console.log( this.a );
}

var a = 2;

foo(); // 2

//implicit binding

function foo() {
	console.log( this.a );
}

var obj = {
	a: 2,
	foo: foo
};

obj.foo(); // 2

// the call-site uses the obj context to reference the function, 
// so you could say that the obj object "owns" or "contains" 
// the function reference at the time the function is called.

// Only the top/last level of an object property reference chain matters 
// to the call-site. For instance:

function foo() {
	console.log( this.a );
}

var obj2 = {
	a: 42,
	foo: foo
};

var obj1 = {
	a: 2,
	obj2: obj2
};

obj1.obj2.foo(); // 42

// explicit binding
/*******  call(..) and apply(..). **********/

// They both take, as their first parameter, an object to use for 
// the this, and then invoke the function with that this specified. 
// Since you are directly stating what you want the this to be, we call 
// it explicit binding.

// Consider:

function foo() {
	console.log( this.a );
}

var obj = {
	a: 2
};

foo.call( obj ); // 2
// Invoking foo with explicit binding by 
// foo.call(..) allows us to force its this to be obj.

// Since hard binding is such a common pattern, it's provided with a 
// built-in utility as of ES5: Function.prototype.bind, and it's used like 
// this:

function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}

var obj = {
	a: 2
};

var bar = foo.bind( obj );

var b = bar( 3 ); // 2 3
console.log( b ); // 5

// bind(..) returns a new function that is hard-coded to 
// call the original function with the this context set as you specified.


// New binding

// When a function is invoked with new in front of it, otherwise known as 
// a constructor call, the following things are done automatically:

// 1 a brand new object is created (aka, constructed) out of thin air
// 2 the newly constructed object is [[Prototype]]-linked
// 3 the newly constructed object is set as the this binding for that function 
// call 
// 4 unless the function returns its own alternate object, the new-invoked 
// function call will automatically return the newly constructed object.

// Steps 1, 3, and 4 apply to our current discussion. We'll skip over step 
// 2 for now and come back to it in Chapter 5.

// Consider this code:

function foo(a) {
	this.a = a;
}

var bar = new foo( 2 );
console.log( bar.a ); // 2
// By calling foo(..) with new in front of it, we've constructed a 
// new object and set that new object as the this for the call of foo(..). 