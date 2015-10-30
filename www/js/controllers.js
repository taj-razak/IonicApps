angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicSlideBoxDelegate,$cordovaOauth,$ionicPopup,$location,$http) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.UserError=true;



  // Open the login modal
  $scope.login = function() {
    // $cordovaOauth.google("585179350325-9hoi8nv3g31blsgfrromi291rmvesd92.apps.googleusercontent.com", ['https://www.googleapis.com/auth/plus.login', 'https://www.google.com/m8/feeds/contacts/default/full']).then(function(result) {
    //   $ionicPopup.alert({
    //     title: error,
    //     template: 'It might taste good'
    //   });
    // }, function(error) {
    //   $ionicPopup.alert({
    //     title: error,
    //     template: 'It might taste good'
    //   });
    // });
    console.log($scope.loginData.username+","+$scope.loginData.password);
    $http.post('http://localhost:3000/IonicLogin',{useremail:$scope.loginData.username,userpassword:$scope.loginData.password}).then(function(obj){
      console.log(obj.data)
      if(obj.data==true)
      {
        $location.path('/app/playlists');
      }
      else{
        $ionicPopup.alert({
          title: 'Login Error',
          template: '<center><p style="color:red;text-weight:bold;">Invalid Email or Password</p></center>'
        });
      }

    })
  };
})


.controller('PlaylistsCtrl', function($scope,$ionicPopup) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];

})

.controller('searchController', function($scope) {
  angular.extend($scope, {
    centerProperty: {
      lat: 17.6868159,
      lng: 83.2184815
    },
    zoomProperty: 8,
    markersProperty: [ {
      latitude:  17.6868159,
      longitude: 83.2184815
    }],
    clickedLatitudeProperty: null,
    clickedLongitudeProperty: null,
  });


})
.controller('PostsCtrl',function($scope,$http,$ionicModal){
  $scope.Userposts={};


    $ionicModal.fromTemplateUrl('templates/comments.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });




  $http.get('http://localhost:3000/getPosts').then(function(Udata){
    console.log(Udata);
    $scope.Userposts=Udata.data;

  })



  $scope.clicked=function(Like){

    if(Like.color==undefined)
    {
      console.log(Like.color+"custColor")
      Like.color="custColor";

    }    else
    {
      console.log(Like.color)
      Like.color=undefined;
    }
  }

  $scope.showComment=function(Like){
    // if(Like.visibleStatus==undefined)
    // {
    //   Like.visibleStatus=true;
    //   Like.custCommentColor="custCommentColor";
    // }else{
    //   Like.visibleStatus=undefined;
    //   Like.custCommentColor=undefined;
    // $scope.modal.show();
    //
    // }
   $scope.UserComments=Like;
console.log(Like)
    $scope.modal.show();
  }

  $scope.sharePost=function(Like){
    if(Like.custShareColor==undefined)
    Like.custShareColor="custShareColor";
    else
    Like.custShareColor=undefined;
  }
  $scope.closeLogin = function() {
     $scope.modal.hide();
   };



})
