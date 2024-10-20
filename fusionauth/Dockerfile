FROM fusionauth/fusionauth-app:latest
ADD --chown=fusionauth:fusionauth https://search.maven.org/remotecontent?filepath=com/mysql/mysql-connector-j/9.0.0/mysql-connector-j-9.0.0.jar /usr/local/fusionauth/fusionauth-app/lib

ENV SEARCH_TYPE=database
ENV FUSIONAUTH_APP_RUNTIME_MODE=production
ENV FUSIONAUTH_APP_MEMORY=512M
ENV FUSIONAUTH_DB_NAME=fusionauth