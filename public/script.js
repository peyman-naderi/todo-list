const  btnadd = document.querySelector("#btnadd")
const input = document.querySelector("input")
const main = document.querySelector("#main")
const btnremove = document.querySelector("#btnremove")



todoarray = []
function addnewtodo () {
    if(input.value === ""){
        alert("لطفا چیزی بنویسید و دوباره تلاش کنید")
    }else{
        let inputvalue = input.value
        let newtodo = {
            id : todoarray.length + 1 ,
            title : inputvalue ,
            complate : false,
        }

        input.value = ""
        todoarray.push(newtodo)
        console.log(todoarray);
        creattodo(todoarray)
        input.focus()
        localstorig(todoarray)
    }
}

function creattodo (todofunc){

    let li , p  , btndelete
    main.innerHTML = ""

    todofunc.forEach(function (elem) {
    li = document.createElement("li")
    li.className = "w-[700px] h-[80px] boeder px-4 border-slate-400 bg-slate-800  rounded-lg flex  items-center gap-x-6 ml-auto mr-auto "

    p = document.createElement("p")
    p.className = "text-white mr-auto text-lg"
    p.innerHTML = elem.title
 
    btndelete = document.createElement("button")
    btndelete.className = "bg-red-700 w-32 h-11  border border-red-700 rounded-lg shadow-inner text-white"
    btndelete.innerHTML = "DELETE"
    btndelete.setAttribute("onclick" , 'removeTodo(' + elem.id + ')')

    li.append(p  , btndelete)
    main.append(li)
    }) 
}

function removealltodos (){
    todoarray = []
    creattodo(todoarray)
    localStorage.removeItem("todo")
}

 function removeTodo (todoid){
    let localStorageTodos = JSON.parse(localStorage.getItem('todo'))

    todoarray = localStorageTodos

    let mainTodoIndex = todoarray.findIndex(function (elem) {
        return elem.id === todoid
    })

    todoarray.splice(mainTodoIndex, 1)

    localstorig(todoarray)
    creattodo(todoarray)

}

function localstorig (tudo){
    localStorage.setItem("todo" , JSON.stringify(tudo))
}

function getitemfromlocal (){
    let localstor = localStorage.getItem("todo")

    if(localstor){
        todoarray = JSON.parse(localstor)
    }
    creattodo(todoarray)
}


btnadd.addEventListener("click" , addnewtodo)
btnremove.addEventListener("click" , removealltodos)
window.addEventListener("load" , getitemfromlocal)
