//First animation
setTimeout(()=>{
    $('#in-parteD').addClass('depois')
},500)

//Veryfying | Making validation

let nameLength = 0
let passwordLength = 0

$('#FloatingInput').on('blur',()=>{
    nameLength = document.getElementById('FloatingInput').value.length
    if(nameLength !== 0 & passwordLength !==0){
        $('#btn-registro').animate({
            opacity:1
        })
       }else{
        $('#btn-registro').animate({
            opacity:0
        })
       }
})

$('#FloatingInput2').on('keypress',()=>{
   passwordLength =  document.getElementById('FloatingInput2').value.length

   if(nameLength !== 0 & passwordLength !==0){
    $('#btn-registro').animate({
        opacity:1
    })
   }else{
    $('#btn-registro').animate({
        opacity:0
    })
   }

})
