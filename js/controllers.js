'use strict';

/* Controllers */

var pokemonControllers = angular.module('pokemonControllers', []);

pokemonControllers.controller('pokemonListCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.next_page = '';
  $scope.loadData = function() {
    $http.get("http://pokeapi.co/api/v1/pokemon/?limit=12"+$scope.next_page).then(function(response) {
      $scope.pokemonsPortion = response.data.objects;
      $scope.pokemons = $scope.pokemons.concat($scope.pokemonsPortion);
      $scope.has_more = response.data.meta.next;
      $scope.offset = response.data.meta.offset;
      $scope.loading = false;
      $scope.dataLoaded = true;
    });
  };

  $scope.getPokemonTypes = function() {
    $http.get("http://pokeapi.co/api/v1/type/?limit=999").then(function(response) {
      var typesObj = response.data.objects;
      for (var i = 0; i < typesObj.length; i++){
        $scope.pokemonTypes.push(typesObj[i]['name']);
      };
    });
  };

  $scope.loadMore = function() {
    $scope.loading = true;
    $scope.next_page = '&offset='+($scope.offset + 12).toString();
    $scope.loadData();
  };

  $scope.setPokemonId = function(id) {
    var template = "#000";
    var stringId = id.toString();
    return template.slice(0, template.length - stringId.length) + stringId;
  };
  $scope.showMe = function(id) {
    if ( ($scope.showme && $scope.id == 0) || (! $scope.showme && $scope.id != id) )  {
      for (var i = 0; i < $scope.pokemons.length; i++){
        if ($scope.pokemons[i]['pkdx_id'] == id) {
          var fullData = $scope.pokemons[i];
        };
      };
      $scope.detailPokemon['name'] = fullData.name;
      $scope.detailPokemon['format_id'] = $scope.setPokemonId(fullData.pkdx_id);
      $scope.detailPokemon['pkdx_id'] = fullData.pkdx_id;
      $scope.detailPokemon['types'] = fullData.types;
      $scope.detailPokemon['attack'] = fullData.attack;
      $scope.detailPokemon['defense'] = fullData.defense;
      $scope.detailPokemon['hp'] = fullData.hp;
      $scope.detailPokemon['sp_atk'] = fullData.sp_atk;
      $scope.detailPokemon['sp_def'] = fullData.sp_def;
      $scope.detailPokemon['speed'] = fullData.speed;
      $scope.detailPokemon['weight'] = fullData.weight;
      $scope.detailPokemon['total_moves'] = fullData.moves.length;

      if ($scope.id != id && $scope.showme) {
        $scope.showme = false;
      };
      $scope.id = id;
    } else {
      $scope.showme = true;
      $scope.id = 0;
      $scope.detailPokemon = {};
    };
  };

  $scope.host = "http://pokeapi.co";
  $scope.id = 0;
  $scope.loading = false;
  $scope.dataLoaded = false;
  $scope.pokemons = [];
  $scope.detailPokemon = {};
  $scope.pokemonTypes = [];
  $scope.loadData();
  $scope.getPokemonTypes();
  $scope.showme = true;
  }]);
