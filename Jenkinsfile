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
    }
    stages {
        // stage('docker build') {
        //     steps {
        //         script {
        //             sh """
        //             sudo docker build -t ${DOCKER_IMAGE} .
        //             """
        //         }
        //     }
        // }
        // stage('docker start') {
        //     steps {
        //         script {
        //             sh """
        //             sudo docker run -p 3000:3000 --name ${DOCKER_IMAGE} -e DATABASE_URL=${DATABASE_URL} -e AUTH_GOOGLE_ID=${AUTH_GOOGLE_ID} -e AUTH_GOOGLE_SECRET=${AUTH_GOOGLE_SECRET} -e NODE_ENV=${NODE_ENV} -e POSTGRES_USER=${POSTGRES_USER} -e POSTGRES_PASSWORD=${POSTGRES_PASSWORD} -e POSTGRES_DB=${POSTGRES_DB} -d ${DOCKER_IMAGE}
        //             """
        //         }
        //     }
        // }
        stage('Build Docker Image') {
            steps {
                sh 'sudo docker compose build'
            }
        }
        stage('Deploy Containers') {
            steps {
                sh 'sudo docker-compose up -d'
            }
        }

        stage('Prisma Migrations') {
            steps {
                script {
                    sleep(10)
                    sh """
                    sudo docker compose exec -T nihongo npx prisma migrate deploy
                    """
                }
            }
        }
    }
    
}
