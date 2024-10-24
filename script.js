
/*let color=document.getElementById('color');
let createbtn=document.getElementById('createbtn');
let list=document.getElementById('list');

createbtn.onclick=()=>{
    let newNote=document.createElement('div');
    newNote.classList.add('note');
    newNote.innerHTML=`<span class="close">x</span>
                <textarea placeholder="write something here...."
                    rows="10" cols="30"></textarea>`;
    newNote.style.borderColor=color.value;
    list.appendChild(newNote);
}
document.addEventListener('click',(event)=>{
    if(event.target.classList.contains('close')){
        event.target.parentNode.remove();
    }
})
//drag and drop part
let cursor={
    x:null,
    y:null
}
let note={
    dom:null,
    x:null,
    y:null
}
document.addEventListener('touchstart',(event)=>{
    if(event.target.classList.contains('note')){
        cursor={
            x:event.clientX,
            y:event.clientY
        }
        note={
            dom: event.target,
            x: event.target.getBoundingClientRect().left,
            y: event.target.getBoundingClientRect().top
        }
    }
})
document.addEventListener('touchmove',(event)=>{
    if(note.dom==null) return;
    let currentCursor={
        x: event.clientX,
        y: event.clientY
    }
    let distance={
        x:currentCursor.x-cursor.x,
        y:currentCursor.y-cursor.y
    }
    note.dom.style.left=(note.x+distance.x)+'px';
    note.dom.style.top=(note.y+distance.y)+'px';
    note.dom.style.cursor='grab';
})
document.addEventListener('touchend',(event)=>{
    if(note.dom==null) return;
    
    note.dom.style.cursor='auto';
    note.dom=null;
})*/
let color = document.getElementById('color');
let createbtn = document.getElementById('createbtn');
let list = document.getElementById('list');

createbtn.onclick = () => {
    let newNote = document.createElement('div');
    newNote.classList.add('note');
    newNote.innerHTML = `<span class="close">x</span>
                <textarea placeholder="write something here...."
                    rows="7" cols="20"></textarea>`;
    newNote.style.borderColor = color.value;
    newNote.style.position = 'absolute'; // Ensure the notes are draggable
    list.appendChild(newNote);
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('close')) {
        event.target.parentNode.remove();
    }
});

// Drag and drop part
let cursor = {
    x: null,
    y: null
};
let note = {
    dom: null,
    x: null,
    y: null
};

// Helper function for both mouse and touch events
function startDragging(event) {
    const isTouch = event.type === 'touchstart';
    const target = isTouch ? event.touches[0] : event;
    if (event.target.classList.contains('note')) {
        cursor = {
            x: target.clientX,
            y: target.clientY
        };
        note = {
            dom: event.target,
            x: event.target.getBoundingClientRect().left,
            y: event.target.getBoundingClientRect().top
        };
    }
}

function moveDragging(event) {
    const isTouch = event.type === 'touchmove';
    const target = isTouch ? event.touches[0] : event;

    if (note.dom == null) return;

    let currentCursor = {
        x: target.clientX,
        y: target.clientY
    };
    let distance = {
        x: currentCursor.x - cursor.x,
        y: currentCursor.y - cursor.y
    };
    note.dom.style.left = (note.x + distance.x) + 'px';
    note.dom.style.top = (note.y + distance.y) + 'px';
    note.dom.style.cursor = 'grab';

    if (isTouch) {
        event.preventDefault(); // Prevent scrolling while dragging on mobile
    }
}

function stopDragging() {
    if (note.dom == null) return;
    
    note.dom.style.cursor = 'auto';
    note.dom = null;
}

// Mouse events
document.addEventListener('mousedown', startDragging);
document.addEventListener('mousemove', moveDragging);
document.addEventListener('mouseup', stopDragging);

// Touch events for mobile support
document.addEventListener('touchstart', startDragging);
document.addEventListener('touchmove', moveDragging);
document.addEventListener('touchend', stopDragging);
