pipeline {
    agent any
    environment {
        DATABASE_URL = credentials('NIHONGO_GAKKOU_DATABASE_URL')
        AUTH_GOOGLE_ID= credentials('NIHONGO_GAKKOU_AUTH_GOOGLE_ID')
        AUTH_GOOGLE_SECRET= credentials('NIHONGO_GAKKOU_AUTH_GOOGLE_SECRET')
        NODE_ENV = "production"
        DOCKER_IMAGE = "nihongo-gakkou" 
        POSTGRES_USER = credentials('NIHONGO_GAKKOU_POSTGRES_USER')     
        POSTGRES_PASSWORD = credentials('NIHONGO_GAKKOU_POSTGRES_PASSWORD')
        POSTGRES_DB = credentials('NIHONGO_GAKKOU_POSTGRES_DB')
        GITHUB_TOKEN = credentials('github-token')
        NEXTAUTH_URL = "http://localhost:3001"
        AUTH_TRUST_HOST="True"
        PORT = "3001"
    }
    stages {
        stage('Docker Compose Down') {
            steps {
                script {
                    sh """
                    sudo docker compose down
                    sudo docker system prune -f
                    """
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'sudo docker compose build'
            }
        }
        stage('Deploy Containers') {
            steps {
                sh 'sudo docker compose up -d'
            }
        }
    }
    
}
