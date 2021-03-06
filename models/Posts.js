var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  link: String,
  upvotes: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  author: String
});

PostSchema.methods.remove = function(_id) {
  this.post;
  this.delete($index);
};

PostSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

// PostSchema.methods.downvote = function(cb) {
//   this.upvotes -= 1;
//   this.save(cb);
// }

mongoose.model('Post', PostSchema);