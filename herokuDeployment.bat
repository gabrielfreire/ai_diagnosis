@ECHO off
REM https://imsdiag.herokuapp.com
REM ionic build
git add .
git commit -m "Heroku Deployment"
git push heroku master
heroku open