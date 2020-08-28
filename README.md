# APP in (PROGRESS)

#### STEPS

<ul>

<li>1_ INSTALL all the dependencies in the folder by typing: npm install </li>

<li>2_ If the page dont show in the browser, INSTALL the following: npm install autoprefixer@9.8.0</li>
<li>3_ INSTALL the gh pages dependency by typing: npm install gh-pages --save-dev</li>
<li>4_ PRESUMING you already have the git repo ready and all is already uploaded, Go to the console and type: npm run build</li>
<li>5_ After that type: npm run deploy</li>
<li>6_ DONT FORGET to add the:   "homepage": "https://yourpage.github.io/yourprojectrepo"  , ont he top of the package json , just above  "name": "firegram". </li>

 </ul>

<br>

#### STEPS FIREBASE

<br>

<ul>

<li>7_ Go to FIREBASE: https://firebase.google.com/ </li>
<li>8_ click on : Go to the console , at the right-top of the page</li>
<li>9_ CREATE A PROJECT: type whatever name you want, ONCE its ready click continue.</li>
<li>10_ click on the new "web icon" at the center of the page(one  of the 3 white circles)</li>
<li>11_ once you clicked on the icon: call it firegram</li>
<li>12_ it will show you a code, copy the code of the script in the middle of the page</li>
<li>13_ GO to VS and create a folder inside the src, called "firebase" and then create a file called config.js inside the firebase folder</li>
<li>14_ PASTE de script code inside the config.js</li>
<li>15_ DONT WORRY about the error, its due to the fact you still dont have firebase installed and imported</li>
<li>16_ to import it type the following on the top of the config.js file: import * as firebase from "firebase/app";
</li>
<li>_17 The following will serve to store the images, in the same file type the following: import "firebase/storage"; </li>
<li>_18 The following will serve to build the database, in the same file type the following: import "firebase/firestore"; </li>

 </ul>
<!-- ----------------------- -->
<!--       FIREGRAM          -->
<!-- ----------------------- -->

<br>
<br>
<br>
<br>

<hr>

<br>
<br>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
