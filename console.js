!function(){"use strict";class t{constructor(){this.online=!1,this.ctx1=document.getElementById("canvas1").getContext("2d"),this.ctx2=document.getElementById("canvas2").getContext("2d"),this.ctx3=document.getElementById("canvas3").getContext("2d"),this.ctx4=document.getElementById("canvas4").getContext("2d"),this.x=0,this.y=0,this.velX=0,this.velY=0,this.health=100,this.speed=1}draw(){this.ctx1.fillStyle="gold",this.ctx1.fillRect(this.x,this.y,50,50),this.ctx1.stroke(),this.ctx2.fillStyle="gold",this.ctx2.fillRect(this.x,this.y,50,50),this.ctx2.stroke(),this.ctx3.fillStyle="gold",this.ctx3.fillRect(this.x,this.y,50,50),this.ctx3.stroke(),this.ctx4.fillStyle="gold",this.ctx4.fillRect(this.x,this.y,50,50),this.ctx4.stroke()}update(){this.x+=this.velX*this.speed,this.y+=this.velY*this.speed}}class e{constructor(){this.ctx1=document.getElementById("canvas1").getContext("2d"),this.ctx2=document.getElementById("canvas2").getContext("2d"),this.ctx3=document.getElementById("canvas3").getContext("2d"),this.ctx4=document.getElementById("canvas4").getContext("2d"),this.x=0,this.y=0,this.velX=0,this.velY=0,this.img=document.getElementById("cursor")}draw(){this.ctx1.drawImage(this.img,this.x,this.y),this.ctx2.drawImage(this.img,this.x,this.y),this.ctx3.drawImage(this.img,this.x,this.y),this.ctx4.drawImage(this.img,this.x,this.y)}update(){this.x+=1.5*this.velX,this.y+=1.5*this.velY}}class i{constructor(t,e,i,n){this.ctx1=document.getElementById("canvas1").getContext("2d"),this.ctx2=document.getElementById("canvas2").getContext("2d"),this.ctx3=document.getElementById("canvas3").getContext("2d"),this.ctx4=document.getElementById("canvas4").getContext("2d"),this.x=t,this.y=e,this.dirX=i,this.dirY=n,this.life=3}draw(){this.ctx1.fillRect(this.x,this.y,20,20),this.ctx2.fillRect(this.x,this.y,20,20),this.ctx3.fillRect(this.x,this.y,20,20),this.ctx4.fillRect(this.x,this.y,20,20)}update(){this.x+=this.dirX/3,this.y+=this.dirY/3}}class n{constructor(t,e){e=e||{},this.distance=1e3,this.lookat=[0,0],this.context=t,this.fieldOfView=e.fieldOfView||Math.PI/4,this.viewport={left:0,right:0,top:0,bottom:0,width:0,height:0,scale:[1,1]},this.update()}begin(){this.context.save(),this.applyScale(),this.applyTranslation()}end(){this.context.restore()}applyScale(){this.context.scale(this.viewport.scale[0],this.viewport.scale[1])}applyTranslation(){this.context.translate(-this.viewport.left,-this.viewport.top)}update(){this.aspectRatio=this.context.canvas.width/this.context.canvas.height,this.viewport.width=this.distance*Math.tan(this.fieldOfView),this.viewport.height=this.viewport.width/this.aspectRatio,this.viewport.left=this.lookat[0]-this.viewport.width/2,this.viewport.top=this.lookat[1]-this.viewport.height/2,this.viewport.right=this.viewport.left+this.viewport.width,this.viewport.bottom=this.viewport.top+this.viewport.height,this.viewport.scale[0]=this.context.canvas.width/this.viewport.width,this.viewport.scale[1]=this.context.canvas.height/this.viewport.height}zoomTo(t){this.distance=t,this.update()}moveTo(t,e){this.lookat[0]=t,this.lookat[1]=e,this.update()}screenToWorld(t,e,i){return(i=i||{}).x=t/this.viewport.scale[0]+this.viewport.left,i.y=e/this.viewport.scale[1]+this.viewport.top,i}worldToScreen(t,e,i){return(i=i||{}).x=(t-this.viewport.left)*this.viewport.scale[0],i.y=(e-this.viewport.top)*this.viewport.scale[1],i}}class s{constructor(){this.x=0,this.y=0,this.ctx1=document.getElementById("canvas1").getContext("2d"),this.ctx2=document.getElementById("canvas2").getContext("2d"),this.ctx3=document.getElementById("canvas3").getContext("2d"),this.ctx4=document.getElementById("canvas4").getContext("2d"),this.velX=0,this.velY=0,this.health=100}draw(){this.ctx1.fillStyle="red",this.ctx1.fillRect(this.x,this.y,50,50),this.ctx2.fillStyle="red",this.ctx2.fillRect(this.x,this.y,50,50),this.ctx3.fillStyle="red",this.ctx3.fillRect(this.x,this.y,50,50),this.ctx4.fillStyle="red",this.ctx4.fillRect(this.x,this.y,50,50)}update(){this.x+=this.velX,this.y+=this.velY}moveTo(t,e){var i=t-this.x,n=e-this.y,s=Math.sqrt(i*i+n*n);s&&(i/=s,n/=s),this.x+=1*i,this.y+=1*n}getClosestPlayer(t){let e=null,i={x:0,y:0};for(let n of t)if(n.online)if(null==e)e=Math.sqrt(n.x-this.x^n.y-this.y+2^2),i.x=n.x,i.y=n.y;else{let t=Math.sqrt(n.x-this.x^n.y-this.y+2^2);t<e&&(e=t,i.x=n.x,i.y=n.y)}return i}}let h=new class{constructor(){this.buttons=["button_1","button_2","button_3","button_4","shoulder_top_left","shoulder_top_right","shoulder_bottom_left","shoulder_bottom_right","select","start","stick_button_left","stick_button_right","stick_axis_left","stick_axis_right","d_pad_up","d_pad_down","d_pad_left","d_pad_right","vendor"],this.activeButtons={button_1:!1,button_2:!1,button_3:!1,button_4:!1,shoulder_top_left:!1,shoulder_top_right:!1,shoulder_bottom_left:!1,shoulder_bottom_right:!1,select:!1,start:!1,stick_button_left:!1,stick_button_right:!1,stick_axis_left:!1,stick_axis_right:!1,d_pad_up:!1,d_pad_down:!1,d_pad_left:!1,d_pad_right:!1,vendor:!1}}},o=new Gamepad,l=document.getElementById("canvas1"),d=document.getElementById("canvas2"),a=document.getElementById("canvas3"),r=document.getElementById("canvas4");l.style.display="none",d.style.display="none",a.style.display="none",r.style.display="none";let c=new n(l.getContext("2d")),w=new n(d.getContext("2d")),x=new n(a.getContext("2d")),y=new n(r.getContext("2d")),g=[],p=[],u=[],v=[];function f(){l.getContext("2d").clearRect(0,0,window.innerWidth,window.innerHeight),d.getContext("2d").clearRect(0,0,window.innerWidth,window.innerHeight),a.getContext("2d").clearRect(0,0,window.innerWidth,window.innerHeight),r.getContext("2d").clearRect(0,0,window.innerWidth,window.innerHeight),l.getContext("2d").fillRect(0,0,window.innerWidth,window.innerHeight),l.getContext("2d").fillStyle="white",d.getContext("2d").fillRect(0,0,window.innerWidth,window.innerHeight),d.getContext("2d").fillStyle="silver",a.getContext("2d").fillRect(0,0,window.innerWidth,window.innerHeight),a.getContext("2d").fillStyle="teal",r.getContext("2d").fillRect(0,0,window.innerWidth,window.innerHeight),r.getContext("2d").fillStyle="navy",c.begin(),w.begin(),x.begin(),y.begin();for(let t of g)t.online&&(t.update(),t.draw());c.moveTo(g[0].x,g[0].y),w.moveTo(g[1].x,g[1].y),x.moveTo(g[2].x,g[2].y),y.moveTo(g[3].x,g[3].y);for(let t of p)t.online&&(t.update(),t.draw());for(let t of u)t.life>0&&(t.update(),t.draw());for(let t of v){let e=t.getClosestPlayer(g);console.log(e),t.moveTo(e.x,e.y),t.draw()}c.end(),w.end(),x.end(),y.end(),requestAnimationFrame(f)}function m(){requestAnimationFrame(m)}function _(){let t=0;for(let e in g)g[e].online&&t++;switch(t){case 1:l.style.display="block",d.style.display="none",a.style.display="none",r.style.display="none",l.width=window.innerWidth,l.height=window.innerHeight;break;case 2:d.style.display="block",a.style.display="none",r.style.display="none",l.width=window.innerWidth/2,l.height=window.innerHeight,d.width=window.innerWidth/2,d.height=window.innerHeight,d.style.right="0px";break;case 3:a.style.display="block",r.style.display="none",l.width=window.innerWidth/2,l.height=window.innerHeight/2,d.width=window.innerWidth/2,d.height=window.innerHeight/2,d.style.right="0px",a.width=window.innerWidth/2,a.height=window.innerHeight/2,a.style.left="0px",a.style.bottom="0px";break;case 4:r.style.display="block",l.width=window.innerWidth/2,l.height=window.innerHeight/2,d.width=window.innerWidth/2,d.height=window.innerHeight/2,d.style.right="0px",d.style.top="0px",a.width=window.innerWidth/2,a.height=window.innerHeight/2,d.style.left="0px",d.style.bottom="0px",r.width=window.innerWidth/2,r.height=window.innerHeight/2,d.style.right="0px",d.style.bottom="0px"}}function b(){let t=new s;v.push(t),console.log(`Monsters active: ${v.length}`),console.log(v)}window.onload=()=>{!function(){l.width=window.innerWidth,l.height=window.innerHeight,d.width=window.innerWidth,d.height=window.innerHeight,a.width=window.innerWidth,a.height=window.innerHeight,r.width=window.innerWidth,r.height=window.innerHeight,g.push(new t),g.push(new t),g.push(new t),g.push(new t),p.push(new e),p.push(new e),p.push(new e),p.push(new e),o.on("connect",t=>{g[t.index].online=!0,p[t.index].online=!0,console.log(`Controller ${t.index+1} has been connected`),_()}),o.on("disconnect",t=>{g[t.index].online=!1,p[t.index].online=!1,console.log(`Controller ${t.index+1} has been disconnected`),_()});for(let t in h.buttons){let e=h.buttons[t];o.on("press",e,t=>{g[t.player].online&&("button_1"==e&&(g[t.player].speed=2.5),"shoulder_bottom_right"==e&&u.push(new i(g[t.player].x,g[t.player].y,p[t.player].x-g[t.player].x,p[t.player].y-g[t.player].y)),t.value&&("stick_axis_left"==e?(g[t.player].velX=Math.round(t.value[0]),g[t.player].velY=Math.round(t.value[1])):"stick_axis_right"==e&&(p[t.player].velX=Math.round(t.value[0]),p[t.player].velY=Math.round(t.value[1]))))}),o.on("hold",e,t=>{g[t.player].online&&("button_1"==e&&(g[t.player].speed=2.5),"shoulder_bottom_right"==e&&u.push(new i(g[t.player].x,g[t.player].y,p[t.player].x-g[t.player].x,p[t.player].y-g[t.player].y)),t.value&&("stick_axis_left"==e?(g[t.player].velX=Math.round(t.value[0]),g[t.player].velY=Math.round(t.value[1])):"stick_axis_right"==e&&(p[t.player].velX=Math.round(t.value[0]),p[t.player].velY=Math.round(t.value[1]))))}),o.on("release",e,t=>{g[t.player].online&&("button_1"==e&&(g[t.player].speed=1),t.value&&("stick_axis_left"==e?(g[t.player].velX=Math.round(t.value[0]),g[t.player].velY=Math.round(t.value[1])):"stick_axis_right"==e&&(p[t.player].velX=Math.round(t.value[0]),p[t.player].velY=Math.round(t.value[1]))))})}b(),setInterval(b,3e4),setInterval(()=>{for(let t of u)t.life--},1e3),requestAnimationFrame(f),requestAnimationFrame(m)}()},window.onresize=()=>{l.width=window.innerWidth,l.height=window.innerHeight,d.width=window.innerWidth,d.height=window.innerHeight,a.width=window.innerWidth,a.height=window.innerHeight,r.width=window.innerWidth,r.height=window.innerHeight,c.update(),w.update(),x.update(),y.update(),_()}}();