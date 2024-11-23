let selectedCourses = [];
let totalCredit = 0;

function renderCourses(courses) {
    const courseListElt = document.getElementById("course-list-id");

    courses.forEach((course, i) => {
        const courseElt = displayCourseElt(course, false, i);
        courseListElt.appendChild(courseElt);
    });
}

function renderSelectedCourses(selectedCourses) {
    const selectedListElt = document.getElementById("selected-course-list-id");

    selectedCourses.forEach((course, i) => {
        const courseElt = displayCourseElt(course, true, i);
        selectedListElt.appendChild(courseElt);
    });
}

function displayCourseElt(course, isSelected, i) {
    const courseElt = document.createElement("div");

    let required = course.required ? "Compulsory" : "Elective";

    courseElt.style.backgroundColor = i % 2 === 0 ? "rgb(221, 239, 221)" : "";

    courseElt.innerHTML = `${course.courseName} <br> Course Type: ${required} <br> Course Credit: ${course.credit}`;
    
    courseElt.classList = "course";

    if (!isSelected) {
        courseElt.addEventListener('click', () => {
            if (selectedCourses.includes(course)) {
                courseElt.style.backgroundColor = i % 2 === 0 ? "rgb(221, 239, 221)" : "";
                selectedCourses = selectedCourses.filter((c) => c !== course);
                updateTotalCredit(-course.credit);
            } else {
                if (totalCredit + course.credit > 18) {
                    alert("You can only choose up to 18 credits in one semester");
                    return;
                }
                courseElt.style.backgroundColor = "deepskyblue";
                selectedCourses.push(course);
                updateTotalCredit(course.credit);
            }
        });
    } 

    return courseElt;
}

function updateTotalCredit(credit) {
    totalCredit += credit;
    document.getElementById('total-credit').textContent = totalCredit;
}

function setUpSelectButton() {
    const selectBtn = document.getElementById("select-button");
    selectBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (selectedCourses.length === 0) {
            alert("No courses selected.");
            return;
        }
        const userConfirmed = confirm(`You have chosen ${totalCredit} credits for this semester. You cannot change once you submit. Do you want to confirm?`);
        if (userConfirmed) {
            moveSelectedCourses();
            selectBtn.disabled = true;
        }
    });
}

function moveSelectedCourses() {
    const availableListElt = document.getElementById("course-list-id");
    const selectedListElt = document.getElementById("selected-course-list-id");

    selectedCourses.forEach((course, i) => {
        const courseElt = displayCourseElt(course, true, i);
        selectedListElt.appendChild(courseElt);

        const availableCourses = Array.from(availableListElt.children);
        availableCourses.forEach((elem) => {
            if (elem.textContent.includes(course.courseName)) {
                availableListElt.removeChild(elem);
            }
        });
    });

    selectedCourses = [];
    totalCredit = 0;
    document.getElementById('total-credit').textContent = totalCredit;
}

(function initApp() {
    setUpSelectButton();
    crudAPI.getCourses().then((courses) => {
        renderCourses(courses);
    });

    totalCredit = 0; 
    document.getElementById('total-credit').textContent = totalCredit;
})();