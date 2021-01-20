class Character6 {

  constructor (param) {
    this.name = param.name
    this.server = param.server 
    this.gender = param.gender
  }

  walk = function(steps) {
    console.log(this.name + ' идет')
  }

  run = function(){
    console.log(this.name + ' бежит')
  }

 
}

class Race6 extends Character6 {

  constructor(param){
    super(param)
    this.race = param.race
    this.skin = param.skin
  }

  run() {
    super.run()
    console.log('точно бежит')
  }

  mainskill = function() {
    console.log(this.race + ' ' + this.name + ' использует суперспособность')
  }
}

class Class6 extends Race6{
  constructor(param){
    super(param)
    this.class = param.class
    
  }

  specialskill(){
    return (this.class === 'warrior') ? 'Рассекающий Удар Мечом' : 'никакую'
  }

  classSkill() {
    console.log(this.class + ' ' + this.race + ' ' + this.name + ' использует ' + this.specialskill())
  }


}

export default {
  Character6,
  Class6,
  Race6
}