import java.sql.Connection;
import java.sql.DriverManager;

public class DbConnectionTest {
    public static void main(String[] args) throws Exception {
        String url = "jdbc:postgresql://127.0.0.1:5433/audioverse";
        String username = "audioverse_user";
        String password = "local_dev_password";

        try (Connection connection =
                DriverManager.getConnection(url, username, password)) {
            System.out.println("Database connection successful!");
        }
    }
}