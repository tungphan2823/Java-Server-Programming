package tung.java.server;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class StudentDAO {
	private String jdbcURL="jdbc:mariadb://mariadb.vamk.fi:3306/e2101068_REST_API";
	private String jdbcUserName="e2101068";
	private String jdbcPassword="FjTnKH89gKX";
	
	
	public StudentDAO() {}
	private static final String SELECT_ALL_STUDENTS_QUERY = "SELECT * FROM students";
	private static final String SELECT_STUDENT_BY_ID = "SELECT * FROM students WHERE studentID=?";
	private static final String INSERT_STUDENT_QUERY = "INSERT INTO students (studentID, firstName, lastName, email) VALUES (?, ?, ?, ?)";
	private static final String DELETE_STUDENT_QUERY = "DELETE FROM students WHERE studentID=?";
	private static final String DELETE_STUDENTJOINCOURSE_QUERY = "DELETE FROM studentJoinCourse WHERE studentID=?";
	protected Connection getConnection() {
		Connection conn = null;
		try {
			Class.forName("org.mariadb.jdbc.Driver");
			conn = DriverManager.getConnection(jdbcURL, jdbcUserName, jdbcPassword);

		} catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
		}
		return conn;
	}
	
	public List<Student> selectAllUsers() {
		List<Student> students = new ArrayList<Student>();

		try (Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement(SELECT_ALL_STUDENTS_QUERY);) {

			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				String id = rs.getString(1);
				String firstName = rs.getString(2);
				String lastName = rs.getString(3);
				String email = rs.getString(4);

				students.add(new Student(id, firstName, lastName, email));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return students;
	}
	
	
	public Student selectUserByID(String id) {
		Student student = null;

		try (Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement(SELECT_STUDENT_BY_ID);) {

			ps.setString(1, id);
			ResultSet rs = ps.executeQuery();

			if (rs.next()) {
				String firstName = rs.getString("firstname");
				String lastName = rs.getString("lastname");
				String email = rs.getString("email");

				student = new Student(id, firstName, lastName, email);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return student;
	}
	
	//insert
	public void insertStudent(Student student) {
	    try (Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement(INSERT_STUDENT_QUERY)) {
	        ps.setString(1, student.getStudentID());
	        ps.setString(2, student.getFirstname());
	        ps.setString(3, student.getLastname());
	        ps.setString(4, student.getEmail());

	        // Log the SQL query before execution
	        System.out.println("SQL Query: " + ps.toString());

	        ps.executeUpdate();
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	}
	//update
	public void updateStudent(Student student) {
	    try (Connection conn = getConnection();
	         PreparedStatement ps = conn.prepareStatement("UPDATE students SET firstName=?, lastName=?, email=? WHERE studentID=?")) {

	        ps.setString(1, student.getFirstname());
	        ps.setString(2, student.getLastname());
	        ps.setString(3, student.getEmail());
	        ps.setString(4, student.getStudentID());

	        // Log the SQL query before execution
	        System.out.println("SQL Update Query: " + ps.toString());

	        ps.executeUpdate();
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	}
	//Delete
	
	private void deleteRelatedStudentJoinCourseRecords(String studentID) {
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(DELETE_STUDENTJOINCOURSE_QUERY)) {
            ps.setString(1, studentID);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
	
	public boolean deleteStudent(String id) {
	    boolean rowDeleted = false;
	    deleteRelatedStudentJoinCourseRecords(id);
	    try (Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement(DELETE_STUDENT_QUERY);) {
	        // Assuming DELETE_USER_QUERY uses a placeholder for the ID, like "DELETE FROM users WHERE id = ?"
	        ps.setString(1, id);
	        rowDeleted = ps.executeUpdate() > 0;
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	    return rowDeleted;
	}
	
	  
	

}
