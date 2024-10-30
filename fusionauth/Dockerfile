FROM fusionauth/fusionauth-app:latest
ADD --chown=fusionauth:fusionauth https://search.maven.org/remotecontent?filepath=com/mysql/mysql-connector-j/9.0.0/mysql-connector-j-9.0.0.jar /usr/local/fusionauth/fusionauth-app/lib

COPY --chown=fusionauth:fusionauth fusionauth_kickstart.json /usr/local/fusionauth

COPY --chown=fusionauth:fusionauth custom_files /usr/local/fusionauth/custom_files

ENV ADMIN_EMAIL=admin@micro.com
ENV ADMIN_PASSWORD=password
ENV FA_ADMIN_ID=786ae7a3-5072-417e-9c23-963b84a5c95f

ENV SEARCH_TYPE=database
ENV FUSIONAUTH_APP_RUNTIME_MODE=production
ENV FUSIONAUTH_APP_MEMORY=512M
ENV FUSIONAUTH_APP_KICKSTART_FILE=/usr/local/fusionauth/fusionauth_kickstart.json


ENV FA_API_KEY=grcgJDp7WQNaPNRR0tb6pVNjBLqxRv1YYo8P15obJSIh-2t9IVt2PiId
ENV FA_APP_ID=3c219e58-ed0e-4b18-ad48-f4f92793ae32
ENV LAMBDA_ID=9987eec8-af37-4339-a969-bb462ff8b491
ENV TENANT_ID=38633937-3061-6339-6261-386464373664