pull the image from docker hub or build it locally from the book-store directory



docker build -t book-store .

docker run -it --name book-store -p 3000:3000 -p 4000:4000 book-store bash -l

 ```
 docker stop book-store
 docker rm book-store
 ```

To list books

curl --url http://localhost:4000/books

To add a book to the store

curl --url http://localhost:4000/books -X POST -d '{"name": "test book", "author":"test", "isbn":"3"}'

To delete a book from the store
curl --url http://localhost:4000/books?isbn=3 -X DELETE
