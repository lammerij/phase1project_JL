// Getting Started //

let addJob = false;

document.addEventListener("DOMContentLoaded", () => {
  getData();
  postData();
  jobApplied();
  const addBtn = document.querySelector("#new-job-btn");
  const jobFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addJob = !addJob;
    if (addJob) {
      jobFormContainer.style.display = "block";
    } else {
      jobFormContainer.style.display = "none";
    }
  });
});

// Fetch Requests //

function getData() {
  fetch("http://localhost:3000/jobs")
    .then((res) => res.json())
    .then((data) => renderJobs(data));
}

function postData() {
  const form = document.querySelector(".add-job-form");
  // console.log(form);
  form.addEventListener("submit", (event) => {
    // event.preventDefault();
    fetch("http://localhost:3000/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: event.target[0].value,
        description: event.target[1].value,
        likes: 0,
      }),
    });
  });
}

// DOM Content //

function renderJobs(arrayOfJobs) {
  // console.log(arrayOfJobs)
  arrayOfJobs.forEach((job) => {
    // console.log(job);
    const collection = document.getElementById("job-collection");
    const item = document.createElement("div");
    // console.log(item);
    item.className = "card";
    collection.appendChild(item);
    const header = document.createElement("h2");
    // console.log(header)
    header.innerHTML = job.name;
    // console.log(job.name);
    item.appendChild(header);
    const jd = document.createElement("h3");
    // console.log(jd);
    jd.innerHTML = job.description;
    // console.log(job.description)
    item.appendChild(jd);
    const button = document.createElement("button");
    button.className = "like-btn";
    button.innerText = "Applied";
    button.setAttribute("id", job.id);
    item.appendChild(button);
  });
}

function jobApplied() {
  // const applied = document.getElementsByClassName("like-btn");
  // console.log(applied);
  const jobsAppliedArray = [document.getElementsByClassName('like-btn')]
  console.log(jobsAppliedArray)
  // applied.addEventListener("click", () => {});
}
jobApplied()




// function appliedArray(){
//   const jobsAppliedArray = [document.getElementsByClassName('like-btn')]
// console.log(jobsAppliedArray)

// }
// appliedArray()