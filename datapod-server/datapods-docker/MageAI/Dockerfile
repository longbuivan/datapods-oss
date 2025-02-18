FROM mageai/mageai:latest

ARG USER_CODE_PATH=/home/src/datapods



# Note: this overwrites the requirements.txt file in your new project on first run.
# You can delete this line for the second run :)
COPY requirements.txt ${USER_CODE_PATH}/requirements.txt

RUN pip3 install -r ${USER_CODE_PATH}/requirements.txt

COPY .env ${USER_CODE_PATH}/.env


EXPOSE 6789

# RUN mage start
ENTRYPOINT [ "/app/run_app.sh", "mage", "start" , "datapods-demo"]
