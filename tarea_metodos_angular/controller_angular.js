var app =angular.module('changeExample', [])
    app.controller('ExampleController', ['$scope', function($scope) {
    	$scope.resultados=[];
    	$scope.resultados_lagrange=[];
    	$scope.funcion="x";
    	$scope.nro_puntos="0";
    	var aumento=1;
    	$scope.change = function() {
    		$scope.resultados=[];
    		$scope.resultados_lagrange=[];
	      	
	      	//evaluo la funcion para cada punto y la meto a resultados
	      	for (i = 0; i < $scope.nro_puntos; i++) {
	      		var res = $scope.funcion.replace("x",i);      
				var item1 = {
					"key":i, "value":(math.eval(res)) 
		        }
		        $scope.resultados.push(item1);
		    };
		   	//$scope.options.aaData=$scope.resultados;

			aplicarLagrange();

			//aplica la idea del polinomio de lagrange
 			function aplicarLagrange(){
				for (i = 0; i < $scope.nro_puntos; i++) {
					for (var key in $scope.resultados) {
						if(key>0){
							var respuesta_lagrange=(((i-key-1)/(-1))*$scope.resultados[key-1].value)+(((i-key)/(1))*$scope.resultados[key].value);
							var item1 = {
								"key":i, "value":respuesta_lagrange
					        }
						}
					}
					$scope.resultados_lagrange.push(item1);
				}
			}
    	
			//pinto en el canvas
			var c = document.getElementById("myCanvas");
			var ctx = c.getContext("2d");
			ctx.beginPath();
			for (var key in $scope.resultados) {
				if(key>0){
					xInicial=(key-1)*aumento;
					yInicial=$scope.resultados[key-1].value;
					xFinal=(key)*aumento;
					yFinal=$scope.resultados[key].value*aumento;
					//console.log("entro inicial:->"+xInicial+"-"+yInicial+" final->"+xFinal+"-"+yFinal);
					ctx.moveTo(xInicial,1000- yInicial);
					ctx.lineTo(xFinal,1000-yFinal) ;
					ctx.strokeStyle = '#000000 ';
					ctx.lineWidth = 2;
					
					ctx.stroke();
					ctx.fill();
					ctx.closePath();
				}
			}
			var c1 = document.getElementById("myCanvas");
			var ctx1 = c1.getContext("2d");
			ctx1.beginPath();
			for (var key in $scope.resultados_lagrange) {
				if(key>0){
					xInicial=(key-1)*aumento;
					yInicial=$scope.resultados_lagrange[key-1].value;
					xFinal=(key)*aumento;
					yFinal=$scope.resultados_lagrange[key].value*aumento;
					//console.log("entro inicial:->"+xInicial+"-"+yInicial+" final->"+xFinal+"-"+yFinal);
					ctx1.moveTo(xInicial,1000- yInicial);
					ctx1.lineTo(xFinal,1000-yFinal) ;
					ctx1.strokeStyle = '#ff0000	';
					ctx1.lineWidth = 2;
					ctx1.stroke();
					ctx1.fill();		ctx1.closePath();
			
				}
			}

	    };
    }]);

	/*app.directive('myTable', function () {
		 
    return {
        restrict: 'E, A, C',
        link: function (scope, element, attrs, controller) {
            var dataTable = element.dataTable(scope.options);

            scope.$watch('options.aaData', handleModelUpdates, true);

            function handleModelUpdates(newData) {
                var data = newData || null;
                if (data) {
                    dataTable.fnClearTable();
                    dataTable.fnAddData(data);
                }
            }
        },
        scope: {
            options: "="
        }
    };
});

function Ctrl($scope) {
    $scope.options = {
        aoColumns: [{
            "sTitle": "Llave"
        }, {
            "sTitle": "valor"
        }],
        aoColumnDefs: [{
            "bSortable": false,
            "aTargets": [0, 1]
        }],
        bJQueryUI: true,
        bDestroy: true,
        aaData: $scope.resultados
    };

    $scope.addData = function () {
        $scope.counter = $scope.counter + 1;
        $scope.options.aaData.push([$scope.counter, $scope.counter * 2]);
    };

    $scope.counter = 0;
}*/