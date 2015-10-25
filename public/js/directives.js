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

				

				scope.click= function(){
					console.log('clikked');
					console.log(scope.rev._id);
					scope.report({value:scope.rev._id});
				}

				scope.hover= false;

				elem.on('mouseenter',function(){
					scope.$apply(function(){
						//disabled temporary
						scope.hover = true;
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

			console.log(scope.points, scope.ngModel);

			if(attr.ngModel){
				scope.clickable = true;

			}
			else scope.clickable = false;
		},
		controller: function($scope,$element,$attrs){

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
