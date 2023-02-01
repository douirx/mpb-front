Deploying Strapi to Your Own VPS
Strapi v4

Abdulwahab Ashimi

July 25, 2022
tweet selection
How to Deploy Strapi to Your Own VPS

Get Started

Simply copy and paste the following command line in your terminal to create your first Strapi project.

npx create-strapi-app
my-project

There are multiple cloud options to deploying your Strapi app, but, in this article, I will walk you through how to install your Strapi instance on a Virtual Private Server for usage.

The article will be focused on introducing you to setting up an existing Strapi App and deploying on a VPS.
What is Strapi?

Strapi is an open-source headless Content Management System that offers you the chance to develop API with distinctive features. It's built on Node.js and works with any GraphQL enabled Frontend Frameworks.

You are able to create custom content types, relationships and media library for images and audio files with Strapi.
What is a VPS?

A Virtual Private Server is a multi-tenant infrastructure as a service cloud-hosting provided for developers to host their website and application by hosting platform.
Goals

At the end of this guide, you should be able to  set up a VPS, install your core requirements, and clone and deploy your Strapi project on VPS.
Prerequisites

Before you continue with this content, you require the following.

    Basic knowledge of JavaScript
    Basic understanding of Strapi - get started here.
    Github Account
    Git installed on your Computer
    Download and install Node.js v14+
    VScode or any other text editor 

Strapi Hardware Requirements

    At least 1 CPU Core (Recommended: 2 CPU Cores)
    Node Js Version 12 or 14 (Odd Number releases aren’t supported
    Minimum 2GBs RAM (Recommended: 4GBs)
    Disk Space Minimum of 32GBs

Supported Operating System

    Ubuntu >= 18.04 (LTS-Only)
    Debian >= 9.x
    CentOS/RHEL >= 8
    macOS Mojave or newer (ARM not supported)
    Windows 10
    Docker - docker repo

Setting up Your VPS

We will be using Lightsail VPS for this tutorial.

    Go to the Lightsail VPS page. 
    Sign up an account; you will be required to use your credit card but you will not be charged until your 3-month free trial expires.

What your screen should look like

    Click on “Create Instance”.

A Sample Screenshot

    Select Linux as Platform, Node for Blueprint and Instance Plan should be $20 since our Strapi app requires at least 4gb and 2 vCPUs. Proceed to create instance and you will be redirected here.

A Sample Screenshot

    If you see “pending” instead of “running”, just wait a couple minutes.

    Click on the Terminal icon directly opposite your Instance’s name and launch your terminal. 

A Sample Screenshot
Setting up Your Project

In this phase, we'll work on setting up our project:

    Make sure Git is installed by running. 

    git version

The command above will show you the current version of git and if it turns an error you will have to install git.

    Now, we will need to clone our Strapi Project from Github.

    git clone (url)
# mine is:
    git clone https://github.com/ibn-ashimi/my-project.git

A Sample Screenshot

Now, we have our project on the VPS, we will proceed to setting it up.

    Install both yarn and npm and you can confirm that by running: https://computingforgeeks.com/install-node-js-14-on-ubuntu-debian-linux/

    yarn -v
    #or
    npm -v

This will show you the version you have installed. In my case, my yarn is version 1.22.18 and my npm is version 8.5.5, which is okay.
Installing Packages

You need to install the npm packages to deploy project. You could use either Forever JS or PM2.

    On your terminal, make sure you move into the project folder using 

    cd (project name)
    
    npm install --production
    #and
    npm i forever -g
    #or
    npm i pm2 -g

    It is advisable to install both forever and pm2. If you experience npm permissions issues, use Sudo.

Configure Your App

Now, we need to configure our app and install dotenv which will contain our environment variables.

    Install dotenv using:

    npm i dotenv
    cp .env.example .env

    Open .env

1
nano .env

and include the variables from your database

1
2
3
4
5
6
HOST=0.0.0.0
PORT=1337
APP_KEYS=2V+39791mGaxSwRHHhwfhg==,aMWCRV6iaTxRZXx5NM/2BA==,rIsvFirfdm8YNwsy0QnLug==,dWUY3urnIol5YOkpdLTkfQ==
API_TOKEN_SALT=ksJpczGexS/3UaQ4Lb2efQ==
ADMIN_JWT_SECRET=S1WqtEgbW9ZKy3eF2JUbZQ==
JWT_SECRET=S72rrbkK0kCk1eE6g5CqIA==

Build up Your Project

To do this, run:

1
2
3
NODE_ENV=production yarn build
#or
NODE_ENV=production npm run build

You should receive a success prompt.

A Sample Screenshot

To have your app deployed with forever or PM2, create a “server.js” file using

1
nano server.js

and input

1
2
const strapi = require('@strapi/strapi');
strapi(/* {...} */).start();

then save.

1
2
3
NODE_ENV=production pm2 start server.js --name api
# or
NODE_ENV=production forever start server.js

To view the processes, you can use

1
pm2 list

Conclusion

Well done! You deployed your Strapi project on a VPS Server. This article covers the basics of deploying to a VPS, ensure to install and set up nginx reverse proxy to have your app on the web port. 