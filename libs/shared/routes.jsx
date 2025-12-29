export const apiRoutes = {
  //auth
  login: "auth/user_login.php",
  signUp: "auth/signUp.php",

  //courses
  get_courses: "courses/select_courses.php",
  get_Mycourses: "courses/select_my_courses.php",

  //teachers
  get_teachers: "teachers/select_teachers.php",
  // blogs
  get_blogs: "blogs/select_blogs.php",
  get_blog_details: "blogs/select_blog_details.php",
  make_comment: "/blogs/make_comment.php",
  make_like: "/blogs/make_like.php",
  //quizzes
  get_quizzes: "units/content/quizes/select_course_quizes.php",
};
