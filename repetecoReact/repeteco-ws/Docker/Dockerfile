FROM orientdb:latest

RUN mkdir -p /home/scripts/ /orientdb/config/

COPY scripts /home/scripts
COPY config /orientdb/config

RUN chmod -R 777 /home/scripts