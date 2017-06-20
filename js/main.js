// factory function for C-like structs
function struct(names) {
    var names = names.split(', ');
    var count = names.length;
    function constructor() {
        for (var i = 0; i < count; i++) {
            this[names[i]] = arguments[i];
        }
    }

    return constructor;
}

var CompNum = struct('x, y');
var comp_num = new CompNum(12, 34);

console.log(comp_num.x + ', ' + comp_num.y);