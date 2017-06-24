// factory function for C-like structs
/*function struct(names) {
    var name = names.split(', ');
    var count = name.length;
    function constructor() {
        for (var i = 0; i < count; i++) {
            this[name[i]] = arguments[i];
        }
    }

    return constructor;
}

var CompNum = struct('x, y');
var comp_num = new CompNum(12, 34);*/

//alert(comp_num.x + ', ' + comp_num.y);

$(document).ready(function () {
    var LIMIT = 1.7;
    var DEPTH = 512;
    var DIM = 640;
    var STEP = 2 * LIMIT / DIM;

    var c = { x: 0, y: 0 };
    var z0 = { x: 0, y: 0 };

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var fractalData = ctx.getImageData(0, 0, DIM, DIM);

    function addNumbers (add1, add2) {
        var add = { x: 0, y: 0 };

        add.x = add1.x + add2.x;
        add.y = add1.y + add2.y;

        return add;
    }

    function multiplyNumbers(mul1, mul2) {
        var mul = { x: 0, y: 0 };

        mul.x = mul1.x * mul2.x - mul1.y * mul2.y;
        mul.y = mul1.y * mul2.x + mul1.x * mul2.y;

        return mul;
    }

    $('input[name="post"]').on('click', function (e) {
        e.preventDefault();

        c.x = $('input[name="re"]').val();
        c.y = $('input[name="im"]').val();

        var re, im, canvas;

        for (var i = 0; i < DIM; i++) {
            re = i * STEP - LIMIT;

            for (var j = 0; j < DIM; j++) {
                im = j * STEP - LIMIT;

                z0.x = re;
                z0.y = im;

                var n = 0;
                while (n < DEPTH && (z0.x * z0.x + z0.y * z0.y) < 4) {
                    z0 = addNumbers(multiplyNumbers(z0, z0), c);
                    n++;
                }
            }
        }

        console.log(z0);
    });
});