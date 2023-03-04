const inputText = document.getElementById('inputText');
const inputdate = document.getElementById('inputdate');
const desc = document.getElementById('desc');
const create = document.getElementById('create');
const records = document.getElementById('records');
let userarray = [];
let objstr = localStorage.getItem('user');
let edit_id = null;
if (objstr != null) {

    userarray = JSON.parse(objstr)
}

display();
create.onclick = () => {


    if (inputText.value.trim() === "" || inputdate.value === "" || desc.value.trim() === "") {
        alert("Please fill all the fields");
      } 
      else {



    if (edit_id != null) {
        userarray.splice(edit_id, 1, {
            taskname: inputText.value,
            date: inputdate.value,
            description: desc.value,
        })
    } else {
        userarray.push({
            taskname: inputText.value,
            date: inputdate.value,
            description: desc.value,
        });   
    }
      }
    saveinfo(userarray);
    display();

}




function saveinfo(userarray) {
    localStorage.setItem("user", JSON.stringify(userarray));
}
function display() {
    let statement = ''
    userarray.forEach((user, i) => {
        statement += ` <tr>
    <th scope="row">${i + 1}</th>
    <td>${user.taskname}</td>
    <td>${user.date}</td>
    <td>${user.description}</td>
    <td>
    
    <i class="fa fa-trash-o" style="font-size:24px " onclick='deleteinfo(${i})'></i>    
    <i class="fa fa-edit" style="font-size:24px" onclick='editinfo(${i})' data-toggle="modal" data-target="#myModal" ></i>
       
    </td>
  </tr>`
        inputText.value = "";
        inputdate.value = "";
        desc.value = "";
    });

    records.innerHTML = statement;
}
function deleteinfo(id) {
    userarray.splice(id, 1)
    saveinfo(userarray);
    display();
}

function editinfo(id) {
    edit_id = id;
    inputText.value = userarray[id].taskname;
    inputdate.value = userarray[id].date;
    desc.value = userarray[id].description;

  }
  
