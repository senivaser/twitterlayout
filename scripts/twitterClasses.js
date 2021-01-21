
//Класс работы с запросами
class FetchData {

  //Общая функция для получения данных из запроса
  getResourse = async url => {
    const res = await fetch(url)

    if(!res.ok){
      throw new Error(res.status)
    }

    return(res.json())
  }

  //Получение всех постов из запроса
  getPost = async () => this.getResourse('db/dataBase.json')

}

//Основной класс страницы-твиттера, содержащий
//в себе перечень и фунцкионал постов в собственной ленте 
class Twitter {

  constructor({listElem, modalElems, tweetElems, user}) {

    //Создается объект для работы с запросами
    const fetchData = new FetchData()

    //Характеристика является объектом класса Posts,
    //по сути содержит все посты и методы воздействия на них
    this.tweets = new Posts()
    this.user = user

    //Указание класса тега родителя для вставки поста
    this.elements = {
      listElem: document.querySelector(listElem),
      modal: modalElems,
      tweetElems
    }

    //Заполнение this.tweets постами из данных запроса
    fetchData.getPost()
      .then(data => {
        data.forEach(this.tweets.addPost)

        //По умолчанию, при создании объекта Twitter происходит 
        //отображение всех постов на странице, так как вызов 
        //этой функции выполняется в конструкторе
        this.showAllPosts()
    })
    
    this.elements.modal.forEach(this.handlerModal, this)
    this.elements.tweetElems.forEach(this.addTweet, this)
    //console.log(this.tweets)
  }

  //Функция непосредственно отображает посты в верстке, переданные
  // в аргументе, через HTML-вставки и является инструментом для 
  //других функций отображения
  renderPosts(posts) {

    //Удаление текста внутри родительского тега, на случай, 
    //если он там есть
    this.elements.listElem.textContent = ''

    //Перебор постов из аргументов, вызывающий последовательное
    //добавление верстки поста внутрь тега перед его концом, а значит
    //друг за другом
    posts.forEach(({id, 
      userName, 
      nickname,
      
      //передается функция для формата даты
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

  //Следующие функции отображения используют вызов
  //функции this.renderPosts c передачей списка
  //конкретных постов, отвечающих смыслу данной функции 

  //Отображение постов пользователя
  showUserPost() {

  }

  //хз
  showLikesPost() {

  }

  //Отображение всех постов 
  showAllPosts() {
    this.renderPosts(this.tweets.posts)
  }

  ////////////////

  //Открытие модального окна
  handlerModal({button, modal, overlay, close}){

    const buttonElem = document.querySelector(button)
    const modalElem = document.querySelector(modal)
    const overlayElem = document.querySelector(overlay)
    const closeElem = document.querySelector(close)

    const openModal = (e) => {
      console.log(e)
      modalElem.style.display = 'block'
    }

    const closeModal = (elem, event) => {
      const target = event.target
       if (target === elem) modalElem.style.display = 'none'
    }

    buttonElem.addEventListener('click', openModal)

    if (closeElem) {
      closeElem.addEventListener('click', closeModal.bind(null, closeElem))
    }
    
    if (overlayElem) {
      overlayElem.addEventListener('click', closeModal.bind(null, overlayElem))
    }
    
    this.handlerModal.closeModal = () => {
      modalElem.style.display = 'none'
    }
  }

  ///Рендер твита
  addTweet ({text, img, submit}) {

    const textElem = document.querySelector(text)
    const imgElem = document.querySelector(img)
    const submitElem = document.querySelector(submit)

    let imgURL = ''
    let tempString = textElem.innerHTML

    submitElem.addEventListener('click', () => {
      this.tweets.addPost({
        userName: this.user.name,
        nickname: this.user.nick,
        text: textElem.innerHTML,
        img: imgURL
      })
      this.showAllPosts()
      this.handlerModal.closeModal()
      console.log(this.tweets)
    })

    textElem.addEventListener('click', ()=> {
      if (textElem.innerHTML === tempString){
        textElem.innerHTML = ``
      }
      
    })

    imgElem.addEventListener('click', () => {
      imgURL = prompt('Введите адрес изображения')
    })

  }
}

//Класс для списка постов (объектов класса Post), а так же работы
//с этим списком и элементами по отдельности
class Posts {

  //По умолчанию список постов пустой
  constructor({posts = []} = {}) {

    //Список постов (объектов класса Post)
    this.posts = posts
  }

  //Функция добавления поста в список. Принимает внешнее окружение,
  //поэтому может передаваться для работы как функция
  // в наследующие классы
  addPost = (post) => {
    this.posts.unshift(new Post(post)) 
  }

  //Удаление поста из списка
  deletePost(id) { 
    try {
      //Да вроде не сложно и в одну строчку :)
      this.posts.splice(this.posts.findIndex(post => post.id === `${id}`), 1)
    } catch(err) {
      if (err) console.log('wrong id, cannot delete') 
    }
    
  }

  //Лайкнуть пост, используя Post.changeLike, метод класса Post
  likePost(id) {
    try {
      //Да вроде не сложно и в одну строчку :)
      this.posts[this.posts.findIndex(post => post.id === `${id}`)].changeLike()
    } catch(err) {
      if (err) console.log('wrong id, cannot delete') 
    }
  }
}

//Класс для структуры отдельного поста и 
//функционала для воздействия на него
class Post {
  constructor(param) {
    
    //При создании характеристик используется заполнение по
    //умолчанию через (переданный параметр) || (параметр по умолчанию)
    
    // return a || b /-/ если а - true, вернется a, иначе
    // если b - true, вернется b, иначе вернется fasle
    // в нашем случае b точно true, поэтому вернется либо
    // a, либо b, значит, каждая характеристика будет заполнена
    
    
    this.id = param.id || this.generateId()                  //id поста
    this.userName = param.userName || 'empty'                //имя пользователя
    this.nickname = param.nickname || 'empty'                //ник пользователя
    this.postDate = param.postDate || new Date()   //дата поста
    this.text = param.text || 'empty'                        //текст поста
    this.img = param.img || 'none'                           //путь к изображению поста
    this.likes = param.likes || 0                            //лайки поста
    this.liked = false                                       //последнее действие с лайком (true - поставлен лайк, false - убран)
  }

  //Добавляет лайк, либо убирает (по сути нет работы с Юзером,
  // поэтому функция будет добавлять-убирать только один лайк,
  //нуждается в доработке)
  changeLike() {
    this.liked = !this.liked
    if (this.like){
      this.likes++
    } else {
      this.likes--
    }
  }

  //Функция для создания id по умолчанию
  generateId() {
    return (Math.random().toString(32).substring(2, 9) + (+new Date).toString(32))
  }

  //Функция для форматирования даты
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