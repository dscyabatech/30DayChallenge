const check=(e)=>{
    if (e.keyCode == 13){
        addTodo();
    }
}
//adding todo on enter press

const addTodo=()=>{
    let todoCont = document.getElementById('todo__task--container');
    let userInput=document.getElementsByClassName('todo__add--input')[0].value;
    if(/[A-Za-z0-9!@#/./$%/^/&/,/_/=/+/(/)/{/}<>]/.test(userInput)!=false){
        document.getElementsByClassName('todo__add--input')[0].classList.remove('todo__add--input-error')
        let newTask=document.createElement('div');
        newTask.classList.add('todo__task');
        let userinputNode=document.createTextNode(`${userInput}`);
        newTask.appendChild(userinputNode);
        todoCont.appendChild(newTask)
        attachEvents(newTask);//add event listeners to the new todo elements
    }else{
        document.getElementsByClassName('todo__add--input')[0].classList.add('todo__add--input-error');
    };
    document.getElementsByClassName('todo__add--input')[0].value='';
}

let addTask=document.getElementById("todo__add--button")
addTask.addEventListener('click',()=>{
    addTodo();
})
//adding todos

let txtField = document.getElementsByClassName('todo__add--input')[0]
document.addEventListener("keydown", check);

const displayDate=()=>{
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
let d= new Date;
let dHours=d.getHours();
if(dHours<10){
    dHours='0'+dHours;
}
let dMinutes=d.getMinutes();
if(dMinutes<10){
    dMinutes='0'+dMinutes;
}
let dSeconds=d.getSeconds();
if(dSeconds<10){
    dSeconds='0'+dSeconds;
}
let dDay=d.getDay();
let dMonth=d.getMonth();
let dayte= `${monthNames[dMonth]} ${dDay}`
let time = `${dHours}:${dMinutes}:${dSeconds}`
document.getElementsByClassName("nav__date--time")[0].innerHTML=time;
document.getElementsByClassName("nav__date--day")[0].innerHTML=dayte;
}
setInterval(displayDate,1000);
//date display

let todoarr = document.getElementsByClassName('todo__task');
const parent = document.getElementById('todo__task--container');

const todoComplete= el => {
    el.classList.toggle('todo__task--complete'); 
}
//toggle for task completion

function attachEvents(el) {
    el.addEventListener("click", function() {
        todoComplete(this);
    });
    el.addEventListener("dblclick", function() {
        parent.removeChild(this);
    });
}
//click and double click events

for (let i = 0; i < todoarr.length; i++){
    const el = todoarr[i];
    attachEvents(el);
}    
/*run through all todo elements and add the click and 
double click event listeners
*/




