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
					scope.report({value:scope.rev._id});
					scope.hover = false;
					scope.sended = true;
				}

				elem.on('mouseenter',function(){
					scope.$apply(function(){
						if(!scope.sended) scope.hover = true;
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
			scope.$watch('points',function(){
				scope.rating = scope.ngModel || scope.points;
			})
			scope.rate = function(point){
				if(scope.clickable) {
					scope.rating = point;
					scope.ngModel = point;
				}
			}
		},
		controller: function($scope,$element,$attrs){
			if($attrs.ngModel){
				$scope.clickable = true;
			}
			else $scope.clickable = false;

			$scope.rating = $scope.ngModel || $scope.points;
		}
	}
})

directives.directive('map',function(){
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
			$scope.$watch('address',function(){
				indirizzo = $scope.address || '' ;
				if(indirizzo!= '') $scope.showable = true;
				finalurl = baseurl+apikey+'&q='+ indirizzo.replace(/ /g, '+');
				$element.children('.map')[0].innerHTML = "<iframe width=\"100%\"height=\"100%\" frameborder=\"0\" style=\"border:0\"src=\""+finalurl+"\"></iframe>";
			})
		}
	}
})

directives.directive('customTextArea',function(){
	return {
		restrict:"E",
		template:"<textarea rows={{rows}} placeholder={{placeholder}} ng-model='text' class='custom bkg-white'></textarea>",
		scope:{
			placeholder:"@",
			ngModel:"=",
			rows:"@",
			fontSize:"@",
			fontFamily:"@"
		},
		controller:function($scope,$element,$attrs){
			$scope.placeholder = $scope.placeholder || '';
			$scope.rows = $scope.rows || 1;
		},
		link:function(scope,element,attrs){
			scope.text = scope.ngModel;
			scope.ngModel = scope.text;
			var calclulateFontWidth = function(){
				$('body').append('<span id="calculateTextSize">ABCDFGHIJKLMOPQRSTUVZabcdfghijklmopqrstuvz</span>');
				$('#calculateTextSize').css({
					fontSize:scope.fontSize,
					fontFamily:scope.fontFamily
				});
				var innerWidth = $('#calculateTextSize').innerWidth();
				$('#calculateTextSize').remove();
				return Math.ceil(innerWidth/42);
			}();
			var textarea = element.find('textarea');
			var characterPerLine = Math.floor(textarea.innerWidth()/ calclulateFontWidth);
			$(window).on('resize',function(){
				characterPerLine = Math.floor(textarea.innerWidth()/ calclulateFontWidth);
			})
			
			scope.$watch('text',function(){
				scope.ngModel = scope.text = scope.text || '';
				var text = scope.text;
				scope.rows = Math.ceil(text.split('').length / characterPerLine) === 0 ? 1 : Math.ceil(text.split('').length / characterPerLine);
			})
		}

	}
})
