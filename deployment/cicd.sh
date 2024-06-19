#!/bin/bash

# Replace these with your actual values
REPO_PATH="/root/Proyek_WS"
BRANCH="main"
APP_NAME="proyek_ws"

# Navigate to the repository directory
cd $REPO_PATH

# Fetch latest changes from GitHub
git pull origin $BRANCH

echo "Pull successful"

# Check if pm2 process is running and stop it
if pm2 id $APP_NAME > /dev/null
then
    echo -e "\n\nStopping pm2 process...\n\n"
    pm2 stop $APP_NAME
fi

# Start the application with pm2
pm2 start npm --name $APP_NAME -- start

# Save current pm2 process list to restart on reboot
pm2 save

# Display pm2 process list
pm2 list

# force pm2 to open the logs
pm2 logs proyek_ws