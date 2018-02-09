# Description
Trackermateo is an app created by Mateo Agudelo Toro which allows its users to record their location and also watching them using Google Maps.
When they decide to *record*, their position is saved every 1 second. Then, when they want to see their past, they can use the *view* option  and the positions they have registered and recorded will be showed in a Google Maps' map.

# Technologies

This app is built using [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/) for the back end, [Angular](https://angular.io/) to create the font end and [MongoDB](https://www.mongodb.com/) for data persistence (hosted at [mLab](https://mlab.com/))

# Deployment

### Production

The easiest way is using [Heroku](https://trackermateo.herokuapp.com/) and linking this repository to it for automatic deployment. It can be seen [here](https://trackermateo.herokuapp.com/)

### Testing

Following are the instructions to run this application on a CentOS 7 server. As of now, The *record* option will **NOT** work because HTTPS is required for that. It's deployed on the assigned server at the DCA

1. Git
    Check the installed version of Git using 
    <pre>git --version
    </pre>

    If Git is not already installed, install it using
    <pre>sudo yum install git
    </pre>

2. Node 8 LTS
    Check the installed version of Node and NPM (Node Package Manager) using, respectively
    <pre>node -v
    npm -v
    </pre>

    If Node and/or NPM is/are not already installed, install it/them using

    <pre>curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
    sudo yum -y install nodejs
    </pre>

    Optional: install build tools
    <pre>sudo yum groupinstall 'Development Tools'
    </pre>

3. Create a new folder and pull from this repository
    <pre>mkdir trackermateo
    cd trackermateo
    git init
    git remote add github https://github.com/agudelotmateo/trackermateo
    git pull github master
    </pre>

4. If firewall is blocking it, open port 8080
    <pre>sudo firewall-cmd --permanent --add-port=8080/tcp
    sudo firewall-cmd --reload
    </pre>

5. Run the app
    <pre>npm start
    </pre>

By now the app will be running and you will be able to access it using *\<your-server-ip\>:8080*

# Screenshots

![Tackermateo's Dashboard image couldn't be loaded](https://i.imgur.com/gAnpToL.jpg "Tackermateo's Dashboard")
![Tackermateo's Recording Location image couldn't be loaded](https://i.imgur.com/caQcITz.jpg "Tackermateo's Recording Location")
![Tackermateo's View Locations image couldn't be loaded](https://i.imgur.com/hhq2WZb.jpg "Tackermateo's View Locations")


# API

### Record
Records the current location and adds it to the DB

* **URL**
    `/record/:apiKey`

* **Method**
    `POST`
  
* **Required URL Params**
    * `apiKey=[String]`

* **Data Params**
    `{ latitude: Number, longitude: Number, username: String }`

* **Success Response**
    `{ success: true, msg: "Location successfully recorded" }`
 
* **Error Response**
    * `{ success: false, msg: "Invalid API key" }`
    * `{ success: false, msg: "Failed to record location" }`


### Register
Registers a new user

* **URL**
    `/register/:apiKey`

* **Method**
    `POST`
  
* **Required URL Params**
    * `apiKey=[String]`

* **Data Params**
    `{ name: String, email: String, username: String, password: String }`

* **Success Response**
    `{ success: true, msg: "User successfully registered" }`
 
* **Error Response**
    * `{ success: false, msg: "Invalid API key" }`
    * `{ success: false, msg: "Username already in use" }`
    * `{ success: false, msg: "Email already in use" }`
    * `{ success: false, msg: "Failed to register user" }`


### Authenticate
Validates the login credentials

* **URL**
    `/authenticate/:apiKey`

* **Method**
    `POST`
  
* **Required URL Params**
    * `apiKey=[String]`

* **Data Params**
    `{ username: String, password: String }`

* **Success Response**
    `{ success: true, token: String, user: { id: String, name: String, username: String, email: String } } `
 
* **Error Response**
    * `{ success: false, msg: "Invalid API key" }`
    * `{ success: false, msg: "User not found" }`
    * `{ success: false, msg: "Wrong password" }`


### Profile
Accesses to the user's profile information iff he's logged in

* **URL**
    `/profile/:apiKey`

* **Method**
    `GET`
  
* **Required URL Params**
    * `apiKey=[String]`

* **Success Response**
    `{ user: String } `
 
* **Error Response**
    `{ success: false, msg: "Invalid API key" }`


### Location
Accesses to the user's saved locations iff he's logged in

* **URL**
    `/location/:apiKey/:username`

* **Method**
    `GET`
  
* **Required URL Params**
    * `apiKey=[String]`
    * `username=[String]`

* **Success Response**
    `{ location: Array[ { username: String, latitude: Number, longitude: Number, date: Date } ] } `
 
* **Error Response**
    `{ success: false, msg: "Invalid API key" }`
