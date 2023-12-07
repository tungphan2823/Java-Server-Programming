package tung.java.server;

public class Course {
	private String courseID;
	private String name;
	private String teacherName;
	
	public Course() {}
	public Course(String courseID, String name, String teacherName) {
		this.courseID = courseID;
		this.name =name;
		this.teacherName = teacherName;
		
	}
	public String getCourseID() {
		return courseID;
	}
	public void setCourseID(String courseID) {
		this.courseID = courseID;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getTeacherName() {
		return teacherName;
	}
	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}
}
