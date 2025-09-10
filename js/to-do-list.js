window.onload = function() {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "login.html";
    }
    logoHome.click();
    renderToday();  
    renderUpcoming();
    renderTasks();
};

document.getElementById("logout-btn").addEventListener("click", function() {
  localStorage.removeItem("loggedIn"); 
  alert("Bạn đã đăng xuất!");
  window.location.href = "login.html";
});

// Ẩn sidebar
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggle-sidebar");
const logoHome = document.getElementById("nodeHome");
const body = document.body;
const content = document.getElementById("content");


function toggleSidebar () {
    sidebar.classList.toggle("hidden");
    body.classList.toggle("sidebar-hidden");
}


toggleBtn.addEventListener('click',toggleSidebar);
// Node Home
logoHome.addEventListener('click',function() {
    for(var i=0;i<contentItems.length;i++) {
        contentItems[i].style.display='none'
    }
    var homeDiv = document.getElementById('home');
    homeDiv.style.display = 'flex';
});

// Active option
var menuItems = document.querySelectorAll('#sidebar ul li');

for(var i=0;i < menuItems.length;i++) {
    menuItems[i].addEventListener('click', function() {
        for(var j=0;j<menuItems.length;j++) {
            menuItems[j].classList.remove('active')
        }
        this.classList.add('active')
    })
}


const contentItems = document.querySelectorAll('.content-item');

//Node today
const todayBtn = document.getElementById("node-today");
let todayDiv = document.getElementById('today');

//Node upcoming
const upcomingBtn = document.getElementById("node-upcoming");
let upcomingDiv = document.getElementById('upcoming');

//Node complete
const completeBtn = document.getElementById("node-completed");
let completeDiv = document.getElementById('completed');

function nodeBtn(divShow) {
      for(let i=0;i<contentItems.length;i++) {
        contentItems[i].style.display = 'none';
    }
    divShow.style.display='flex';
}

todayBtn.addEventListener('click',function() {
    nodeBtn(todayDiv)
})

upcomingBtn.addEventListener('click',function() {
    nodeBtn(upcomingDiv)
})

completeBtn.addEventListener('click',function() {
    nodeBtn(completeDiv)
})


//Add task
const showFormBtn = document.getElementById('node-add-task');
const showFormBtn2 = document.getElementById('add-task-second');

const cancelTaskBtn = document.getElementById('cancel-task-btn');
var addTaskDiv = document.getElementById('addTask');


function showAddTask() {
    addTaskDiv.classList.add('popup');
    addTaskDiv.style.display='flex'
}

showFormBtn.addEventListener('click',showAddTask);
showFormBtn2.addEventListener('click',showAddTask);


cancelTaskBtn.addEventListener('click',function() {
    addTaskDiv.style.display='none';
})

// Add node target

var targetContainer = document.getElementById('target-container');
const addTargetBtn = document.querySelector(".add-target-btn");

function addTargetInput() {
    //Creat new div
    var newTargetDiv = document.createElement('div');
    newTargetDiv.className = 'target-item';

    //Creat new input
    var newInput = document.createElement('input');
    newInput.type='text';
    newInput.className='target-input';
    newInput.placeholder='Target';

    //Creat new node
    var newBtn = document.createElement('button');
    newBtn.className='add-target-btn';


    newTargetDiv.appendChild(newInput);
    targetContainer.insertBefore(newTargetDiv,addTargetBtn);
}

var addBtn = document.querySelector('.add-target-btn');
addBtn.addEventListener('click',addTargetInput);

// Creat Project

var projects = JSON.parse(localStorage.getItem('projects')) || [];
var todayTaskList = document.getElementById('today-task-list');
var currentDetailIndex = null;

function renderToday() {
    todayTaskList.innerHTML='';
    var count = 0
    const todayStr = new Date().toISOString().split('T')[0];

    for(var i=0;i<projects.length;i++) {
       if(projects[i].date === todayStr) {
        count++;
        var li = document.createElement('li');
        li.textContent = projects[i].title;
        li.style.cursor = 'pointer';
        

        (function(index){
            li.addEventListener('click', function() {
            showProjectDetail(index);
            });
        })(i);
        todayTaskList.appendChild(li);

        var del = document.createElement('button');
        del.textContent = '🗑️Delete';
        del.style.float='right';
        del.className='del-btn';

        del.style.backgroundColor = "#f44336";
        del.style.color = "white";
        del.style.border = "none";
        del.style.borderRadius = '8px';
        del.style.padding = '6px 12px';
        del.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
        del.style.cursor = 'pointer';
        del.style.fontSize = '16px';


        (function(index,liElement) {
            del.onclick = function() {

                document.getElementById("project-detail").innerHTML = '';
                currentDetailIndex = null;

                projects.splice(index,1);
                localStorage.setItem('projects',JSON.stringify(projects));

                liElement.parentNode.removeChild(liElement);                

                renderToday();
        }
        })(i,li);
        li.appendChild(del);

        var updateBtn = document.createElement('button');
        updateBtn.textContent = '✏️Update';
        updateBtn.style.float='right';
        updateBtn.style.marginRight='5px';
        updateBtn.style.backgroundColor = "#4caf50";
        updateBtn.style.color = "white";
        updateBtn.style.border = "none";
        updateBtn.style.borderRadius = '8px';
        updateBtn.style.padding = '6px 12px';
        updateBtn.style.cursor = 'pointer';
        updateBtn.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
        updateBtn.style.fontSize = '16px';



        (function(index){
            updateBtn.onclick = function(){
            addTaskDiv.style.display = 'flex'; 
            addTaskDiv.classList.add('popup');
            loadProjectToForm(index);

            };
        })(i);
        li.appendChild(updateBtn);

       }
    }
    var sumTask = document.getElementById('today-count');
    sumTask.innerHTML = `${count} Task`;
}

