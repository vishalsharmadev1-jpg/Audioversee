<<<<<<< HEAD
# AudioVerse — current project snapshot

This is a reconstructed snapshot of the AudioVerse backend based on the code and configuration shared in our conversation. It is not a copy of your local folders, and it may not include any files or changes that were never shared here.

## Included
- Spring Boot 4.1.1 / Java 21 backend
- Health endpoint: `GET /api/health`
- User registration endpoint: `POST /api/users`
- JPA `User` entity, repository, service, registration DTO
- PostgreSQL 17 Docker Compose configuration
- Database password supplied through an environment variable

## Prerequisites
- Java 21
- Maven (or restore/use the Maven Wrapper from your local project)
- Docker Desktop

## 1. Configure the database password
From the project root, copy `.env.example` to `.env` and set `POSTGRES_PASSWORD` to the password for your existing PostgreSQL database.

**Important:** If you already have a PostgreSQL container and volume with data, do not delete the volume or run `docker compose down -v`. The Compose file uses the existing container name and named volume from the conversation. Changing the password environment variable does not change the password inside an already-initialized database.

## 2. Start PostgreSQL
From the project root:
```powershell
docker compose up -d
docker ps
```
This maps host port `5433` to container port `5432`.

## 3. Run the backend
Open PowerShell in `backend`:
```powershell
$env:POSTGRES_PASSWORD = "your-database-password"
$env:JAVA_TOOL_OPTIONS = "-Duser.timezone=Asia/Kolkata"
mvn spring-boot:run
```
If you have the Maven Wrapper in your local project, you can use `.\mvnw.cmd spring-boot:run` instead.

The backend uses `jdbc:postgresql://localhost:5433/audioverse`.

## 4. Test the health endpoint
In a second PowerShell terminal:
```powershell
Invoke-RestMethod http://localhost:8080/api/health
```
Expected JSON:
```json
{
  "app": "AudioVerse",
  "status": "UP",
  "message": "AudioVerse backend is running"
}
```

## 5. Test registration
```powershell
$body = @{
  name = "Test User"
  email = "test.user@example.com"
  password = "ChangeThisPassword123!"
} | ConvertTo-Json

Invoke-RestMethod -Method Post `
  -Uri http://localhost:8080/api/users `
  -ContentType "application/json" `
  -Body $body
```

The endpoint stores a BCrypt password hash, not the raw password. Use a fresh email for each successful test. Duplicate email currently raises an `IllegalArgumentException`; a later improvement should map that to HTTP 409 Conflict.

## Security note
Do not commit `.env` or real database credentials. This snapshot intentionally does not include your actual password.
=======
# Audioversee
>>>>>>> 186bcc6 (Initial commit)
