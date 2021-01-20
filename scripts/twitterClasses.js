class FetchData {

  //
  getResourse = async url => {
    const res = await fetch(url)

    if(!res.ok){
      throw new Error(res.status)
    }

    return(res.json())
  }

  getPost = async () => this.getResourse('db/dataBase.json')

}


class Twitter {
  constructor(param) {
    const fetchData = new FetchData()
    this.tweets = new Posts()
    this.elements = {
      listElem: document.querySelector(param.listElem)
    }

    fetchData.getPost()
      .then(data => {
        data.forEach(this.tweets.addPost)
        this.showAllPosts()
      })
      
    
    console.log(this.tweets)
  }

  renderPosts(posts) {

    this.elements.listElem.textContent = ''

    posts.forEach(({id, 
      userName, 
      nickname, 
      getDate, 
      text, 
      img, 
      likes}) => {
      
      this.elements.listElem.insertAdjacentHTML('beforeend', `
      <li>
      <article class="tweet">
        <div class="row">
          <img class="avatar" src="images/${nickname}.jpg" alt="Аватар пользователя ${nickname}">
          <div class="tweet__wrapper">
            <header class="tweet__header">
              <h3 class="tweet-author">${userName}
                <span class="tweet-author__add tweet-author__nickname">@${nickname}</span>
                <time class="tweet-author__add tweet__date">${getDate()}</time>
              </h3>
              <button class="tweet__delete-button chest-icon" data-id="${id}"></button>
            </header>
            <div class="tweet-post">
              <p class="tweet-post__text">${text}</p>
              ${ 
                (img) ? 
                `<figure class="tweet-post__image">
                  <img src="${img}" alt="tweet">
                </figure>`:
                ``
              }
              
            </div>
          </div>
        </div>
        <footer>
          <button class="tweet__like">
            ${likes}
          </button>
        </footer>
      </article>
    </li>
      `)
    })
  }

  showUserPost() {

  }

  showLikesPost() {

  }

  showAllPosts() {
    this.renderPosts(this.tweets.posts)
  }

  openModal(){

  }
}

class Posts {
  constructor({posts = []} = {}) {
    this.posts = posts
  }

  addPost = (post) => {
    this.posts.push(new Post(post)) 
  }
  
  deletePost(id) { 
    try {
      this.posts.splice(this.posts.findIndex(post => post.id === `${id}`), 1)
    } catch(err) {
      if (err) console.log('wrong id, cannot delete') 
    }
    
  }

  likePost(id) {
    try {
      this.posts[this.posts.findIndex(post => post.id === `${id}`)].changeLike()
    } catch(err) {
      if (err) console.log('wrong id, cannot delete') 
    }
  }
}

class Post {
  constructor(param) {
    this.id = param.id || this.generateId()
    this.userName = param.userName || 'empty'
    this.nickname = param.nickname || 'empty'
    this.postDate = new Date(param.postDate) || new Date()
    this.text = param.text || 'empty'
    this.img = param.img || 'none'
    this.likes = param.likes || 0
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

  generateId() {
    return (Math.random().toString(32).substring(2, 9) + (+new Date).toString(32))
  }

  getDate = () => {

    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minutes: '2-digit'
    }

    return this.postDate.toLocaleString('ru-RU', options)
  }
}

export default {
  Twitter,
  FetchData
}