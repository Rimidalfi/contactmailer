!#/usr/bin/bash

ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} <<EOF
if [ ! -d ${REPO_PATH} ]; then
    echo "mkdir at ${REPO_PATH}"
    mkdir -p ${REPO_PATH}
fi
if [ ! -d "${REPO_PATH}/.git" ]; then
    git clone ${REPO_URL} ${REPO_PATH}
    echo "cloning repository from:${REPO_URL}"
else
    cd ${REPO_PATH}
    git pull origin main
    echo "pulling repository from:${REPO_URL}"
    docker build -t contactmailer:${BUILD_NUMBER} -t contactmailer .
    echo "DOCKER IMAGE BUILD ✅"
    docker run -d -p 8081:8080 \
    -e EMAIL_HOST=${EMAIL_HOST_VAR} \
    -e EMAIL_PORT="465" \
    -e EMAIL_PW=${EMAIL_PW_VAR} \
    -e EMAIL="inquiry@jano-creations.com" \
    -e FROM="JANO Geschäftsanfrage" \
    -e TO="w.janowitsch@gmail.com" \
    -e SUBJECT="new Message from Contact form ✔" \
    -e ORIGIN="https://wladimir.janowitsch.com" \
    contactmailer
    echo "DOCKER CONTAINER STARTED ✅"
fi
EOF
