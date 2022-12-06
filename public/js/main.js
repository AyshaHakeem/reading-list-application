const form = document.querySelector('form')

form.addEventListener('submit',(e)=>{
    document.querySelectorAll('.class').forEach(field =>{
        field.innerText='';
    })
})

// alert('working')
// console.log('hello from main.js')