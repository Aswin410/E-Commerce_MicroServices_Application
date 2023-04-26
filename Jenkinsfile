pipeline {
    agent any
    stages {
        stage('Build Docker Images') {
            steps {
                script {
                    bat 'docker build -t user ./User'
                    bat 'docker build -t product ./Product'
                    bat 'docker build -t order ./Order'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    bat 'kubectl delete deployment --all'
                    bat 'kubectl delete service --all'
                    bat 'kubectl apply -f ./k8s/'
                }
            }
        }
    }
}
