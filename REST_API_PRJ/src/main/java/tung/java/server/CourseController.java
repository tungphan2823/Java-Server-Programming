package tung.java.server;
import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import com.google.gson.Gson;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import jakarta.servlet.http.HttpServlet;
@WebServlet("/courses/*")
public class CourseController extends HttpServlet {

private static final long serialVersionUID = 1L;
	
	private CourseDAO courseDAO;
	
	private Gson gson;
	
	public void init() {
		courseDAO = new CourseDAO();
		gson = new Gson();
	}
	
	 private void setAccessControlHeaders(HttpServletResponse res) {
	        res.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	        res.setHeader("Access-Control-Allow-Credentials", "true");
	    }
	
	private void sendAsJSON(HttpServletResponse response, Object obj) throws ServletException, IOException {
		setAccessControlHeaders(response);

		response.setContentType("application/json");
		String result = gson.toJson(obj);
		PrintWriter out = response.getWriter();
		out.print(result);
		out.flush();
	}
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		  setAccessControlHeaders(response);
		String pathInfo = request.getPathInfo();
		// Return all users
		if(pathInfo == null || pathInfo.equals("/")) {
			List<Course> courses = courseDAO.selectAllCourses();
			sendAsJSON(response,  courses);
			return;
		}
		
		String splits[] = pathInfo.split("/");
		if(splits.length != 2) {
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
		
		 String courseID = splits[1];
	        Course course = courseDAO.selectCourseByID(courseID);
		if(course == null) {
			response.sendError(HttpServletResponse.SC_NOT_FOUND);
			return;
		} else {
			sendAsJSON(response, course);
			return;
		}
	}
	
	@Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
//		 setAccessControlHeaders(res);
//       

        String pathInfo = req.getPathInfo();

        if (pathInfo == null || pathInfo.equals("/")) {
            StringBuilder buffer = new StringBuilder();
            BufferedReader reader = req.getReader();

            String line;
            while ((line = reader.readLine()) != null) {
                buffer.append(line);
            }
            String payload = buffer.toString();
            Course course = gson.fromJson(payload, Course.class);
            courseDAO.insertCourse(course);
            sendAsJSON(res, "Success");
        } else {
            res.sendError(HttpServletResponse.SC_BAD_REQUEST);
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
//    	   setAccessControlHeaders(res);
       
        String pathInfo = req.getPathInfo();
        if (pathInfo == null || pathInfo.equals("/")) {
            res.sendError(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        String splits[] = pathInfo.split("/");
        if (splits.length != 2) {
            res.sendError(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        String courseID = splits[1];
        Course existingCourse = courseDAO.selectCourseByID(courseID);

        if (existingCourse == null) {
            res.sendError(HttpServletResponse.SC_NOT_FOUND);
            return;
        } else {
            StringBuilder buffer = new StringBuilder();
            BufferedReader reader = req.getReader();

            String line;
            while ((line = reader.readLine()) != null) {
                buffer.append(line);
            }
            String payload = buffer.toString();
            Course updatedCourse = gson.fromJson(payload, Course.class);
            updatedCourse.setCourseID(courseID);

            // Update the course information in the database
            courseDAO.updateCourse(updatedCourse);

            // Send success message as JSON in the response
            sendAsJSON(res, "Success");
        }
    }

	
	@Override
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		   setAccessControlHeaders(response);
	    String pathInfo = request.getPathInfo();

	    // Check if the path is valid
	    if (pathInfo == null || pathInfo.equals("/")) {
	        response.sendError(HttpServletResponse.SC_BAD_REQUEST);
	        return;
	    }

	    // Extract the user ID from the path
	    String[] splits = pathInfo.split("/");
	    if (splits.length != 2) {
	        response.sendError(HttpServletResponse.SC_BAD_REQUEST);
	        return;
	    }

	    String courseID = splits[1]; // Change data type to String

	    // Delete the user
	    if (courseDAO.deleteStudent(courseID)) {
	        // Send success response
	        response.setStatus(HttpServletResponse.SC_OK);
	        sendAsJSON(response, "Course deleted successfully");
	    } else {
	        // Send error response if the user doesn't exist or deletion fails
	        response.sendError(HttpServletResponse.SC_NOT_FOUND);
	    }
	}
	 @Override
	    protected void doOptions(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
	        setAccessControlHeaders(res);
	        res.setStatus(HttpServletResponse.SC_OK);
	    }
	
	
}
