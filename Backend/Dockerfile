FROM python:3.12.4-bookworm

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt  --no-cache-dir

COPY . .

EXPOSE 5000

CMD ["python", "api.py"]