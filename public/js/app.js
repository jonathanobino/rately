(function(){
	angular.module('RateMyCustomer', ['ui.router','ezfb','backendcomm','directives'])

	.config(function($stateProvider,ezfbProvider,$urlRouterProvider){


		$stateProvider

		.state('home', {
				url:'/',
				templateUrl : 'pages/default.html',
				controller: 'home'
			})
		.state('view',{
			url:'/view/:id',
			templateUrl : 'pages/review.html',
			controller: 'viewCompany'
		})
		.state('insert',{
			url:'/insert',
			templateUrl : 'pages/insert.html',
			controller: 'insertNew'

		});

		$urlRouterProvider.otherwise('/');


		ezfbProvider.setInitParams({
			appId:'650646235070285',
			version:'v2.3'
		});


	})
	.run(function(ezfb){
		ezfb.init();
	})


	.controller('home', function($scope,$back){

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

	.controller('insertNew',function($scope,$back,$state){

		$scope.newCompany={};
 		$scope.insertCompany=function(){
		 	$scope.newCompany.recensioni=[];
		 	$back.add($scope.newCompany);
		 	$scope.newCompany={};
		 	$state.go('home');
		 }
	})

	.controller("viewCompany",function($scope,$stateParams,$back,ezfb){

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

		$scope.rep = function(comment_id){
			$back.report(comment_id,company_id,$scope.userData).then(function(data){
				console.log('reported', data);
			});
		}

		$scope.params = $stateParams;
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
