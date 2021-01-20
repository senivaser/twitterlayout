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
    this.posts.splice(this.posts.findIndex(post => post.id === `${id}`), 1)
  }

  likePost(id) {
    this.posts[this.posts.findIndex(post => post.id === `${id}`)].changeLike()
  }
}

class Post {
  constructor(param) {
    this.id = param.id
    this.userName = param.userName && 'empty'
    this.nickName = param.nickName && 'empty'
    this.postData = param.postData && new Date()
    this.text = param.text && 'empty'
    this.img = param.img && 'none'
    this.likes = param.likes && 0
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