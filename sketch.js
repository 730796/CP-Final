kaboom({
  scale: 1.75,
  background: [185, 235, 227],
})

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
scene("game", () => {
  let level = addLevel(levels[0],levelConfig)
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