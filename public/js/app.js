(function(){
	angular.module('RateMyCustomer', ["ngRoute"])

	.config(function($routeProvider){

		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/default.html',
				controller: 'home'
			})

			// route for the insert page
			.when('/insert', {
				templateUrl : 'pages/insert.html',
				controller: 'insertNew'
			})

			// route for the view & comment page
			.when('/view-comment/:id', {
				templateUrl : 'pages/review.html',
				controller: 'viewCompany'
			});

	})

	.controller('home', function($scope,$location,$back){
		//var url="https://radiant-fire-9839.firebaseio.com/aziende";
		//var ref= new Firebase(url);
		 $scope.show = false;
		 $scope.notfound=false;
		 $scope.search = function(query){
		 	console.log("query");
		 	if(query != ''){
		 		$back.search(query).then(function(response,err){
		 		$scope.data = response.data;
		 		console.log($scope.data);
		 	})}
		 	else{
		 		$scope.data = [];
		 	}
		 	
		 }

		 $scope.mostra= function(){
		 	$scope.show = !$scope.show;
		 }

		 
		 $scope.showItem=null;

		
		 
		
	})
	.controller('insertNew',function($scope,$back,$location){
		$scope.newCompany={};
 		$scope.insertCompany=function(){
		 	$scope.newCompany.recensioni=[];
		 	$back.add($scope.newCompany);
		 	$scope.newCompany={};
		 	$location.path("/");
		 }
	})
	.controller("viewCompany",function($scope,$routeParams,$back){
		
		console.log('viewCompany');

		$scope.params = $routeParams;
		//var url="https://radiant-fire-9839.firebaseio.com/aziende";
		//var ref= new Firebase(url+"/"+$scope.params.item);
		$back.getCompany($scope.params.id).
			then(function(response){
				$scope.aziendaView = response.data;
				console.log(response)
			});
		$scope.newReview={
			rating:0
		};
		$scope.showInsertReview=false;

		$scope.insertReview = function(){
			$back.addComment($scope.newReview,$scope.params.id).
			then(function(){
				$scope.aziendaView.comments.push($scope.newReview);
				$scope.newReview={
					rating:0
				};
		    $scope.showInsertReview=false;
			})
		 	
		};



	})
	.service('$back', function($http){

		this.add= function(company){

			$http.post('/api/',company);
		}

		this.search = function(query){
			var data = {
				key:query
			}

			return $http.post('/api/search/', data);

		}

		this.getCompany = function(id){

			console.log(id);

			if(id == undefined) return [];
			else return $http.get('/api/'+id);
		}

		this.addComment = function (comment, company){
			return $http.post('/api/'+ company, comment);
		}
	})
	.directive("review",function(){
		return{
			restrict:"E",
			templateUrl:"../templates/review.tpl.html",
			scope:{
				elem:"="
			}
		}
	})


})();