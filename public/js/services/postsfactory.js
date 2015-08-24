app.factory('posts', ['$http', 'auth', function($http, auth){
    //service body
    var o = {
        posts: [] //{title:'hello', link:'', upvotes:0}
    };

    o.get = function(id) {
      return $http.get('/posts/' + id).then(function(res){
        return res.data;
      });
    };

    o.getAll = function() {
      return $http.get('/posts').success(function(data) {
        angular.copy(data, o.posts);
      });
    };

  o.create = function(post) {
      return $http.post('/posts', post, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).success(function(data){
        o.posts.push(data);
        console.log("postfactory create: ", data);
      });
    };
   /* A service for updating posts*/
  o.update = function(post) {
      return $http.put('/posts', post, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).success(function(data){
        o.posts.put(data);
      });
  };
 /* A service for removing posts*/
  o.remove = function(post) {
      return $http.delete('/posts', post, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).success(function(data){
        o.posts.delete(data);
        console.log("postfactory remove: ", data);
      });
  };

    o.upvote = function(post) {
      return $http.put('/posts/' + post._id + '/upvote', null, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).success(function(data){
        post.upvotes += 1;
      });
    };

    // o.downvote = function(post) {
    //   return $http.put('/posts/' + post._id + '/upvote', null, {
    //     headers: {Authorization: 'Bearer '+auth.getToken()}
    //   }).success(function(data){
    //     post.upvotes -= 1;
    //   });
    // };
    o.addComment = function(id, comment) {
      return $http.post('/posts/' + id + '/comments', comment, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      });
    };

    o.upvoteComment = function(post, comment) {
      return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote', null, {
        headers: {Authorization: 'Bearer '+auth.getToken()}
      }).success(function(data){
        comment.upvotes += 1;
      });
    };

    // o.downvoteComment = function(post, comment) {
    //   return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote', null, {
    //     headers: {Authorization: 'Bearer '+auth.getToken()}
    //   }).success(function(data){
    //     comment.upvotes -= 1;
    //   });
    // };
    return o;
}]);