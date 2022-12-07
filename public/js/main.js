const form = document.querySelector('form')
const deleteBtn = document.querySelectorAll('.fa-trash')
form.addEventListener('submit',()=>{
    document.querySelectorAll('.class').forEach(field =>{
        field.innerText='';
    })
})

deleteBtn.forEach(btn=>{
    btn.addEventListener('click', deleteBook)
})

async function deleteBook(e){
   let book = this.parentNode.childNodes[1].innerText
   await fetch('/deleteBook', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ 
        'bookName' : book
      })
    })
      .then(res=>{
        if (res.ok)  {
          return res.json()
        }else{
          console.error(res.statusText)
        }
        })
      .then(data => {
        window.location.reload()
      })
      .catch(err=>{
        console.error(err)
      })
}
  