var app = angular.module('fractalApp', []);

app.controller('FractalController', function ($scope) {
    $scope.fractals = [
        {
            name: 'Mandelbrot Set',
            value: 0,
            processor: 'mandelbrot'
        },
        {
            name: 'Julia Set',
            value: 1,
            processor: 'julia'
        }
    ];
    $scope.fractal = $scope.fractals[0];

    $scope.drawFractal = function (number) {
        if (number == 0) {
            var options = {
                width: $('#width').val(),
                height: $('#height').val(),
                iterations: parseInt($('#iterations').val())
            };

            $('#canvas').attr('width', options.width);
            $('#canvas').attr('height', options.height);

            var processor = new Processor(nanobar);
            processor.drawMandelbrot(options, function () {
                var el = document.getElementById('canvas');
                var img = el.toDataURL("image/png");
                $('#download').attr('href', img).fadeIn(500);
                $('#preview').attr('src', img).fadeIn(500);
            });
        } else if (number == 1) {
        }
    };
});
