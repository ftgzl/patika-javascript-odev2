let uncheckedLi = []
let checkedLi = []

let userListDOM = document.querySelector("#list")

/* Önceden girilmiş liste öğelerini local storage'dan çekmek için gereken kodlamalar */
// let taskChecked = localStorage.getItem("task-checked");
// let taskUnChecked = localStorage.getItem("task-unchecked");

// if(taskChecked){
//     let taskCheckedDOM = taskChecked.split(",")
//     taskCheckedDOM.forEach(element => {
//         let liDOM = document.createElement("li")
//         liDOM.innerHTML = `${element}`
//         liDOM.setAttribute("onclick", "checked(this)")
//         liDOM.classList.add("checked")
//         checkedLi.push(liDOM.innerHTML)
//         userListDOM.append(liDOM)
//     });
// }
// if (taskUnChecked){
//     let taskUnCheckedDOM = taskUnChecked.split(",")
//     taskUnCheckedDOM.forEach(element => {
//         let liDOM = document.createElement("li")
//         liDOM.innerHTML = `${element}`
//         liDOM.setAttribute("onclick", "checked(this)")
//         liDOM.classList.add("unchecked")
//         uncheckedLi.push(liDOM.innerHTML)
//         userListDOM.append(liDOM)
//     });
// }

/* Yeni liste öğesi eklemek için gerekli olan kodlamalar*/
let formDom = document.querySelector("#userForm")

formDom.addEventListener("submit", formSubmit)

function formSubmit(event) {
    event.preventDefault()
    let inputDOM = document.querySelector("#task")
    let task = inputDOM.value
    if (task){
        createLiDOM(task)
        inputDOM.value = ""
    }
}

function createLiDOM(TASK){
    let liDOM = document.createElement("li")
    liDOM.innerHTML = `${TASK} <div onclick="remove(this)" class="close">x</div>`
    liDOM.setAttribute("onclick", "checked(this)")
    liDOM.classList.add("unchecked")
    uncheckedLi.push(liDOM.innerHTML)
    userListDOM.append(liDOM)
}

/* Var olan liste öğeleri ile etkilişime geçmek için gereken kodlamalar */

/* Üzerini çizme */
function checked(item) {
    if (item.classList.value == "unchecked"){
        item.classList.value = "checked"
        checkedLi.push(item.innerHTML)
        if (uncheckedLi.includes(item.innerHTML)){
            let itemIndex = uncheckedLi.indexOf(item.innerHTML)
            uncheckedLi.splice(itemIndex, 1)
        }
    }
    else if (item.classList.value== "checked"){
        item.classList.value= "unchecked"
        uncheckedLi.push(item.innerHTML)
        if (checkedLi.includes(item.innerHTML)){
            let itemIndex = checkedLi.indexOf(item.innerHTML)
            checkedLi.splice(itemIndex, 1)
        }
    }
}

/* Öğeyi silme */
function remove(element) {
    event.stopPropagation()
    element.parentNode.parentNode.removeChild(element.parentNode)
    if (uncheckedLi.includes(element.parentNode.innerHTML)){
        let elementIndex = uncheckedLi.indexOf(element.parentNode.innerHTML)
        uncheckedLi.splice(elementIndex, 1)
    }
    else if (checkedLi.includes(element.parentNode.innerHTML)){
        let elementIndex = checkedLi.indexOf(element.parentNode.innerHTML)
        checkedLi.splice(elementIndex, 1)
    };
    removeBug(element)
};

function removeBug(element) {
    if (uncheckedLi.includes(element.parentNode.innerHTML)){
        let elementIndex = checkedLi.length-1
        checkedLi.splice(elementIndex, 1)
    }
    else if (checkedLi.includes(element.parentNode.innerHTML)){
        let elementIndex = uncheckedLi.length-1
        uncheckedLi.splice(elementIndex, 1)
    };
}

/* Liste öğelerinin local storage'a kaydı ve kaydı silme */
function save() {
    let checkedTasks = localStorage.setItem("task-checked", checkedLi)
    let uncheckedTasks = localStorage.setItem("task-unchecked", uncheckedLi)
}

function remSave() {
    localStorage.removeItem("task-checked")
    localStorage.removeItem("task-unchecked")
}

/* Boostrap Toast ayarları */
const option = {
    animation : true,
    delay: 4000 
}

function toasty() {
    let inputDOM = document.querySelector("#task")
    let task = inputDOM.value
    if (task){
        const toastDOM = document.getElementById("Toast-success")
        const toastElement = new bootstrap.Toast(toastDOM, option )
        toastElement.show();
    }
    else {
        const toastDOM = document.getElementById("Toast-fail")
        const toastElement = new bootstrap.Toast(toastDOM, option )
        toastElement.show();
    }
}