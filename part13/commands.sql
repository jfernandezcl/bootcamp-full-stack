CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INT DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes)
VALUES ('Author 1', 'http://example.com/blog1', 'Blog Post 1', 10),
       ('Author 2', 'http://example.com/blog2', 'Blog Post 2', 5);

SELECT * FROM blogs;
