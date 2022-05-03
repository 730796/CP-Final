kaboom({
  scale: 1.75,
  background: [185, 235, 227],
})

loadSprite("mail","mail.png") 
/* https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fimage-vector%2Fenvelope-pixel-art-style-icon-isolated-760894363&psig=AOvVaw2uo_NTRaT200GsHqPubK3u&ust=1651675929553000&source=images&cd=vfe&ved=2ahUKEwj6keW5ysP3AhUOC80KHde1CC8Qr4kDegUIARDwAQ */

const levelConfig = {
  width: 16,
  height: 16,
  pos: vec2(0,0),
  
}
const levels = [
  [
    ""
  ],
]

let move = true

scene("menu", () => {
  add([
    text("title",{
      size: 100
    }),
    origin("center"),
    pos(width()/2,height()/2-125),
    area(),
  ])
  add([
    text("play"),
    pos(width()/2,height()/2-25),
    origin("center"),
    area(),
  ])
})
scene("controls", () => {
  
})
scene("game", () => {
  let level = addLevel(levels[0],levelConfig)
  const letter = add([
    "letter",
    sprite("mail",{
      width: 100,
      height: 100,
    }),
    pos(55,50),
    origin("center"),
    z(1),
    fixed(),
  ])
  let mail = 5
  let mailCounter = add([
    "mailCounter",
    text("x" + mail,{
      size: 40 }),
    pos(120,50),
    origin("center"),
    fixed(),
    z(1),
  ])
  const mailBox = add([
    "mailbox",
    rect(10,10),
    color("red"),
    pos(150,150),
    area(),
    solid(),
  ])
  const player = add([
    "player",
    //sprite(),
    rect(30,30),
    pos(150,height()-100),
    area(),
    solid(),
    origin("bot"),
    { "speed": 100 }
  ])
  if (move == true) {
    onKeyDown(["d","right"],() => {
      player.move(player.speed,0)
      //player.flipX(false)
    })
    /* onKeyPress(["d","right"],() => {
      //player.play("run")
    })
  onKeyRelease(["d","right"],() => {
    //player.play("idle")
  }) */
    onKeyDown(["a","left"],() => {
      player.move(-player.speed,0)
      //player.flipX(true)
    })
    /* onKeyPress(["a","left"],() => {
      //player.play("run")
    })
  onKeyRelease(["a","left"],() => {
    //player.play("idle")
  }) */
    onKeyDown(["w","up"],() => {
      player.move(0,-player.speed)
    })
    onKeyDown(["s","down"],() => {
      player.move(0,player.speed)
    })
  }
  onUpdate(() => {
    if (player.pos.x>width()/2) {
      camPos(player.pos.x,height()/2) 
    }
  })
  
})

go("game")
