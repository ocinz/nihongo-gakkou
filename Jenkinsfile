pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "ghcr.io/ocinz/nihongo-gakkou" 
        POSTGRES_USER = credentials('POSTGRES_USER')     
        POSTGRES_PASSWORD = credentials('POSTGRES_PASSWORD')
        POSTGRES_DB = credentials('POSTGRES_DB')
        GITHUB_TOKEN = credentials('github-token')
        AUTH_GOOGLE_ID= credentials('AUTH_GOOGLE_ID')
        AUTH_GOOGLE_SECRET= credentials('AUTH_GOOGLE_SECRET')
    }
    stages {
        stage('Test Build') {
            steps {
                script {
                    sh ("echo $POSTGRES_USER, $POSTGRES_PASSWORD, $POSTGRES_DB, $GITHUB_TOKEN, $AUTH_GOOGLE_ID, $AUTH_GOOGLE_SECRET")
                }
            }
        }
        // stage("Build Docker Image") {
        //     steps {
        //         script(){
        //             sh("sudo docker build -t $DOCKER_IMAGE:$BUILD_NUMBER")
        //         }
        //     }
        // }
        // stage('Login to GitHub Container Registry') {
        //     steps {
        //         script {
        //             sh "echo $GITHUB_TOKEN | docker login ghcr.io -u ocinz --password-stdin"
        //         }
        //     }
        // }
        // stage('Push Docker Image') {
        //     steps {
        //         script {
        //             sh "docker push $DOCKER_IMAGE:$BUILD_NUMBER"
        //         }
        //     }
        // }
    }
}
