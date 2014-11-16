angular.module('changeExample', [])
    .controller('ExampleController', ['$scope', function($scope) {
    	$scope.resultados=[];
    	$scope.resultados_lagrange=[];
    	$scope.change = function() {
    		$scope.resultados=[];
    		$scope.resultados_lagrange=[];
	      	
	      	//evaluo la funcion para cada punto y la meto a resultados
	      	for (i = 0; i < $scope.nro_puntos; i++) {
	      		var res = $scope.funcion.replace("x",i);      
				var item1 = {
					"key":i, "value":math.eval(res) 
		        }
		        $scope.resultados.push(item1);
			};
			aplicarLagrange();

			//aplica la idea del polinomio de lagrange
 			function aplicarLagrange(){
				for (i = 0; i < $scope.nro_puntos; i++) {
					for (var key in $scope.resultados) {
						if(key>0){
							var respuesta_lagrange=(((i-key-1)/(-1))*$scope.resultados[key-1].value)+(((i-key)/(1))*$scope.resultados[key].value);
							console.log("respuesta lg->"+$scope.resultados[key-1].value+" i->"+i+" key->"+key+" resultados k+1->"+$scope.resultados[key].value);
							var item1 = {
								"key":i, "value":respuesta_lagrange
					        }
						}
					}
					$scope.resultados_lagrange.push(item1);
				}
			}
    	};
    }]);