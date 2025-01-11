pipeline {
    agent any
    environment {
        NEXTAUTH_URL = "http://localhost:3001"
        AUTH_TRUST_HOST = "True"
        PORT = credentials('NIHONGO_GAKKOU_PORT')
        DATABASE_URL = credentials('NIHONGO_GAKKOU_DATABASE_URL')
        AUTH_GOOGLE_ID= credentials('NIHONGO_GAKKOU_AUTH_GOOGLE_ID')
        AUTH_GOOGLE_SECRET= credentials('NIHONGO_GAKKOU_AUTH_GOOGLE_SECRET')
        NODE_ENV = "production"
        DOCKER_IMAGE = "nihongo-gakkou" 
        POSTGRES_USER = credentials('NIHONGO_GAKKOU_POSTGRES_USER')     
        POSTGRES_PASSWORD = credentials('NIHONGO_GAKKOU_POSTGRES_PASSWORD')
        POSTGRES_DB = credentials('NIHONGO_GAKKOU_POSTGRES_DB')
    }
    stages {
        stage('Debug Environment Variables') {
            steps {
                script {
                    sh """
                    echo "NEXTAUTH_URL=${NEXTAUTH_URL}"
                    echo "AUTH_TRUST_HOST=${AUTH_TRUST_HOST}"
                    echo "PORT=${PORT}"
                    echo "DATABASE_URL=${DATABASE_URL}"
                    """
                }
            }
        }
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
