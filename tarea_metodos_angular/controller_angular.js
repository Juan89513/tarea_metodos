var app =angular.module('changeExample', [])
    app.controller('ExampleController', ['$scope', function($scope) {
    	$scope.resultados=[];
    	$scope.errores=[];
		$scope.resultados_lagrange=[];
    	$scope.funcion="x";
    	$scope.nro_puntos="0";
    	var aumento=1;
    	$scope.change = function() {
    		$scope.resultados=[];
    		$scope.resultados_lagrange=[];
	      	
	      	//evaluo la funcion para cada punto y la meto a resultados
	      	for (i = 1; i <= $scope.nro_puntos; i++) {
	      		var res = $scope.funcion.replace("x",i);      
				var item1 = {
					"key":i, "value":(math.eval(res)) 
		        }
		        $scope.resultados.push(item1);
		    };
		   	
			aplicarLagrange();

			//aplica la idea del polinomio de lagrange
 			function aplicarLagrange(){
				var constante=$scope.nro_puntos;
				$scope.aux=$scope.nro_puntos;
				$scope.pol_lagrange=[];
				$resultado_total=0;
				var resultado_total=1;
				var denominador_total=1;
				var resultado_total1=0;
				var denominador_total=1;
				var resultado_iteracion=0;
				var aux;
				var acum_index=0;
				for(var j=$scope.aux;j>0;j--){
					aux=0
					resultado_total1=0;
					while(aux<j){
							resultado_total=1;
							for(var i=0;i<j;i++){
								if(i!=aux){
									var denominador=(j-i);
									var numerador=(aux-i);
									var resultado=denominador/numerador;
									resultado_total*=resultado;
								}
							}
							resultado_iteracion=resultado_total*$scope.resultados[aux].value;
							resultado_total1+=resultado_iteracion;
							if(aux==j-1){
								var item1 = {
									"key":aux+1, "value":resultado_total1
					        	}
							$scope.resultados_lagrange.push(item1);
							}
							aux++;
					}
				}
					$scope.resultados_lagrange.reverse();
					calcularError();
					
			}
			function calcularError(){
					var error = 0;
					$scope.errores = [];
					for(var i=0;i<$scope.resultados_lagrange.length;i++){
						error=Math.abs($scope.resultados_lagrange[i].value-$scope.resultados[i].value);
						var item1 = {
									"key":i+1, "value":error
					        	}
						$scope.errores.push(item1);
					}
			}
			pintar()
	    };
	    
	    //pintar en el canvas
		function pintar(){
	    	var c = document.getElementById("myCanvas");
			var ctx = c.getContext("2d");
			ctx.beginPath();
			for (var key in $scope.resultados) {
				if(key>0){
					xInicial=(key-1)*aumento;
					yInicial=$scope.resultados[key-1].value;
					xFinal=(key)*aumento;
					yFinal=$scope.resultados[key].value*aumento;
					ctx.moveTo(xInicial,500- yInicial);
					ctx.lineTo(xFinal,500-yFinal) ;
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
			var acum_aux=0;
			for (var i=$scope.resultados_lagrange.length;i>0;i--) {
				if(i>1){
					xInicial=(i-1)*aumento;
					yInicial=$scope.resultados_lagrange[acum_aux].value*aumento;
					xFinal=(i)*aumento;
					yFinal=$scope.resultados_lagrange[acum_aux].value*aumento;
					//console.log("entro inicial:->"+xInicial+"-"+yInicial+" final->"+xFinal+"-"+yFinal);
					ctx1.moveTo(xInicial,500- yInicial);
					ctx1.lineTo(xFinal,500-yFinal) ;
					ctx1.strokeStyle = '#ff0000	';
					ctx1.lineWidth = 2;
					ctx1.stroke();
					ctx1.fill();
					ctx1.closePath();
					acum_aux++;
				}
				
			}
	    }
    }]);