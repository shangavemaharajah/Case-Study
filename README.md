# Database Configuration Guide

This project requires a database connection to either MySQL or PostgreSQL. Follow the steps below to configure your database connection properly.

## Dependencies
Ensure you have the necessary dependencies in your `pom.xml` (for Maven projects):

### MySQL Dependency :
```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
```

### PostSQL Dependency :
```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

## 2. Configure application.properties or application.yml
### MySQL :

```xml
spring.datasource.url=jdbc:mysql://localhost:3306/${db_name}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

```

### For PostgreSQL :

```xml
spring.datasource.url=jdbc:postgresql://localhost:5432/${db_name}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver

```

