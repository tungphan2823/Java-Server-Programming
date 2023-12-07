package tung.java.server;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CourseDAO {
	private String jdbcURL="jdbc:mariadb://mariadb.vamk.fi:3306/e2101068_REST_API";
	private String jdbcUserName="e2101068";
	private String jdbcPassword="FjTnKH89gKX";
	
	
	public CourseDAO() {}
	private static final String SELECT_ALL_COURSES_QUERY = "SELECT * FROM courses";
	private static final String SELECT_COURSE_BY_ID = "SELECT * FROM courses WHERE courseID=?";
	private static final String INSERT_COURSE_QUERY = "INSERT INTO courses (courseID, name, teacherName) VALUES (?, ?, ?)";
    private static final String UPDATE_COURSE_QUERY = "UPDATE courses SET name=?, teacherName=? WHERE courseID=?";
	private static final String DELETE_COURSE_QUERY = "DELETE FROM courses WHERE courseID=?";
	private static final String DELETE_STUDENTJOINCOURSE_QUERY = "DELETE FROM studentJoinCourse WHERE courseID=?";
	
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
	
	public List<Course> selectAllCourses() {
		List<Course> courses = new ArrayList<Course>();

		try (Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement(SELECT_ALL_COURSES_QUERY);) {

			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				String id = rs.getString(1);
				String Name = rs.getString(2);
				String teacherName = rs.getString(3);
				

				courses.add(new Course(id, Name, teacherName));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return courses;
	}
	
	
	public Course selectCourseByID(String id) {
		Course course = null;

		try (Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement(SELECT_COURSE_BY_ID);) {

			ps.setString(1, id);
			ResultSet rs = ps.executeQuery();

			if (rs.next()) {
				String Name = rs.getString("name");
				String teacherName = rs.getString("teacherName");

				course = new Course(id, Name, teacherName);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return course;
	}
	
	
	public void insertCourse(Course course) {
        try (Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement(INSERT_COURSE_QUERY)) {
            ps.setString(1, course.getCourseID());
            ps.setString(2, course.getName());
            ps.setString(3, course.getTeacherName());

            // Log the SQL query before execution
            System.out.println("SQL Query: " + ps.toString());

            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void updateCourse(Course course) {
        try (Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement(UPDATE_COURSE_QUERY)) {
            ps.setString(1, course.getName());
            ps.setString(2, course.getTeacherName());
            ps.setString(3, course.getCourseID());

            // Log the SQL query before execution
            System.out.println("SQL Update Query: " + ps.toString());

            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
	//delete
	private void deleteRelatedStudentJoinCourseRecords(String courseID) {
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(DELETE_STUDENTJOINCOURSE_QUERY)) {
            ps.setString(1,  courseID);
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
	
	public boolean deleteStudent(String id) {
	    boolean rowDeleted = false;
	    deleteRelatedStudentJoinCourseRecords(id);
	    try (Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement(DELETE_COURSE_QUERY);) {
	        // Assuming DELETE_USER_QUERY uses a placeholder for the ID, like "DELETE FROM users WHERE id = ?"
	        ps.setString(1, id);
	        rowDeleted = ps.executeUpdate() > 0;
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	    return rowDeleted;
	}
	
}
