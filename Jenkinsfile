pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "username/nextjs-app" // Ganti dengan nama image Anda
        KUBERNETES_DEPLOYMENT = "nextjs-deployment"
    }
    stages {
        stage("Check docker container access") {
            steps {
                sh "docker ps"
                
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
