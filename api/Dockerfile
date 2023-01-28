FROM python:3.8
ADD ./api /app
WORKDIR /app
RUN pip install -r requirements.txt
RUN chmod +x ./start.sh
EXPOSE 5000
ENTRYPOINT ["sh", "start.sh"]