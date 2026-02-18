const inputBox = document.getElementById("input-box");
const inputbtn = document.getElementById("input_btn");
const listContainer = document.getElementById("list-container");
inputBox.addEventListener('keypress',function(e){
    if(e.key === "Enter"){
        inputbtn.click();
    }

})
function AddTask() {
    if(inputBox.value === "") {
        alert("No Tasks Added");
    } else {


        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let bin = document.createElement("span");
        bin.innerHTML = "❌";
        li.appendChild(bin);
    }
    inputBox.value = "";
    saveData();
}

// Move this OUTSIDE the function so it only runs once
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);


function saveData(){
    localStorage.setItem("data",listContainer.innerHTML)
}
function getData(){
    listContainer.innerHTML = localStorage.getItem("data");

}

getData();