export default class ListDataSource {
  constructor() {
    this.listPosts = [];
    this.activePost = {};
  }

  updateListPosts(postId, currentItem) {
    let data = this.getPostDataById(postId);
    if (data) {
      data.currentItem = currentItem;
    } else {
      this.listPosts.push({
        postId: postId,
        currentItem: currentItem
      });
    }
  }

  addListPosts(postId) {
    let data = this.getPostDataById(postId);
    if (!data) {
      this.listPosts.push({
        postId: postId,
        currentItem: 0
      });
    }
  }

  updateActivePost(postId) {
    this.activePost = {
      postId: postId
    };
  }

  getPostDataById(postId) {
    return this.listPosts.find(post => post.postId == postId);
  }

  getCurrentItemByPostId(postId) {
    let data = this.getPostDataById(postId);
    return data ? (data.currentItem ? data.currentItem : 0) : 0;
  }
}
