# Use an official Python runtime as a parent image
FROM python:3.9-alpine

# Set the working directory for the app
WORKDIR /app
# Copy the requirements file to the container
COPY requirements.txt ./

# Install the dependencies
RUN \
 apk add --no-cache postgresql-libs && \
 apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
 python3 -m pip install -r requirements.txt --no-cache-dir && \
 apk --purge del .build-deps

# Copy the rest of the app files to the container
COPY . .

# Set environment variables for Django settings
ENV DJANGO_SETTINGS_MODULE=cms_api.settings

CMD ["python", "manage.py", "runserver","0.0.0.0:8000"]