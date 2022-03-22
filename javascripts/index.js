// Getting Started //

let addJob = false;
let listJob = false;

document.addEventListener("DOMContentLoaded", () => {
  getData();
  postData();
  jobListing();
  const addBtn = document.querySelector("#new-job-btn");
  const jobFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
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
    .then((data) => {
      // filter data for applied = 0
      renderJobs(data)
    });
}

function postData() {
  const form = document.querySelector(".add-job-form");
  // console.log(form);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: event.target[0].value,
        description: event.target[1].value,
        applied: 0,
      }),
    });
  });
}

function patchApplied() {
  fetch("http://localhost:3000/jobs", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      applied: newNumberOfApplied,
    }),
  })
    .then((res) => res.json())
    .then((data) => (data));
}

// DOM Content //

function renderJobs(arrayOfJobs) {
  arrayOfJobs.forEach((job) => {
    const collection = document.getElementById("job-collection");
    const item = document.createElement("div");
    const header = document.createElement("h2");
    const jd = document.createElement("h3");
    const button = document.createElement("button");
    item.className = "card";
    collection.appendChild(item);
    header.innerHTML = job.name;
    item.appendChild(header);
    jd.innerHTML = job.description;
    item.appendChild(jd);
    button.className = "like-btn";
    button.innerText = "Applied";
    button.setAttribute("id", job.id);
    item.appendChild(button);
    // const jobList = document.getElementById("job-list");
    button.addEventListener("click", () => {
      // inform back-end with PATCH, applied = 1
      // remove clicked card from DOM
      const collection = document.getElementById("job-collection");
      const item = document.createElement("div");
      const header = document.createElement("h2");
      const jd = document.createElement("h3");
      const button = document.createElement("button");
      item.className = "card";
      collection.appendChild(item);
      header.innerHTML = job.name;
      item.appendChild(header);
      jd.innerHTML = job.description;
      item.appendChild(jd);
      button.className = "like-btn";
      button.innerText = "Applied";
      button.setAttribute("id", job.id);
      item.appendChild(button);
    });
  });
}

// Job List Functionality //

function jobListing() {
  const listBtn = document.querySelector("#job-list-btn");
  const jobList = document.getElementById("job-list");
  const jobDiv = document.getElementById("job-collection");
  // console.log(jobList);
  listBtn.addEventListener("click", () => {
    // wipe the page
    // filter through jobs list for applied = 1 
    // renderJobs(filteredJobs)
    listJob = !listJob;
    if (listJob) {
      jobList.style.display = "block";
      jobDiv.style.display = "none";
    } else {
      jobDiv.style.display = "block";
      jobList.style.display = "none";
    }
  });
}


// function jobApplied() {
//   const applied = document.getElementsByClassName("like-btn");
//   // console.log(applied);
//   const jobsAppliedArray = [document.getElementsByClassName('like-btn')]
//   console.log(jobsAppliedArray)
//   // applied.addEventListener("click", () => {});
// }
// jobApplied()