var services = angular.module('backendcomm',[]);

services.service('$back', function($http){

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

		this.report = function(id,user){

			var body = {
				id:id,
				by: user
			}

			return $http.post('/api/report',body);
		}
	});

