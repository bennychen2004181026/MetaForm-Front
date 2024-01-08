pipeline {
    agent any
    
    environment {
        CI = false          // do not treat warnings as errors
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'npm run build'
                }
            }
        }

       stage('Deploy to S3 only for master branch') {
           when { branch 'master'}
            steps {
                script {
                    sh 'aws s3 sync build/ s3://metaformpro.info-my-frontend-bucket'
                }
            }
        }
    }

    post {
        success {
            echo 'Build successful!'
            // Additional post-build steps if needed
        }

        failure {
            echo 'Build failed!'
            // Additional post-build steps on failure
        }
    }
}
