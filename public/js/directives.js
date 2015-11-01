var directives = angular.module('directives',[]);

directives.directive("review",function(){
		return{
			restrict:"E",
			templateUrl:"../templates/review.tpl.html",
			scope:{
				rev:"=",
				report:"&",
				visible:"="
			},
			link: function(scope,elem,attr){

				scope.hover= false;
				scope.sended = false;

				scope.click= function(){
					console.log('clikked');
					console.log(scope.rev._id);
					scope.report({value:scope.rev._id});
					scope.hover = false;
					scope.sended = true;
				}

				

				elem.on('mouseenter',function(){
					scope.$apply(function(){
						//disabled temporary
						if(!scope.sended) scope.hover = true;
						// scope.hover = false;
					});
				});

				elem.on('mouseleave', function(){
					scope.$apply(function(){
						scope.hover = false;
					})
				})
			}
		}
	});

directives.directive('stars', function(){
	return {
		restrict:'E',
		templateUrl:'../templates/stars.tpl.html',
		scope:{
			ngModel: '=',
			points:'@'
		},
		link: function(scope,elem,attr){
			scope.rating = scope.ngModel || scope.points;

			// console.log(scope.points, scope.ngModel,scope.rating);
			// console.log('typeof:',typeof scope.points)

			if(attr.ngModel){
				scope.clickable = true;

			}
			else scope.clickable = false;
		},
		controller: function($scope,$element,$attrs){

			$scope.rating = $scope.ngModel || $scope.points;
			$scope.$watch('points',function(){
				$scope.rating = $scope.points;
			})
			console.log($scope.rating);

			if($scope.clickable){
				$scope.rating = $scope.ngModel;
			}

			$scope.rate = function(point){
				if($scope.clickable) {
					$scope.rating = point;
					$scope.ngModel = $scope.rating;
				}
			}
		}
	}
})

directives.directive('popupMap',function(){
	return {
		restrict:'E',
		template:"<div class='map'></div>",
		scope:{
			address:"="
		},
		controller:function($scope,$element,$attrs){
			var baseurl= "https://www.google.com/maps/embed/v1/search?key=";
			var apikey ="AIzaSyBtblMBPjXgPvg_TPkn_ohCYTNRw3DRrio";
			var indirizzo = '';
			var finalurl = '';
			var address = document.getElementById('address');
			$scope.$watch('address',function(){
				indirizzo = $scope.address || '' ;
				if(indirizzo!= '') $scope.showable = true;
				finalurl= baseurl+apikey+'&q='+ indirizzo.replace(/ /g, '+');
				console.log($element.children());
				// $element.css({
				// 	position:'absolute',
				// 	bottom:address.getBoundingClientRect().height + address.offsetTop + 'px',
				// 	width:'300px'
				// })
				$element.children()[0].innerHTML = "<iframe width=\"100%\"height=\"100%\" frameborder=\"0\" style=\"border:0\"src=\""+finalurl+"\"></iframe>";
			})
		}
	}
})
