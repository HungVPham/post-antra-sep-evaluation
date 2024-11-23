const crudAPI = (() => {

    const COURSE_API_URL = "http://localhost:4232/courseList";
    
    async function getCourses() {
      const response = await fetch(COURSE_API_URL);
      const courses = await response.json();
      return courses;
    }

    return {
        getCourses
    };
})();
  