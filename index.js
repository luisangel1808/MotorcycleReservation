let list= []
let user = ''

const createObject = (start, end) =>{
    list.push({
        "start":start,
        "end":end,
        "availables":8,
        "used":0,
        "users":[],
    })
}


const createList = ()=>{
    let hourStart=8;
    let minutesStart=0;
    let hourEnd=8;
    let minutesEnd=30;

    for(let i=0; i<24; i++){
        let minutesStartString=`${minutesStart}`;
        let minutesEndString=`${minutesEnd}`;
        if(minutesStartString==='0') minutesStartString='00'
        if(minutesEndString==='0') minutesEndString='00'
        createObject(`${hourStart}:${minutesStartString}`, `${hourEnd}:${minutesEndString}`)
        if (minutesStart===0) {
            minutesStart=30
            minutesEnd=0
            hourEnd++
        }
        else{
            minutesStart=0
            hourStart++
            minutesEnd=30
        }
    }
}



showElement = ()=>{
    list.map((element, index)=>{
    showBox(element,index)
    })
}
const showBox = (element, index) =>{
    const main = document.querySelector('.main');
    const box = document.createElement('div')
    const button = document.createElement('button');
    button.type='button'
    button.innerText='Reservar moto';
    button.onclick = () =>{
        if (user) {
            if(element.users.includes(user)){
                element.availables++
                element.users.splice(element.users.indexOf(user),1)
                updateLess(index)
            }
            else{
                if((element.availables>0)){
                    element.availables--
                    element.users.push(user)
                    updateMore(index)
                }
                else alert(`Lo siento ${user}, no hay motos disponibles en este horario`)
            }
        }
        else{
            alert(`Debes ingresar para poder reservar`)
        }



    }
    box.classList.add('box')
    const schedule = document.createElement('p')
    const available = document.createElement('p')
    available.setAttribute('id',index)
    schedule.innerText=`${element.start} - ${element.end}`
    available.innerText=`Disponibles: ${element.availables}`
    box.appendChild(schedule)
    box.appendChild(available)
    box.appendChild(button)
    main.appendChild(box)
}

const updateMore = (index)=>{    
    const availables = document.getElementById(index)
    availables.innerHTML=`Disponibles: ${list[index].availables}`;
    availables.parentNode.classList.remove('box--red')
    availables.parentNode.classList.add('box--green')
}

const updateLess = (index)=>{    
    const availables = document.getElementById(index)
    availables.innerHTML=`Disponibles: ${list[index].availables}`;
    availables.parentNode.classList.remove('box--green')
    if(list[index].availables===0){
        availables.parentNode.classList.add('box--red')
    }
}

const colorBox = ()=>{    
    list.map((element, index)=>{
        element.users.includes(user)
        ?updateMore(index)
        :updateLess(index)
        })
}

const saveName = ()=>{
    user=document.getElementById('user').value
    const nameUser = document.getElementById('user__name')
    nameUser.innerText = `Usuario: ${user}`
    const buttonUser = document.getElementById('user__button')
    buttonUser.innerText = 'Cambiar de usuario'
    colorBox()
}

createList()
showElement()
