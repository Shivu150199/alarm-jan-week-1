'use strict';

let currentTimeContainer = document.querySelector('.current-time-container')

let newTimerId = 1
let audio;

//create time up function//
function createTimeUp(beforeThis) {
  const element = document.createElement('div')
    element.classList.add('timeup-container')
    element.innerHTML = `  <div></div>
            <p>Time Is Up!</p>
            <button class="btn delete-btn" onclick="deleteCard(this)">delete</button>`
  currentTimeContainer.insertBefore(element, beforeThis)
}
//deleteCard//
function deleteCard(target) {
  target.parentNode.remove()
  let noTimer = document.querySelector('.alert')
  if(currentTimeContainer.children.length===0){
    noTimer.classList.remove('show')
  }
  if (noTimer.nextSibling.nextSibling == null) {
    noTimer.classList.remove('show')
  }
}

document.querySelector('.settime').addEventListener('click', (event) => {
  let h = parseInt(hh.value)
  let m = parseInt(mm.value)
  let s = parseInt(ss.value)

  let totalTime = h * 3600 + m * 60 + s

  createNewTimer(totalTime)
  setToDefault();
})
//create NewTimer//
function createNewTimer(totalTime) {
  let h = Math.floor(totalTime / 3600)
  let m = Math.floor((totalTime % 3600) / 60)
  let s = Math.floor((totalTime % 3600) % 60)


  
  const element = document.createElement('div')
   
    element.classList.add('time-left-container')
    element.id=(newTimerId++)+"";
    element.innerHTML = `<div class="time-left-label">time left :</div>
            <div class="left-time">
              <div class="hh">${h < 10 ? '0' + h : h}</div>
        <span class="sep">:</span>
        <div class="mm">${m < 10 ? '0' + m : m}</div>
        <span class="sep">:</span>
        <div class="ss">${s < 10 ? '0' + s : s}</div>
            </div>
            <button class="btn stop-btn" onclick="deleteCard(this)">stop</button>`

  currentTimeContainer.append(element)

  let noTimer = document.querySelector('.alert')
  if (getComputedStyle(noTimer).display != 'none') {
    noTimer.classList.add('show')
  }

  startTimer(totalTime, element)
}

//timer function//

function startTimer(totalTime, thisCard) {
  let hr = thisCard.querySelector('.hh')
  let min = thisCard.querySelector('.mm')
  let sec = thisCard.querySelector('.ss')

  let intervalId = setInterval(() => {
    if (document.getElementById(thisCard.id) == null) {
      clearInterval(intervalId)
      return
    }
    console.log(hr.innerText, min.innerText, sec.innerText)
    totalTime--

    let h = Math.floor(totalTime / 3600)
    let m = Math.floor((totalTime % 3600) / 60)
    let s = Math.floor((totalTime % 3600) % 60)

    hr.innerText = h < 10 ? '0' + h : h
    min.innerText = m < 10 ? '0' + m : m
    sec.innerText = s < 10 ? '0' + s : s

    if (totalTime < 0) {
      try {
       
        createTimeUp(thisCard)
        thisCard.remove()
      } catch (error) {}
      clearInterval(intervalId)
       audio = new Audio('alarm.mp3')
       audio.play()
    }
  }, 1000)
}


//set to default function//

function setToDefault(){
hh.value='00'
mm.value='00'
ss.value='00'
}




