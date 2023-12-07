package tung.java.server;

public class SJC {
    private String studentID;
    private String courseID;
    private String firstName;
    private String lastName;
    private String email;
    private String courseName;
    private String teacherName;

    public SJC() {
    }

    public SJC(String studentID, String courseID, String firstName, String lastName, String email, String courseName, String teacherName) {
        this.studentID = studentID;
        this.courseID = courseID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.courseName = courseName;
        this.teacherName = teacherName;
    }

    public String getStudentID() {
        return studentID;
    }

    public void setStudentID(String studentID) {
        this.studentID = studentID;
    }

    public String getCourseID() {
        return courseID;
    }

    public void setCourseID(String courseID) {
        this.courseID = courseID;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }
}