//Update
var currentEditIndex = null;
function loadProjectToForm(index){
    currentEditIndex = index; // đánh dấu là đang sửa project
    var project = projects[index];

    document.getElementById('task-title').value = project.title;
    document.getElementById('task-date').value = project.date;

    // clear target-container
    targetContainer.innerHTML = '';

    // form target
    for(var i=0; i<project.targets.length; i++){
        var input = document.createElement('input');
        input.type = 'text';
        input.value = project.targets[i];
        input.className = 'target-input';
        targetContainer.appendChild(input);
    }

    // add node "+"
    targetContainer.appendChild(addTargetBtn);
}


//Show Detail

function showProjectDetail(index) {
    var project = projects[index];
    var detailDiv = document.getElementById('project-detail');
    detailDiv.innerHTML = "";

    // Tạo khung card
    var card = document.createElement("div");
    card.className = "task-detail";

    // Header
    var header = document.createElement("div");
    header.className = "task-header";
    header.innerHTML = `<h3>${project.name || "Project"}</h3>
                        <span class="task-date">📅 ${project.date}</span>`;
    card.appendChild(header);

    // Body
    var body = document.createElement("div");
    body.className = "task-body";
    project.targets.forEach((target, i) => {
        var t = document.createElement("p");
        t.innerHTML = `🎯 <strong>Mục tiêu ${i+1}:</strong> ${target}`;
        body.appendChild(t);
    });
    card.appendChild(body);
    // Thêm card vào detailDiv
    detailDiv.appendChild(card);
}


//Add project

var addCreat = document.getElementById('add-task-btn');

function addProject(title,targets,date) {
        projects.push({title:title,date:date,targets:targets});
        localStorage.setItem('projects', JSON.stringify(projects));
        if(projects.length > 0){
            showProjectDetail(0);
        renderToday();
        }
}

//Ấn Creat

addCreat.addEventListener('click', function() {
    var title = document.getElementById('task-title').value;
    var date = document.getElementById('task-date').value;

    // Lấy tất cả target
    var targets = [];
    var targetInputs = document.querySelectorAll('#target-container .target-input');
    for(var i=0;i<targetInputs.length;i++){
        if(targetInputs[i].value.trim() !== '') {
            targets.push(targetInputs[i].value);
        }
    }

    if(title.trim() === '' || date.trim() === '') {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
    }

    if(currentEditIndex === null){
        addProject(title, targets, date);
        showProjectDetail(projects.length - 1);
    } else {
        projects[currentEditIndex] = {title:title, date:date, targets:targets};
        localStorage.setItem('projects', JSON.stringify(projects));
        renderToday();
        showProjectDetail(currentEditIndex);
        currentEditIndex = null;
    }

    addTaskDiv.style.display = 'none';

    // Reset input

    document.getElementById('task-title').value = '';
    document.getElementById('task-date').value = '';
    targetContainer.innerHTML = '';
    targetContainer.appendChild(addTargetBtn);

});


// Highlight Today
function highlightToday() {
    var days = document.querySelectorAll('#week-bar .day');
    for (var i = 0; i < days.length; i++) {
        days[i].classList.remove('today');
    }

    var today = new Date();
    var dayIndex = today.getDay();

    if(dayIndex === 0) dayIndex = 6; 
    else dayIndex = dayIndex - 1;   

    days[dayIndex].classList.add('today');
}

// Gọi mỗi lần render Today
highlightToday();


