
// JavaScript just has objects.
//important!

class Widget {
	constructor(width,height) {
		this.width = width || 50;
		this.height = height || 50;
		this.$elem = null;
	}
	render($where){
		if (this.$elem) {
			this.$elem.css( {
				width: this.width + "px",
				height: this.height + "px"
			} ).appendTo( $where );
		}
	}
}

class Button extends Widget {
	constructor(width,height,label) {
		super( width, height );
		this.label = label || "Default";
		this.$elem = $( "<button>" ).text( this.label );
	}
	render($where) {
		super.render( $where );
		this.$elem.click( this.onClick.bind( this ) );
	}
	onClick(evt) {
		console.log( "Button '" + this.label + "' clicked!" );
	}
}
// 1 There's no more (well, sorta, see below!) references to .prototype cluttering the code.
// 2 Button is declared directly to "inherit from" (aka extends) Widget, 
// instead of needing to use Object.create(..) to replace a .prototype object that's linked, or having to set with .__proto__ or Object.setPrototypeOf(..).
// 3 super(..) now gives us a very helpful relative polymorphism capability, 
// so that any method at one level of the chain can refer relatively one level up the 
// chain to a method of the same name. This includes a solution to the note from Chapter 4 
// about the weirdness of constructors not belonging to their class, and so being unrelated -- 
// super() works inside constructors exactly as you'd expect.
// 4class literal syntax has no affordance for specifying properties (only methods). 
// This might seem limiting to some, but it's expected that the vast majority of cases 
// where a property (state) exists elsewhere but the end-chain "instances", this is usually a mistake and surprising (as it's state that's implicitly "shared" among all "instances"). So, one could say the class syntax is protecting you from mistakes.
// 5extends lets you extend even built-in object (sub)types, like Array or RegExp, in a 
// very natural way. Doing so without class .. extends has long been an exceedingly 
// complex and frustrating task, one that only the most adept of framework authors have 
// ever been able to accurately tackle. Now, it will be rather trivial!


// It's not all bubblegum and roses, though. There are still some deep and profoundly 
// troubling issues with using "classes" as a design pattern in JS.

// Firstly, the class syntax may convince you a new "class" mechanism exists in JS as of ES6. Not so. 
// class is, mostly, just syntactic sugar on top of the existing [[Prototype]] (delegation!) mechanism.
// THE DIFFERENCE BETWEEN JS CLASSES AND OTHER OOP LANGUAGE CLASSES
// That means class is not actually copying definitions statically at 
// declaration time the way it does in traditional class-oriented languages. 
// If you change/replace a method (on purpose or by accident) on the parent "class", 
// the child "class" and/or instances will still be "affected", in that they didn't get 
// copies at declaration time, they are all still using the live-delegation 
// model based on [[Prototype]]:


class C {
	constructor() {
		this.num = Math.random();
	}
	rand() {
		console.log( "Random: " + this.num );
	}
}

var c1 = new C();
c1.rand(); // "Random: 0.4324299..."

C.prototype.rand = function() {
	console.log( "Random: " + Math.round( this.num * 1000 ));
};

var c2 = new C();
c2.rand(); // "Random: 867"

c1.rand(); // "Random: 432" -- oops!!!