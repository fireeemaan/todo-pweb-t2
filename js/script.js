document.addEventListener("DOMContentLoaded", loadData);

function loadData() {
   const data = getData();
   const table = document.getElementById("table-body");
   table.innerHTML = "";

   data.forEach((todo, index) => {
      const row = table.insertRow();

      const indexCell = row.insertCell(0);
      indexCell.textContent = index + 1;

      const activityCell = row.insertCell(1);
      activityCell.textContent = todo.activity;

      const dueCell = row.insertCell(2);
      dueCell.textContent = todo.dueDate;

      const statusCell = row.insertCell(3);
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "cbx-status";
      checkbox.checked = todo.status;
      checkbox.onchange = () => {
         updateStatus(index, checkbox.checked);
      };
      statusCell.appendChild(checkbox);

      const deleteCell = row.insertCell(4);
      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
      deleteBtn.className = "btn-delete";
      deleteBtn.onclick = () => {
         deleteData(index);
      };
      deleteCell.appendChild(deleteBtn);
   });
}

function addData() {
   const activityField = document.getElementById("activity-field").value.trim();
   const dueDateField = document.getElementById("date-field").value;

   // console.log(activityField, dueDateField);

   if (activityField === "" || dueDateField === "") {
      alert("Activity and Due Date are required!");
      return;
   }

   const data = getData();

   data.push({
      activity: activityField,
      dueDate: dueDateField,
      status: false,
   });

   saveData(data);

   document.getElementById("activity-field").value = "";
   document.getElementById("date-field").value = "";

   loadData();
}

function updateStatus(index, status) {
   const data = getData();
   data[index].status = status;
   saveData(data);
   loadData();
}

function deleteData(index) {
   const data = getData();
   data.splice(index, 1);
   saveData(data);
   loadData();
}

function saveData(data) {
   localStorage.setItem("data", JSON.stringify(data));
}

function getData() {
   return JSON.parse(localStorage.getItem("data")) || [];
}
