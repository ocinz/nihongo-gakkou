pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "ocinz/nihongo-gakkou" 
        POSTGRES_USER = credentials('NIHONGO_GAKKOU_POSTGRES_USER')     
        POSTGRES_PASSWORD = credentials('NIHONGO_GAKKOU_POSTGRES_PASSWORD')
        POSTGRES_DB = credentials('NIHONGO_GAKKOU_POSTGRES_DB')
        GITHUB_TOKEN = credentials('github-token')
        AUTH_GOOGLE_ID= credentials('NIHONGO_GAKKOU_AUTH_GOOGLE_ID')
        AUTH_GOOGLE_SECRET= credentials('NIHONGO_GAKKOU_AUTH_GOOGLE_SECRET')
    }
    stages {
        stage('Cleanup') {
            steps {
                sh 'sudo docker system prune -a --volumes --force'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'sudo docker build -t $DOCKER_IMAGE:$BUILD_NUMBER .'
            }
        }
        stage('Login to GHCR') {
            steps {
                sh 'echo $GITHUB_TOKEN_PSW | sudo docker login ghcr.io -u $GITHUB_TOKEN_USR --password-stdin'
            }
        }
        stage('tag image') {
            steps {
                sh 'sudo docker tag $DOCKER_IMAGE:$BUILD_NUMBER ghcr.io/$DOCKER_IMAGE:$BUILD_NUMBER'
            }
        }
        stage('push image') {
            steps {
                sh 'sudo docker push ghcr.io/$DOCKER_IMAGE:$BUILD_NUMBER'
            }
        }
        stage('Deploy with Docker Compose') {
            steps {
                sh """
                echo "POSTGRES_USER=$POSTGRES_USER" > .env
                echo "POSTGRES_PASSWORD=$POSTGRES_PASSWORD" >> .env
                echo "DATABASE_URL=$POSTGRES_DB" >> .env
                echo "BUILD_NUMBER=$BUILD_NUMBER" >> .env
                echo "AUTH_GOOGLE_ID=$AUTH_GOOGLE_ID" >> .env
                echo "AUTH_GOOGLE_SECRET=$AUTH_GOOGLE_SECRET" >> .env

                sudo docker-compose down
                sudo docker-compose up -d
                """
            }
        }

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
