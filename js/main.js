$(document).ready(function () {
    // constants
    var LIMIT = 1.7;
    var DEPTH = 256;
    var DIM = 800;
    var STEP = 2 * LIMIT / DIM;

    // complex numbers as objects
    var c = { x: 0, y: 0 };
    var z0 = { x: 0, y: 0 };

    var canvas = $('#fractal').get(0);
    var ctx = canvas.getContext('2d');
    var imageData = ctx.createImageData(DIM, DIM);

    ctx.fillStyle ='#000000';
    ctx.fillRect (0, 0, DIM, DIM);

    function setPixel(image, x, y, r, g, b, a) {
        var index = (x + y * image.width) * 4;
        image.data[index + 0] = r;
        image.data[index + 1] = g;
        image.data[index + 2] = b;
        image.data[index + 3] = a;
    }

    // addition of complex numbers
    function addNumbers(add1, add2) {
        var add = { x: 0, y: 0 };

        add.x = add1.x + add2.x;
        add.y = add1.y + add2.y;

        return add;
    }

    // multiplication of complex numbers
    function multiplyNumbers(mul1, mul2) {
        var mul = { x: 0, y: 0 };

        mul.x = mul1.x * mul2.x - mul1.y * mul2.y;
        mul.y = mul1.y * mul2.x + mul1.x * mul2.y;

        return mul;
    }

    // do the magic on button click
    $('input[name="post"]').on('click', function (e) {
        e.preventDefault();

        c.x = parseFloat($('input[name="re"]').val());
        c.y = parseFloat($('input[name="im"]').val());

        var re, im;
        var r, g, b;

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

                r = (255 * n) / DEPTH;
                g = (((255 * n) / DEPTH) * 2) % 256;
                b = (((255 * n) / DEPTH) * 3) % 256;

                setPixel(imageData, i, j, r, g, b, 255);
            }
        }

        ctx.putImageData(imageData, 0, 0);

        // save as png image on button click
        var canvas = document.getElementById('fractal');
        var url = canvas.toDataURL('image/png');
        $('.save').attr('href', url);
    });

    // get current year
    // dynamically change year in footer
    var time = new Date();
    var year = time.getFullYear();

    $('.copyright').append('' + year);
});