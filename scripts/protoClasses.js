const myobj = {
  firstname: 'Max',
  surname: 'Leskin',
  walk: (steps) => {
    console.log(myobj.firstname+'прошел' + steps + 'шагов')
    console.log(this)
  }
}



const User = function(param) {
  this.firstname = param.firstname;
  this.surname = param.surname;
  this.walk = function(steps) {
    console.log(this.firstname + ' прошел ' + steps + ' шагов')
  }
}

User.prototype.coding = function(time) {
  console.log(this.surname + ' писал код ' + time + ' часов')
}



////////////////////////////

const Character = function(param) {
  this.name = param.name
  this.server = param.server 
  this.gender = param.gender
}

Character.prototype.walk = function(steps) {
  console.log(this.name + ' идет')
}

Character.prototype.run = function(){
  console.log(this.name + ' бежит')
}


const Race = function(param) {
  Character.apply(this, arguments)
  this.race = param.race
  this.skin = param.skin
}

Race.prototype = Object.create(Character.prototype)
Race.prototype.constructor = Character


Race.prototype.mainskill = function() {
  console.log(this.race + ' ' + this.name + ' использует суперспособность')
}


const Class = function (param) {

  
  Race.apply(this, arguments)
  this.class = param.class
  this.specialskill = function() {
    return (this.class === 'warrior') ? 'Рассекающий Удар Мечом' : 'никакую'
  }
  this.state = param.state


}

Class.prototype = Object.create(Race.prototype)
Class.prototype.constructor = Race


Class.prototype.classSkill = function() {
  console.log(this.class + ' ' + this.race + ' ' + this.name + ' использует ' + this.specialskill())
}


export default {
  myobj,
  User,
  Character,
  Race,
  Class
}


