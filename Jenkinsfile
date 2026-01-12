pipeline {
  agent any

  environment {
    IMAGE_NAME = "sricharanns/three-tier-backend"
    IMAGE_TAG  = "${BUILD_NUMBER}"
    CONTAINER  = "backend-app"
    BACKEND_IP = "PRIVATE_IP_OF_BACKEND_EC2"
  }

  stages {

    stage('Checkout Code') {
      steps {
        git branch: 'main',
            url: 'https://github.com/sricharan109/three-tier-backend.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh '''
          docker build -t $IMAGE_NAME:$IMAGE_TAG .
        '''
      }
    }

    stage('Push Image to Docker Hub') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub-creds',
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
          sh '''
            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
            docker push $IMAGE_NAME:$IMAGE_TAG
          '''
        }
      }
    }

    stage('Deploy to Backend EC2') {
      steps {
        sshagent(['backend-ssh']) {
          sh '''
            ssh -o StrictHostKeyChecking=no ubuntu@$BACKEND_IP << EOF
              docker pull $IMAGE_NAME:$IMAGE_TAG
              docker stop $CONTAINER || true
              docker rm $CONTAINER || true
              docker run -d \
                -p 3000:3000 \
                --name $CONTAINER \
                $IMAGE_NAME:$IMAGE_TAG
            EOF
          '''
        }
      }
    }
  }
}
