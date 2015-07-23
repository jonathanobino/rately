var directives = angular.module('directives',[]);

directives.directive("review",function(){
		return{
			restrict:"E",
			templateUrl:"../templates/review.tpl.html",
			scope:{
				rev:"=",
				report:"&"
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
						// scope.hover = true;
						scope.hover = false;
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