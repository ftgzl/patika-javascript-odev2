const addBtnDOM = document.getElementById("liveToastBtn")
const ulDOM = document.getElementById("list")

console.log(ulDOM);

function newElement() {
  let inputValue = document.getElementById("task").value
  if(inputValue != "" && inputValue != " "){
    const li = document.createElement('LI')
    li.innerHTML = inputValue;
    ulDOM.appendChild(li);
    inputValue.innerHTML = "";
    $('#liveToast').toast('show')
  }else{
    $('#element').toast('show')
  }

}

function deleteToDo() {
  
}


function markAsDone() {
  
}