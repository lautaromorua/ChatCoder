let socket = io();

let chatBox = document.getElementById('chatBox');
let log = document.getElementById('log');
let user;
Swal.fire({
    title: 'Ingrese su Usuario',
    input: 'email',
    inputPlaceholder: 'Email',
    allowOutsideClick:false,
    inputValidator: (value)=>{
        let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!reg.test(value)){
            return "Ingresa un mail valido";
        }
    }
}).then(result=>{
    user = result.value;
})

chatBox.addEventListener('keyup', evt =>{
    if (evt.key==='Enter'){
        if(chatBox.value.trim().length>0){
            socket.emit('message',{user,message:chatBox.value})
        }
    }
})

socket.on('log', data=>{
    let messages= "";
    let fecha = new Date().toLocaleString();
    data.forEach(log => {
        messages= messages + `${log.user}, a las ${fecha} dice: ${log.message} </br>`
    });
    log.innerHTML= messages;
})
