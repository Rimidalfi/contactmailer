pipeline {
    agent any

    environment {
        SSH_USER = 'root'
        SSH_HOST = credentials('jano_server_ip')
        REPO_PATH = '/root/apps/contactmailer'
        REPO_URL = 'git@github.com:Rimidalfi/contactmailer.git'
    }
    stages {
        stage('Connect and Execute') {
            steps {
                script {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} <<EOF
                    if [ ! -d ${REPO_PATH} ]; then
                            mkdir -p ${REPO_PATH}
                    fi

                    if [ ! -d "${REPO_PATH}/.git" ]; then
                        git clone ${REPO_URL} ${REPO_PATH}
                    else
                        cd ${REPO_PATH}
                        git pull origin main
                    fi
                    EOF
                    '''
                }
            }
        }
    }
}