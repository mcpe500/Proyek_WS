pipeline {
    agent any

    tools {
        nodejs "node"
    }

    environment {
        // Define your environment variables here
        PATH = "${env.PATH}:${env.WORKSPACE}/node_modules/.bin"
    }

    stages {
        stage('Checkout') {
            steps {
                // Checks out the code from the GitHub repository
                checkout scm
            }
        }

        stage('Install') {
            steps {
                // Install project dependencies
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                // Build the TypeScript project
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                // Run your tests
                // sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose -f docker-compose.yaml up --build -d'
            }
        }


        stage('Archive') {
            steps {
                // Archive the built artifacts (e.g., .js files, .d.ts files, etc.)
                archiveArtifacts artifacts: '**/dist/**, **/build/**', fingerprint: true
            }
        }
    }

    post {
        always {
            // Clean up the workspace after the pipeline is done
            cleanWs()
        }

        success {
            // Actions to perform on success
            echo 'Pipeline succeeded!'
        }

        failure {
            // Actions to perform on failure
            echo 'Pipeline failed!'
        }
    }
}
