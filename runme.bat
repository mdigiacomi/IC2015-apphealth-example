docker build -t widgetexample adf/.
docker run --name widgets -d -p 80:80 widgetexample
