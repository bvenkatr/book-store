docker build -t book-store .

docker run -it --name book-store -p 3000:3000 -p 4000:4000 book-store bash -l

 ```
 docker stop book-store
 docker rm book-store
 ```