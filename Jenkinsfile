pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "ghcr.io/ocinz/nihongo-gakkou" 
        POSTGRES_USER = credentials('NIHONGO_GAKKOU_POSTGRES_USER')     
        POSTGRES_PASSWORD = credentials('NIHONGO_GAKKOU_POSTGRES_PASSWORD')
        POSTGRES_DB = credentials('NIHONGO_GAKKOU_POSTGRES_DB')
        GITHUB_TOKEN = credentials('github-token')
        AUTH_GOOGLE_ID= credentials('NIHONGO_GAKKOU_AUTH_GOOGLE_ID')
        AUTH_GOOGLE_SECRET= credentials('NIHONGO_GAKKOU_AUTH_GOOGLE_SECRET')
    }
    stages {
        stage('Build Docker Image') {
            steps {
                sh """
                sudo docker build -t ${DOCKER_IMAGE} .
                """
            }
        }

        stage('Push Docker Image') {
            steps {
                sh """
                echo ${GITHUB_TOKEN} | docker login ghcr.io -u <your-github-username> --password-stdin
                docker push ${DOCKER_IMAGE}
                """
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                sh """
                echo "POSTGRES_USER=${POSTGRES_USER}" > .env
                echo "POSTGRES_PASSWORD=${POSTGRES_PASSWORD}" >> .env
                echo "POSTGRES_DB=${POSTGRES_DB}" >> .env

                docker-compose down
                docker-compose up -d
                """
            }
        }
    }
}
