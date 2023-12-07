package tung.java.server;

public class Student {
	private String studentID;
	private String firstname;
	private String lastname;
	private String email;
	
	public Student() {}
	public Student(String studentID, String firstName, String lastName, String email) {
		this.studentID = studentID;
		this.firstname = firstName;
		this.lastname = lastName;
		this.email = email;
		
	}
	public String getStudentID() {
		return studentID;
	}
	public void setStudentID(String studentID) {
		this.studentID = studentID;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
}
