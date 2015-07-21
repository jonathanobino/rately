(function(){
	angular.module('RateMyCustomer', ['ngRoute','ezfb','backendcomm','directives'])

	.config(function($routeProvider,ezfbProvider){

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

			ezfbProvider.setInitParams({
				appId:'650646235070285',
				version:'v2.3'
			});


	})
	.run(function(ezfb){
		ezfb.init();
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
	.controller("viewCompany",function($scope,$routeParams,$back,ezfb){
		

		var user = {};
		$scope.showInsertReview=false;
		$scope.loggedIn = false;

		user.update = function(){
			ezfb.getLoginStatus()
			.then(function(res){
				console.log(res);
				if(res.status == "connected")
					return ezfb.api('/me');
				else{
					$scope.loggedIn = false;
				}
			})
			.then(function(me){
				console.log(me);
				if(me == undefined) $scope.loggedIn = false;
				else $scope.loggedIn = true;
				$scope.userData = me;
			})
		};

		user.update();



		$scope.params = $routeParams;
		$back.getCompany($scope.params.id).
			then(function(response){
				$scope.aziendaView = response.data;
				console.log(response)
			});
		$scope.newReview={
			rating:1
		};

		

		$scope.insertReview = function(){

			$scope.newReview.user = $scope.userData;
			$scope.newReview.dateAdded = Date.now();

			$back.addComment($scope.newReview,$scope.params.id).
			then(function(){
				$scope.aziendaView.comments.push($scope.newReview);
				$scope.newReview={
					rating:1
				};
		    $scope.showInsertReview=false;
			})
		 	
		};

		$scope.login= function(){
			ezfb.login(null,{scope:"public_profile"}).
			then(function(res){
				user.update();
			})
			
		};

		$scope.logout= function(){
			ezfb.logout().
			then(function(data){
				user.update();
			})
		}







	})
	


})();