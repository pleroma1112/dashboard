FROM nginx:latest
RUN mkdir /home/react-app
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/key.pem /etc/nginx/ssl/key.pem
COPY nginx/cert.pem /etc/nginx/ssl/cert.pem
WORKDIR /home/react-app
COPY build/. .
ENTRYPOINT service nginx start && tail -f /dev/null