// Upcoming
function renderUpcoming() {
    var upcomingList = document.getElementById("upcoming-task-list");
    upcomingList.innerHTML = "";

    var today = new Date();
    today.setHours(0, 0, 0, 0);

    // Gom project theo ngày
    var projectsByDate = {};
    for (var i = 0; i < projects.length; i++) {
        var project = projects[i];
        var projectDate = new Date(project.date);
        projectDate.setHours(0, 0, 0, 0);

        var dateKey = projectDate.getFullYear() + "-" +
                      String(projectDate.getMonth() + 1).padStart(2, "0") + "-" +
                      String(projectDate.getDate()).padStart(2, "0");

        if (!projectsByDate[dateKey]) projectsByDate[dateKey] = [];
        projectsByDate[dateKey].push(project);
    }

    // Lấy danh sách ngày hôm nay, sắp xếp
    var upcomingDates = [];
    for (var key in projectsByDate) {
        var parts = key.split("-");
        var d = new Date(parts[0], parts[1] - 1, parts[2]);
        if (d >= today) upcomingDates.push(d);
    }
    upcomingDates.sort(function(a, b) { return a - b; });

    if (upcomingDates.length === 0) {
        upcomingList.innerHTML = "<li>🎉 Không có công việc sắp tới</li>";
        return;
    }

    // Render từng ngày
    for (var j = 0; j < upcomingDates.length; j++) {
        var taskDate = upcomingDates[j];
        var dateKey2 = taskDate.getFullYear() + "-" +
                       String(taskDate.getMonth() + 1).padStart(2, "0") + "-" +
                       String(taskDate.getDate()).padStart(2, "0");

        var tasksOfDay = projectsByDate[dateKey2];

        // Nhóm ngày 
        var dayGroup = document.createElement("li");
        dayGroup.className = "day-group";
        dayGroup.style.listStyle = "none";
        dayGroup.style.marginTop = "12px";

        // Tiêu đề ngày
        var header = document.createElement("div");
        header.className = "day-header";
        header.style.borderBottom = "1px solid #ccc";
        header.style.width = "80%";
        header.style.marginTop = "20px";
        header.style.fontSize = "18px";
        header.innerHTML =
            '<span class="date">' + formatDay(taskDate) + '</span>' +
            '<span class="meta">' + getMeta(taskDate, today) + '</span>';
        dayGroup.appendChild(header);

        // Danh sách project
        var dayTasks = document.createElement("ul");
        dayTasks.className = "day-task-list";
        dayTasks.style.marginTop = "24px";
        dayTasks.style.width = "80%";

        for (var k = 0; k < tasksOfDay.length; k++) {
            var project = tasksOfDay[k];

            var projectItem = document.createElement("li");
            projectItem.className = "task-item";
            projectItem.style.listStyle = "none";
            projectItem.style.fontSize = "18px";
            projectItem.style.marginBottom = "8px";

            // Checkbox
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = project.completed || false;
            checkbox.style.marginRight = "8px";

            checkbox.addEventListener('change', (function(p) {
                return function() {
                    p.completed = this.checked;
                    localStorage.setItem('projects', JSON.stringify(projects));
                    renderUpcoming();
                }
            })(project));

            projectItem.appendChild(checkbox);

            // Title
            var titleSpan = document.createElement("span");
            titleSpan.textContent = project.title;
            if(project.completed) titleSpan.style.textDecoration = "line-through";
            projectItem.appendChild(titleSpan);

            // Targets
            if (project.targets && project.targets.length > 0) {
                var targetsUl = document.createElement("ul");
                targetsUl.style.listStyle = "none";
                targetsUl.style.marginTop = "8px";

                for (var t = 0; t < project.targets.length; t++) {
                    var targetLi = document.createElement("li");
                    targetLi.textContent = "‣ " + project.targets[t];
                    targetsUl.appendChild(targetLi);
                }
                projectItem.appendChild(targetsUl);
            }

            dayTasks.appendChild(projectItem);
        }

        // Nút Add task
        var addTaskLi = document.createElement("li");
        addTaskLi.className = "add-task-upcoming";
        addTaskLi.style.listStyle = "none";
        var addBtn = document.createElement("button");
        addBtn.className = "add-task-upcoming-1";
        addBtn.textContent = "+ Add task";

        addBtn.addEventListener("click", (function(dateKey) {
            return function() {
                addTaskDiv.style.display = "flex";
                addTaskDiv.classList.add("popup");
                document.getElementById('task-date').value = dateKey;
                document.getElementById('task-title').value = '';
                targetContainer.innerHTML = '';
                targetContainer.appendChild(addTargetBtn);
                currentEditIndex = null;
            };
        })(dateKey2));

        addTaskLi.appendChild(addBtn);
        dayTasks.appendChild(addTaskLi);

        dayGroup.appendChild(dayTasks);
        upcomingList.appendChild(dayGroup);
    }
}



function formatDay(dateObj) {
    var day = dateObj.getDate();
    var month = dateObj.toLocaleString("en-US", { month: "short" });
    return day + " " + month;
}

function getMeta(dateObj, today) {
    var weekday = dateObj.toLocaleString("en-US", { weekday: "long" });
    if (dateObj.getTime() === today.getTime()) {
        return "‧ Today ‧ " + weekday;
    }
    return "‧ " + weekday;
}

function addTaskForDate(dateKey) {
    var taskTitle = prompt("Enter task:");
    if (taskTitle) {
        projects.push({ title: taskTitle, date: dateKey, targets: [] });
        localStorage.setItem('projects', JSON.stringify(projects));
        renderUpcoming();
    }
}

