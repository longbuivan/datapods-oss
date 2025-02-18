FROM postgres:latest

ENV POSTGRES_USER=root
# ENV POSTGRES_PASSWORD=IamAdmin12
ENV POSTGRES_DB=foundation_dw

ENV PGUSER=root
ENV PGPASSWORD=IamAdmin12
ENV PGDATABASE=foundation_dw
ENV PGHOST=''
ENV PGPORT=5432
ENV DATABASE_URL=''
# ENV POSTGRES_HOST_AUTH_METHOD='trust'

ENV PBUSER=root
ENV MBPASSWORD=MetabaseAdmin
ENV MBDB=foundation_dw


COPY init.sql /docker-entrypoint-initdb.d/init.sql

ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 5432

CMD ["postgres"]
