pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "ghcr.io/ocinz/nihongo-gakkou" 
        // POSTGRES_USER = credentials('NIHONGO_GAKKOU_POSTGRES_USER')     
        // POSTGRES_PASSWORD = credentials('NIHONGO_GAKKOU_POSTGRES_PASSWORD')
        // POSTGRES_DB = credentials('NIHONGO_GAKKOU_POSTGRES_DB')
        GITHUB_TOKEN = credentials('github-token')
        // AUTH_GOOGLE_ID= credentials('NIHONGO_GAKKOU_AUTH_GOOGLE_ID')
        // AUTH_GOOGLE_SECRET= credentials('NIHONGO_GAKKOU_AUTH_GOOGLE_SECRET')
    }
    stages {
        stage('Build Docker Image') {
            steps {
                sh """
                sudo docker build -t $DOCKER_IMAGE:$BUILD_NUMBER .
                """
            }
        }
        stage('login to GHCR') {
            steps {
                sh 'echo $GITHUB_TOKEN_PSW | docker login ghcr.io -u $GITHUB_TOKEN_USR --password-stdin'
            }
        }
        stage('Push Docker Image') {
            steps{
                sh('docker push $DOCKER_IMAGE:$BUILD_NUMBER')
            }
        }

        // stage('Deploy with Docker Compose') {
        //     steps {
        //         sh """
        //         echo "POSTGRES_USER=${POSTGRES_USER}" > .env
        //         echo "POSTGRES_PASSWORD=${POSTGRES_PASSWORD}" >> .env
        //         echo "POSTGRES_DB=${POSTGRES_DB}" >> .env
        //         echo "DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@ocinz.tech:8081/gakkou?schema=gakkou}" >> .env

        //         docker-compose down
        //         docker-compose up -d
        //         """
        //     }
        // }

        // stage('Prisma Migrations') {
        //     steps {
        //         script {
        //             sleep(10)

        //             sh """
        //             docker-compose exec -T nextjs-app npx prisma migrate deploy
        //             """
        //         }
        //     }
        // }
    }
    post{
        always {
            sh("docker logout")
        }
    }
}
