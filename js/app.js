var app = angular.module('fractalApp', []);

app.controller('FractalController', function ($scope) {
    $scope.fractals = [
        {
            name: 'Mandelbrot Set',
            value: 0
        },
        {
            name: 'Julia Set',
            value: 1
        }
    ];
    $scope.fractal = $scope.fractals[0];
});
