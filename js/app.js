var app = angular.module('fractalApp', []);

app.controller('FractalController', ['$scope', '$sce', function ($scope, $sce) {

    $scope.fractals = [];
    $scope.fractal = {};

    YAML.fromURL('fractals.yaml', function (result) {
        $scope.fractals = result.fractals;
        $scope.fractal = $scope.fractals[0];
        $scope.$apply();
    });

    $scope.drawFractal = function () {
        $('#preview').hide();
        $('#download').hide();

        var options = ($pref = $('#preferences' + $scope.fractal.number)) && $pref.serializeObject();
        if (!options) {
            return;
        }

        $('#canvas').attr('width', options.width);
        $('#canvas').attr('height', options.height);

        var processor = new Processor(nanobar);
        processor.drawFractal($scope.fractal.processor, options, function () {
            var el = document.getElementById('canvas');
            var img = el.toDataURL("image/png");
            var blob = dataURItoBlob(img);
            var burl = window.URL.createObjectURL(blob);
            window.open(burl);
            $('#preview').attr('src', img).fadeIn(500);
        });
    };
    

    $scope.isPreferencesVisible = function (number) {
        return $scope.fractal.number == number;
    };

    $scope.isRequired = function (pref) {
        return pref.required !== false;
    };
}]);
