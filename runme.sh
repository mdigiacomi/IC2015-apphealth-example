#!/bin/bash
sudo docker build -t widgetexample adf/.
sudo docker run --name widgets -d -p 80:80 widgetexample
