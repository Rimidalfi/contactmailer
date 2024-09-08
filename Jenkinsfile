pipeline {
    agent any

    environment {
        SSH_USER = 'root'
        SSH_HOST = credentials('jano_server_ip')
        REPO_PATH = '/root/apps/contactmailer'
        REPO_URL = 'https://github.com/Rimidalfi/contactmailer.git'
        CONTAINER = 'jano-mailer'
        IMAGE = 'contactmailer'
        PORT = '8081'
        PORT_CONTAINER ='8080'

        EMAIL_PORT='465'
        EMAIL='inquiry@jano-creations.com'
        FROM='JANO'
        TO='w.janowitsch@gmail.com'
        SUBJECT='new Message from Contact form ✔'
        ORIGIN='https://wladimir.janowitsch.com'
    }

    stages {
        stage('Connect and Execute') {
            steps {
                withCredentials([
                    string(credentialsId: 'EMAIL_HOST', variable: 'EMAIL_HOST_VAR'),
                    string(credentialsId: 'EMAIL_PW', variable: 'EMAIL_PW_VAR')
                ]) {
                    script {
                        sh '''
ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} <<EOF
if [ ! -d ${REPO_PATH} ]; then
    echo "mkdir at ${REPO_PATH}"
    mkdir -p ${REPO_PATH}
fi
if [ ! -d "${REPO_PATH}/.git" ]; then
    git clone ${REPO_URL} ${REPO_PATH}
    echo "cloning repository from:${REPO_URL}"
fi
if [ -d "${REPO_PATH}/.git" ]; then
    cd ${REPO_PATH}
    git pull origin main
    echo "pulling repository from:${REPO_URL}"
    docker stop ${CONTAINER}
    echo "DOCKER CONTAINER >${CONTAINER}< STOPPED 🚫"
    docker system prune -a -f
    echo "DOCKER SYSTEM PRUNED 🧹"
    docker build -t ${IMAGE}:${BUILD_NUMBER} -t ${IMAGE} .
    echo "DOCKER IMAGE >${IMAGE}< BUILD ✅"
    docker run -d -p ${PORT}:${PORT_CONTAINER} \
    --restart unless-stopped \
    --name ${CONTAINER} \
    -e EMAIL_HOST=${EMAIL_HOST_VAR} \
    -e EMAIL_PORT=${EMAIL_PORT} \
    -e EMAIL_PW=${EMAIL_PW_VAR} \
    -e EMAIL=${EMAIL} \
    -e FROM_=${FROM_} \
    -e TO=${TO} \
    -e SUBJECT=${SUBJECT} \
    -e ORIGIN=${ORIGIN} \
    ${IMAGE}
    echo "DOCKER CONTAINER >${CONTAINER}< STARTED ✅"
fi
EOF
'''
                    }
                }
            }
        }
    }
}