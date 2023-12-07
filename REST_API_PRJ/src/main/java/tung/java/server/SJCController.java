package tung.java.server;
import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.List;

import com.google.gson.Gson;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import jakarta.servlet.http.HttpServlet;

@WebServlet("/SJC/*")
public class SJCController extends HttpServlet {
private static final long serialVersionUID = 1L;
	
	private SJCDAO SJCDAO;
	
	private Gson gson;
	
	public void init() {
		SJCDAO = new SJCDAO();
		gson = new Gson();
	}
	private void setAccessControlHeaders(HttpServletResponse res) {
        res.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.setHeader("Access-Control-Allow-Credentials", "true");
    }
	
	private void sendAsJSON(HttpServletResponse response, Object obj) throws ServletException, IOException {
//		setAccessControlHeaders(response);
		response.setContentType("application/json");
		String result = gson.toJson(obj);
		PrintWriter out = response.getWriter();
		out.print(result);
		out.flush();
	}
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		 setAccessControlHeaders(response);
	    String pathInfo = request.getPathInfo();
	    
	    System.out.println("PathInfo: " + pathInfo);

	    // Return all users
	    if (pathInfo == null || pathInfo.equals("/") || pathInfo.equals("")) {
	        List<SJC> SJCs = SJCDAO.selectAllSJCs();
	        sendAsJSON(response, SJCs);
	        return;
	    }

	    // Return information for a specific student
	    String splits[] = pathInfo.split("/");
	    System.out.println("Splits: " + Arrays.toString(splits));

	    if (splits.length != 2) {
	        response.sendError(HttpServletResponse.SC_BAD_REQUEST);
	        return;
	    }

	    String studentID = splits[1];
	    List<SJC> SJCs;
	    if(studentID.length()>4) {
	    	SJCs = SJCDAO.selectAllSJCsByCourseID(studentID);
	    }else {
	    	SJCs = SJCDAO.selectAllSJCsByStudentID(studentID);
	    }
	    
	    if (SJCs == null || SJCs.isEmpty()) {
	        response.sendError(HttpServletResponse.SC_NOT_FOUND);
	        return;
	    } else {
	        sendAsJSON(response, SJCs);
	        return;
	    }
	}

	@Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		 setAccessControlHeaders(response);
        BufferedReader reader = request.getReader();
        SJC newSJC = gson.fromJson(reader, SJC.class);

        if (newSJC != null) {
            SJCDAO.insertSJC(newSJC);
            response.setStatus(HttpServletResponse.SC_CREATED);
        } else {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid JSON data");
        }
    }

    
	 @Override
	    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		 setAccessControlHeaders(response);
	        String pathInfo = request.getPathInfo();

	        // Ensure the pathInfo is not null and has the correct format
	        if (pathInfo == null || pathInfo.equals("/") || pathInfo.equals("")) {
	            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid request format");
	            return;
	        }

	        // Extract studentID and courseID from the path
	        String[] splits = pathInfo.split("/");
	        if (splits.length != 3) {
	            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid request format");
	            return;
	        }

	        String studentID = splits[1];
	        String courseID = splits[2];

	        // Delete the SJC object with the specified studentID and courseID
	        if (deleteSJC(studentID, courseID)) {
	            response.setStatus(HttpServletResponse.SC_NO_CONTENT); // Successful deletion
	        } else {
	            response.sendError(HttpServletResponse.SC_NOT_FOUND, "SJC not found for the given IDs");
	        }
	    }

	    private boolean deleteSJC(String studentID, String courseID) {
	        try {
	            SJCDAO.deleteSJC(studentID, courseID);
	            return true;
	        } catch (Exception e) {
	            e.printStackTrace(); // Handle or log the exception appropriately
	            return false;
	        }
	    }
	
	    @Override
	    protected void doOptions(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
	        setAccessControlHeaders(res);
	        res.setStatus(HttpServletResponse.SC_OK);
	    }
	
	
}
