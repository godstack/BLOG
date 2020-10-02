export function likePostFn(statePosts, action) {
  const posts = statePosts.map(post => {
    if (post._id === action.payload.postId) {
      const isLikedByUser = post.likes.find(el => el === action.payload.userId);

      if (isLikedByUser) {
        post.likes = post.likes.filter(el => el !== action.payload.userId);
      } else {
        post.likes.push(action.payload.userId);
      }
    }

    return post;
  });

  return posts;
}
