pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "ghcr.io/ocinz/nihongo-gakkou" 
        KUBERNETES_DEPLOYMENT = "nextjs-deployment"
    }
    stages {
        stage("Build Docker Image") {
            steps {
                script(){
                    sh("sudo docker build -t $DOCKER_IMAGE:$BUILD_NUMBER")
                }
            }
            
        }
        stage('Login to GitHub Container Registry') {
            steps {
                script {
                    sh "echo $GITHUB_TOKEN | docker login ghcr.io -u ocinz --password-stdin"
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    sh "docker push $DOCKER_IMAGE:$BUILD_NUMBER"
                }
            }
        }
        

        // stage('Build Docker Image') {
        //     steps {
        //         script {
        //             sh 'docker build -t $DOCKER_IMAGE:$BUILD_NUMBER .'
        //         }
        //     }
        // }

        // stage('Push Docker Image') {
        //     steps {
        //         script {
        //             withDockerRegistry([credentialsId: 'docker-credentials-id', url: 'https://registry.hub.docker.com']) {
        //                 sh 'docker push $DOCKER_IMAGE:$BUILD_NUMBER'
        //             }
        //         }
        //     }
        // }

        // stage('Deploy to Kubernetes') {
        //     steps {
        //         script {
        //             sh '''
        //             kubectl set image deployment/$KUBERNETES_DEPLOYMENT \
        //             nextjs-container=$DOCKER_IMAGE:$BUILD_NUMBER --record
        //             '''
        //         }
        //     }
        // }
    }
}
