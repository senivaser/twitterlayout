/*

document.addEventListener('DOMContentLoaded', function() {
  const testlike = document.getElementById('test-like')
  console.log(testlike)
})

*/

//////Twitter

import twitterClasses from './twitterClasses.js'

const {
  Twitter,
  FetchData
} = {...twitterClasses}

///Заполнение твиттера
const twitter = new Twitter({
  listElem: '.tweet-list'
})

twitter.tweets.addPost({
  id: '23',
  userName: 'Натали',
  nickName: 'Nataly',
  postDate: '01.19.2021',
  text: 'KAEF',
  img:'',
  likes: '50',
  liked: false
})

const idarr = [1, 2, 3, 4, 5, 6]
/*
idarr.map((id) => {
  twitter.tweets.addPost({
    'id': `${id}`,
    likes: 10
  })
})
*/

/*
twitter.tweets.addPost ({
  text: "Hi, there"
})
*/

twitter.tweets.deletePost(3)

console.log(twitter)

const fetchObj = new FetchData()

console.log(fetchObj)

fetchObj.getPost().then((data) => {
  console.log(data)
}, () => {})









/*Proto calls

import protoClasses from './protoClasses.js'

console.log(protoClasses)

const {
  myobj,
  User,
  Character,
  Race,
  Class
 } = {...protoClasses}

myobj.walk(50)

const dmitry = new User ({
  firstname: 'Дмитрий',
  surname: 'Посадский'
})

console.log(dmitry)
dmitry.walk(5000)
dmitry.coding(2)

const char = new Character({})
const race = new Race({})
const classs = new Class({})

console.log(char)
console.log(race)
console.log(classs)

const warrior = new Class({
  name: 'MaxWARRIOR',
  server: 'Luxemburg',
  gender: 'Male',
  skin: 'red',
  race: 'orc',
  class: 'warrior',
  state: []
})

console.log(warrior)
warrior.walk(500)
warrior.classSkill()

*/


/*ES6Class calls

import ES6Classes from './ES6Classes.js'

const {
  Class6,
  Race6,
  Character6
} = {...ES6Classes}

const warrior1 = new Class6({
  name: 'MaxWARRIOR',
  server: 'Luxemburg',
  gender: 'Male',
  skin: 'red',
  race: 'orc',
  class: 'warrior'
})

warrior1.classSkill()
*/