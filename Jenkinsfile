pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Abinash24Abi/docker.git'
            }
        }

        stage('Stop Old Containers') {
            steps {
                powershell '''
                docker-compose down
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                powershell '''
                docker-compose build
                '''
            }
        }

        stage('Start Containers') {
            steps {
                powershell '''
                docker-compose up -d
                '''
            }
        }
    }
}
