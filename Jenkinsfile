pipeline {
    agent any

    environment {
        SSH_USER = 'root'
        SSH_HOST = credentials('jano_server_ip')
    }

    stages {
        stage('Connect and Execute') {
            steps {
                script {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} << EOF
                    echo "Connected to Jano CLoud as ${SSH_USER}"
                    cd 
                    date
                    ls 
                    echo "script successful completed"
                    EOF
                    '''
                }
            }
        }
    }
}