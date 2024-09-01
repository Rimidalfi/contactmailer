pipeline {
    agent any

    environment {
        SSH_USER = 'root'
        SSH_HOST = jano_server_ip
    }

    stages {
        stage('Connect and Execute') {
            steps {
                script {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} <<EOF
                    echo "Connected to ${SSH_HOST} as ${SSH_USER}"
                    hostname
                    date
                    ls 
                    EOF
                    '''
                }
            }
        }
    }
}