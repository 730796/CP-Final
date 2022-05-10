kaboom({
  scale: 3,
  background: [185, 235, 227],
})

loadSprite("mail","mail.png") 
/* https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fimage-vector%2Fenvelope-pixel-art-style-icon-isolated-760894363&psig=AOvVaw2uo_NTRaT200GsHqPubK3u&ust=1651675929553000&source=images&cd=vfe&ved=2ahUKEwj6keW5ysP3AhUOC80KHde1CC8Qr4kDegUIARDwAQ */ //Image Credits
loadSprite("arrows","arrows.png")
loadSprite("clickL","mouseClickL.png")
loadSprite("wasd","wasd.png")
/* https://www.google.com/url?sa=i&url=https%3A%2F%2Fegordorichev.itch.io%2Fkey-set&psig=AOvVaw3jcCql48NjbPCr-drE1WhN&ust=1651845757795000&source=images&cd=vfe&ved=0CA0QjhxqFwoTCMielLfDyPcCFQAAAAAdAAAAABAI */

const levelConfig = {
  width: 16,
  height: 16,
  pos: vec2(0,0),
  "s": () => [
    "start",
    rect(2,2),
    color(rgb(187,183,240)),
    origin("center"),
    opacity(0.5),
    area(),
  ],
  "r": () => [
    "road",
    //sprite(""),
    rect(20,20),
    color( rgb(112,67,35)),
    area(),
  ],
  "t": () => [
    "tree",
    //sprite(),
    rect(20,20),
    color( rgb(28,117,31)),
    area(),
    solid(),
  ],
  "b": () => [
    "mailBox",
    //sprite(""),
    rect(15,15),
    color(rgb(240,74,74)),
    origin("center"),
    area(),
    solid(),
  ],
  
}
const levels = [
  [
    //start
    "tb    b            ",
    "t                  ",
    "t        rr      rr",
    "t        rr       ",
    "t        rr       ",
    "t        rr       ",
    "t        rr        ",
    "t                  ",
    "t         s",
    "t",
    "t",
    "t",
    "t",
    "t",
    "tttttttttttttttttttttt",
    "tttttttttttttttttttttt",
    "tttttttttttttttttttttt",
  ],
  [
    //town
    "",
    "",
    "",
    "",
    "",
  ],
]


let mail = 5

scene("menu", () => {
  add([
    "title",
    text("delivery",{
      size: 40
    }),
    origin("center"),
    pos(width()/2,height()/2-50),
    area(),
  ])
  add([
    "play",
    text("PLAY",{
      size: 33
    }),
    pos(width()/2,height()/2-6),
    origin("center"),
    area(),
  ])
  onClick("play",() => {
    go("game")
  })
  add([
    "resume",
    text("resume",{
      size: 15}),
    pos(width()/2,height()/2+20),
    origin("center"),
    area(),
  ])
  onClick("resume",() => {
    mail = localStorage.getItem("mail")
    go("game")
  })
  add([
    "controls",
    text("controls",{
      size: 15}),
    pos(width()/2,height()/2+35),
    origin("center"),
    area(),
  ])
  onClick("controls",() => {
    go("controls")
  })
})
scene("controls", () => {
  add([
    "menuBtn",
    text("menu",{
      size: 20 }),
    pos(15,10),
    area(),
  ])
  onClick("menuBtn",() => {
    go("menu")
  })
  add([
    "wasd",
    sprite("wasd",{
      width: 75,
      height: 55,
    }),
    pos(width()/2-75,height()/2-50),
    origin("center"),
    area(),
  ])
  add([
    "arrows",
    sprite("arrows",{
      width: 80,
      height: 55,
    }),
    pos(width()/2+75,height()/2-50),
    origin("center"),
    area(),
  ])
  add([
    "or",
    text("or",{
      size:20 }),
    pos(width()/2,height()/2-50),
    origin("center"),
  ])
  add([
    "clickL",
    sprite("clickL",{
      width: 35,
      height: 50,
    }),
    pos(width()/2-75,height()/2+50),
    origin("center"),
    area(),
  ])
  add([
    "toInteract",
    text("to interact",{
      size: 20
    }),
    pos(width()/2+30,height()/2+50),
    origin("center"),
    area(),
  ])
})
scene("game", () => {
  let level = addLevel(levels[0],levelConfig)
  const player = add([
    "player",
    //sprite(),
    rect(17,17),
    pos(150,height()-100),
    area(),
    solid(),
    origin("center"),
    { "speed": 100 }
  ])
  onUpdate("start",(s) => {
    player.pos = s.pos
  })
  let move = true
  const mailBoxC = add([
    "mailBoxC",
    rect(15,15),
    pos(0,0),
    opacity(0.5),
    origin("center"),
    area(),
  ])
  onUpdate("mailBox",(b) => {
    mailBoxC.pos = b.pos
  })
  const letter = add([
    "letter",
    sprite("mail",{
      width: 50,
      height: 50,
    }),
    pos(40,25),
    origin("center"),
    z(1),
    fixed(),
  ])
  let mailCounter = add([
    "mailCounter",
    text("x" + mail,{
      size: 20 }),
    pos(60,25),
    origin("left"),
    fixed(),
    z(1),
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
  else 
    onKeyDown(["d","right"],() => {
      player.move(0,0)
    })
    onKeyDown(["a","left"],() => {
      player.move(0,0)
    })
    onKeyDown(["w","up"],() => {
      player.move(0,0)
    })
    onKeyDown(["s","down"],() => {
      player.move(0,0)
    })
  onUpdate(() => {
    //camPos(player.pos)
    if (player.pos.y<height()/2+25)
    camPos(player.pos.x,player.pos.y-25) 
  })
  onClick("mailBoxC", () => {
    mail -= 1
    mailCounter.text = "x"+mail
    destroy(mailBoxC)
    localStorage.setItem("mail",mail)
  })
  onClick("test", () => {
    mail = localStorage.getItem("mail")
  }) 
  
  //pause stuff
  add([
    "pause",
    //sprite(),
    rect(10,10),
    pos(100,50),
    origin("center"),
    fixed(),
    area(),
    z(1),
  ])
  onClick("pause",() => {
  add([
      "pauseScr",
      rect(width()-200,height()-70),
      pos(100,35),
      //origin("top"),
      fixed(),
      opacity(0.5),
      z(2),
    ])
    console.log("lol")
    move = false
  })
})

go("game")
