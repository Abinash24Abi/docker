pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Abinash24Abi/docker.git'
            }
        }

        stage('Create Env Files') {
            steps {
                powershell '''
                # Backend .env
                if (!(Test-Path backend\\.env)) {
                    @"
PORT=5000
MONGO_URL=mongodb://mongo/myfile
"@ | Out-File -Encoding utf8 backend\\.env
                }

                # Frontend .env
                if (!(Test-Path frontend\\.env)) {
                    @"
REACT_APP_API_URL=http://localhost:5000/api
"@ | Out-File -Encoding utf8 frontend\\.env
                }
                '''
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
