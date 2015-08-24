app.controller('mainController', ['$scope', 'posts', 'auth', function($scope, posts, auth) {

    $scope.$back = function() { 
      window.history.back();
    };

    
    $scope.posts = posts.posts;
    $scope.isLoggedIn = auth.isLoggedIn;  
    // $scope.currentUser() = $scope.isLoggedIn;

    $scope.addPost = function() {
        if (!$scope.title || $scope.title === '') { return; } 
        posts.create({
          title: $scope.title,
          link: $scope.link,        
        });             
         $scope.title = '';
         $scope.link = '';
    };

    $scope.deletePost = function (index) {
      console.log("Deleting post: ",index);
      $scope.posts.splice(index, 1);
    };
    
    $scope.incrementUpvotes = function(post) {
      posts.upvote(post);
    };
    // $scope.decrementUpvotes = function(post) {
    //   posts.downvote(post);
    // };
}]);