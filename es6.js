// Constants are not a restriction on the value itself, but on the
// variable’s assignment of that value. In other words, the value is not
// frozen or immutable because of const , just the assignment of it. If
// the value is complex, such as an object or array, the contents of the
// value can still be modified: 

{
    const a = 2 ; console . log ( a ); // 2 a = 3 ; // TypeError! 

}


// Spread operator

var a = [ 2 , 3 , 4 ]; var b = [ 1 , ... a , 5 ]; console . log ( b ); // [1,2,3,4,5] 
