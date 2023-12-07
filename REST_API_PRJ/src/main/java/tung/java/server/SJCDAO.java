package tung.java.server;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class SJCDAO {
	private String jdbcURL="jdbc:mariadb://mariadb.vamk.fi:3306/e2101068_REST_API";
	private String jdbcUserName="e2101068";
	private String jdbcPassword="FjTnKH89gKX";
	
	
	public SJCDAO() {}
	private static final String insertQuery = "INSERT INTO studentJoinCourse (studentID, courseID) VALUES (?, ?)";
	private static final String deleteQuery = "DELETE FROM studentJoinCourse WHERE studentID = ? AND courseID = ?";

	private static final String query = "SELECT students.studentID, students.firstName, students.lastName, students.email, "
	        + "courses.courseID, courses.name, courses.teacherName "
	        + "FROM studentJoinCourse "
	        + "INNER JOIN students ON studentJoinCourse.studentID = students.studentID "
	        + "INNER JOIN courses ON studentJoinCourse.courseID = courses.courseID";


	 
	
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
	
	

	public List<SJC> selectAllSJCsByStudentID(String studentID) {
	    List<SJC> SJCs = new ArrayList<>();

	    String query = "SELECT studentJoinCourse.courseID, students.firstName, students.lastName, students.email, "
	            + "courses.name, courses.teacherName "
	            + "FROM studentJoinCourse "
	            + "INNER JOIN students ON studentJoinCourse.studentID = students.studentID "
	            + "INNER JOIN courses ON studentJoinCourse.courseID = courses.courseID "
	            + "WHERE studentJoinCourse.studentID = ?";

	    try (Connection conn = getConnection();
	         PreparedStatement ps = conn.prepareStatement(query)) {

	        ps.setString(1, studentID);
	        ResultSet rs = ps.executeQuery();

	        while (rs.next()) {
	            String courseId = rs.getString("courseID");
	            String firstName = rs.getString("firstName");
	            String lastName = rs.getString("lastName");
	            String email = rs.getString("email");
	            String courseName = rs.getString("name");
	            String teacherName = rs.getString("teacherName");

	            SJCs.add(new SJC(studentID, courseId, firstName, lastName, email, courseName, teacherName));
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }

	    return SJCs;
	}
	
	 public void insertSJC(SJC sjc) {
	     

	        try (Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement(insertQuery)) {
	            ps.setString(1, sjc.getStudentID());
	            ps.setString(2, sjc.getCourseID());

	            ps.executeUpdate();
	        } catch (SQLException e) {
	            e.printStackTrace(); // Handle or log the exception appropriately
	        }
	    }

	public List<SJC> selectAllSJCsByCourseID(String courseID) {
	    List<SJC> SJCs = new ArrayList<>();

	    String query = "SELECT studentJoinCourse.studentID, students.firstName, students.lastName, students.email, "
	            + "courses.courseID, courses.name, courses.teacherName "
	            + "FROM studentJoinCourse "
	            + "INNER JOIN students ON studentJoinCourse.studentID = students.studentID "
	            + "INNER JOIN courses ON studentJoinCourse.courseID = courses.courseID "
	            + "WHERE studentJoinCourse.courseID = ?";

	    try (Connection conn = getConnection();
	         PreparedStatement ps = conn.prepareStatement(query)) {

	        ps.setString(1, courseID);
	        ResultSet rs = ps.executeQuery();

	        while (rs.next()) {
	            String studentID = rs.getString("studentID");
	            String firstName = rs.getString("firstName");
	            String lastName = rs.getString("lastName");
	            String email = rs.getString("email");
	            String courseName = rs.getString("name");
	            String teacherName = rs.getString("teacherName");

	            SJCs.add(new SJC(studentID, courseID, firstName, lastName, email, courseName, teacherName));
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }

	    return SJCs;
	}
	
	
	public void deleteSJC(String studentID, String courseID) {
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(deleteQuery)) {

            ps.setString(1, studentID);
            ps.setString(2, courseID);

            int rowsAffected = ps.executeUpdate();

            if (rowsAffected == 0) {
                // No rows were deleted, SJC not found
                System.out.println("SJC not found for the given IDs");
            } else {
                // Deletion successful
                System.out.println("SJC deleted successfully");
            }

        } catch (SQLException e) {
            e.printStackTrace(); // Handle or log the exception appropriately
        }
    }
	
	
	public List<SJC> selectAllSJCs() {
	    List<SJC> SJCs = new ArrayList<>();

	    

	    try (Connection conn = getConnection(); 
	         PreparedStatement ps = conn.prepareStatement(query)) {

	        ResultSet rs = ps.executeQuery();
	        
	        while (rs.next()) {
	        	String studentID = rs.getString("studentID");
	            String courseId = rs.getString("courseID");
	            String firstName = rs.getString("firstName");
	            String lastName = rs.getString("lastName");
	            String email = rs.getString("email");
	            String courseName = rs.getString("name");
	            String teacherName = rs.getString("teacherName");

	            SJCs.add(new SJC(studentID, courseId, firstName, lastName, email, courseName, teacherName));
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }

	    return SJCs;
	}
	
}
