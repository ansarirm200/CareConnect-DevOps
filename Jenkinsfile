pipeline {
    agent any

    environment {
        APP_NAME = 'careconnect-devops'
        DOCKER_IMAGE = 'careconnect-devops:latest'
        APP_PORT = '3000'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out CareConnect source code from GitHub...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js project dependencies...'
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the CareConnect application...'
                bat 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'Running automated unit and API tests...'
                bat 'npm test'
            }
        }

        stage('Code Quality Check') {
            steps {
                echo 'Running code quality check using ESLint...'
                bat 'npm run lint'
            }
        }

        stage('Security Scan') {
            steps {
                echo 'Running dependency security scan using npm audit...'
                bat 'npm run security'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image for CareConnect application...'
                bat 'docker build -t %DOCKER_IMAGE% .'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying CareConnect application using Docker container...'
                bat 'docker rm -f careconnect-container || exit /b 0'
                bat 'docker run -d -p 3000:3000 --name careconnect-container %DOCKER_IMAGE%'
            }
        }

        stage('Monitor') {
            steps {
                echo 'Monitoring application health endpoint...'
                bat 'curl http://localhost:3000/health'
            }
        }
    }

    post {
        success {
            echo 'CareConnect Jenkins DevOps pipeline completed successfully.'
        }

        failure {
            echo 'CareConnect Jenkins DevOps pipeline failed. Please review the console logs.'
        }

        always {
            echo 'Pipeline execution finished. Build, test, quality, security, Docker, deployment, and monitoring stages were attempted.'
        }
    }
}
