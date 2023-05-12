let addContainerBtn = document.querySelectorAll(".btn button")[1]
let resetBtn = document.querySelectorAll(".btn button")[0]
let addContainer = document.querySelector(".wrapper")
let addGoalBtn = document.querySelectorAll(".actual-container  button")[1]
let closeContainerBtn = document.querySelectorAll(".actual-container button")[0]
let taskcontainer = document.querySelector(".data-container")
let time = document.querySelector(".actual-container input")
let task = document.querySelector(".actual-container textarea")
let progress = document.querySelector(".inner")
let progressValue = document.querySelector(".progress-value")
let totalGoals;
let widthPercentage= 0;


addContainerBtn.addEventListener("click",openAddContainer)
closeContainerBtn.addEventListener("click",closeAddContainer)
addGoalBtn.addEventListener("click",addGoal)
resetBtn.addEventListener("click",reset)


function openAddContainer()
{
  addContainer.classList.add("active")
}
function closeAddContainer()
{
  addContainer.classList.remove('active')
  time.style.backgroundColor = "transparent"
  time.style.border = "2px solid lightgray"
  task.style.backgroundColor = "transparent"
  task.style.border = "2px solid lightgray"
  time.value = ""
  task.value = ""
}
function addGoal()
{
  let timeValue = time.value
  let taskValue = task.value
  let status = false
  if(timeValue != "" && taskValue != "")
  {
    time.style.backgroundColor = "transparent"
    time.style.border = "2px solid lightgray"
    task.style.backgroundColor = "transparent"
    task.style.border = "2px solid lightgray"
    let html = `
    <div class="data">
       <div class="tick">
         <input type="checkbox">
       </div>
       <div class="time">${timeValue}</div>
         <div class="assignment">${taskValue}</div>
            <div class="status">
              <p>Pending</p>
       </div>
    </div>`
    taskcontainer.insertAdjacentHTML("beforeend",html)
    const data = JSON.parse(localStorage.getItem('data')) || [];
    data.push({ timeValue, taskValue,status });
    localStorage.setItem('data', JSON.stringify(data));
    time.value = ""
    task.value = ""
    time.style.backgroundColor = "transparent"
    time.style.border = "2px solid lightgray"
    task.style.backgroundColor = "transparent"
    task.style.border = "2px solid lightgray"
    closeAddContainer();
    const checkbox = taskcontainer.lastElementChild.querySelector(
      "input[type='checkbox']"
    );
    checkbox.addEventListener("change", function() {
      if (this.checked) {
        const data = JSON.parse(localStorage.getItem('data')) || [];
        widthPercentage += 100 / totalGoals;
        
        progress.style.width = widthPercentage + "%"
        progressValue.innerHTML = widthPercentage.toFixed(1) + "%"
        
        const index = Array.from(taskcontainer.children).indexOf(this.closest(".data"));
      const matchingItem = data[index];
      matchingItem.status=true
      // Console out the item
    localStorage.setItem("data", JSON.stringify(data));
      
      const status = this.closest(".data").querySelector(".status");
      status.style.color = "#0DA626"
      status.innerHTML = "<p>Completed</p>";
      }
      else {
        const index = Array.from(taskcontainer.children).indexOf(this.closest(".data"));
        widthPercentage -= 100 / totalGoals;
        widthPercentage = widthPercentage < 0 ? -1 * widthPercentage : widthPercentage
        progress.style.width = widthPercentage + "%"
        progressValue.innerHTML = widthPercentage.toFixed(1) + "%"
        
    const matchingItem = data[index];
    
    matchingItem.status=false
    localStorage.setItem("data", JSON.stringify(data));
    
        const status = this.closest(".data").querySelector(".status");
        status.style.color = "#EA0B0B"
        status.innerHTML = "<p>Pending</p>";
      }
    });
  }
  else{
    
    if(taskValue == "")
    { 
      task.style.backgroundColor="#FF04041F"
      task.style.border="2px solid red"
      task.focus()
    }
      if(timeValue == ""){
    time.style.backgroundColor = "#FF04041F"
    time.style.border = "2px solid red"
    time.focus()
    }
    else{
      
      task.style.backgroundColor = "#FF04041F"
      task.style.border = "2px solid red"
      time.style.backgroundColor = "#FF04041F"
      time.style.border = "2px solid red"
     
      time.focus()
    }
  }
}

time.addEventListener("change",()=>{
  if(time.value != "")
  {
    time.style.backgroundColor = "#0076FF45"
    time.style.border = "2px solid #0076FF"
  }
  else
  {
    time.style.backgroundColor = "transparent"
    time.style.border = "2px solid lightgray"
  }
})

task.addEventListener("input", () => {
  if (task.value != "")
  {
    task.style.backgroundColor = "#0076FF45"
    task.style.border = "2px solid #0076FF"
  }
  else
  {
    task.style.backgroundColor = "transparent"
    task.style.border = "2px solid lightgray"
  }
})
function reset()
{
  taskcontainer.innerHTML=""
  const data = JSON.parse(localStorage.getItem('data')) || [];
  localStorage.clear();
}


window.addEventListener("load",()=>{
  const data = JSON.parse(localStorage.getItem('data')) || [];
  totalGoals = data.length 
  for(let i = 0;i < data.length;i++)
  {
    
    let html = `
        <div class="data">
           <div class="tick">
             <input data-status = "${data[i].status}"type="checkbox">
           </div>
           <div class="time" data-time="${data[i].timeValue}">${data[i].timeValue}</div>
             <div class="assignment" data-task="${data[i].taskValue}">${data[i].taskValue}</div>
                <div class="status">
                  <p>Pending</p>
           </div>
        </div>`
    taskcontainer.insertAdjacentHTML("beforeend", html)
    const checkbox = taskcontainer.lastElementChild.querySelector(
      "input[type='checkbox']"
    );
    if(data[i].status == true)
    {
      widthPercentage += 100 / totalGoals;
      
      progress.style.width = widthPercentage + "%"
      progressValue.innerHTML = widthPercentage.toFixed(1) + "%"
      
      checkbox.checked = true
      const status = document.querySelectorAll(".status")[i]
      status.style.color = "#0DA626"
      status.innerHTML = "<p>Completed</p>";
    }
    checkbox.addEventListener("change", function() {
  if (this.checked) {
     widthPercentage += 100 / totalGoals;
     
     progress.style.width = widthPercentage + "%"
     progressValue.innerHTML = widthPercentage.toFixed(1) + "%"
     
    const index = Array.from(taskcontainer.children).indexOf(this.closest(".data"));
    const matchingItem = data[index];
    
    matchingItem.status=true
    localStorage.setItem("data", JSON.stringify(data));
    
    const status = this.closest(".data").querySelector(".status");
    status.style.color = "#0DA626"
    status.innerHTML = "<p>Completed</p>";
  }
  else {
    const index = Array.from(taskcontainer.children).indexOf(this.closest(".data"));
    const matchingItem = data[index];
    
    matchingItem.status=false
    localStorage.setItem("data", JSON.stringify(data));
    const status = this.closest(".data").querySelector(".status");
    status.style.color = "#EA0B0B"
    status.innerHTML = "<p>Pending</p>";
    widthPercentage -= 100 / totalGoals;
    widthPercentage = widthPercentage < 0 ? -1 * widthPercentage : widthPercentage
    progress.style.width = widthPercentage + "%"
    progressValue.innerHTML = widthPercentage.toFixed(1) + "%"
    
  }
    });
   
  }
})