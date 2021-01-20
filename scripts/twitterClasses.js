class Twitter {
  constructor(param) {
    this.tweets = new Posts()
    this.elements = {
      listElem: document.querySelector(param.listElem)
    }
  }

  renderPosts() {

  }

  showUserPost() {

  }

  showLikesPost() {

  }

  showAllPost() {

  }

  openModal(){

  }
}

class Posts {
  constructor({posts = []} = {}) {
    this.posts = posts
  }

  addPost(tweet) {
    const post = new Post(tweet)
    this.posts.push(post) 
  }
  
  deletePost(id) {

  }

  likePost(id) {

  }
}

class Post {
  constructor(param) {
    this.id = param.id
    this.userName = param.userName
    this.nickName = param.nickName
    this.postData = param.postData
    this.text = param.text
    this.img = param.img
    this.likes = param.likes
    this.liked = false
  }

  changeLike() {
    this.like = !this.like
    if (this.like){
      this.likes++
    } else {
      this.likes--
    }
    
  }

}

export default {
  Twitter
}