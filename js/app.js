var app = angular.module('fractalApp', []);

app.controller('FractalController', ['$scope', '$sce', function ($scope, $sce) {
    $scope.fractals = [
        {
            name: 'Mandelbrot Set',
            value: 0,
            processor: 'mandelbrot'
        },
        {
            name: 'Julia Set',
            value: 1,
            processor: 'julia',
            formula: 'f(z) = z<sup>2</sup> + c'
        }
    ];
    $scope.fractal = $scope.fractals[0];

    $scope.drawFractal = function (number) {
        $('#preview').hide();
        $('#download').hide();

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
                var blob = dataURItoBlob(img);
                var burl = window.URL.createObjectURL(blob);
                window.open(burl);
                $('#preview').attr('src', img).fadeIn(500);
            });
        } else if (number == 1) {
            var options = ($pref = $('#preferences' + number)) && $pref.serializeObject();

            if (!options) {
                return;
            }

            $('#canvas').attr('width', options.width);
            $('#canvas').attr('height', options.height);

            var processor = new Processor(nanobar);
            processor.drawJulia(options, function () {
                var el = document.getElementById('canvas');
                var img = el.toDataURL("image/png");
                $('#download').attr('href', img).fadeIn(500);
                $('#preview').attr('src', img).fadeIn(500);
            });
        }
    };

    $scope.renderHtml = function (variable) {
        return $sce.trustAsHtml(variable);
    }
}]);
