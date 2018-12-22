This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Course Project

This repository contains code for an interactive web app, created for the _Client-Side Web Development_ course at the UW iSchool.

The site can be viewed at <https://info340a-au18.github.io/project-mouradheddaya/>

## Use Cases
NOTE: A tenant account MUST be created _prior_ to the landlord account. And they must sign up with the _exact same_ address.

For both:
-Navigate in calendar and add events, saves added events in firebase and thus persists between sessions (NOTE: does NOT sync between landlord and tenant)
-Add todos (saves in firebase, persists through sessions. not synched between landlord/tenant)

For ONLY Tenant:
-Click "Pay rent" or "Pay utilities" to report each has been payed. This will updated status in the "Payment Status" module on dashboard.
-Login and Submit and maintenance requests (synched between landlord and tenant)
-Set chores for all the different tenants 

For ONLY landlord:
-Assign payments to be collected (synched between landlord and tenant)
-Submit maintenance requests




## Dashboard:

- shows newest submitted _maintenance requests_ on both tenant & landlord side
- shows newest assigned _payment_ on both tenant & landlord side

### To do Module (stage 3):

- mark task as complete
- add new task ('enter' after typing to set task)

### Calendar (stage 3):

- Navigate through different months/years by clicking the arrows.
- Click different days to expand (click on day again to close)
- White dot indicated day has an event
- Add new calendar event by clicking on desired day and clicking the 'plus'.  ('enter' after typing sets the event)

### Charts (API):

- Toggle between Electricity cost and rent breakdown.
- Hover over chart elements to view popup information.

## Chores (stage 4):

- Tenents can assign house chores to other tenents using drag and drop
- Once drag and drop is completed, the dashboard will be updated.
- Dashboard will show the list of chores, who they're assigned to, and the status of the chore

## About

- This is a page that describes the mission of the application and its purpose, but it is not interactive.


## References

1. [react-dropdown](https://www.npmjs.com/package/react-dropdown) library - Rhea
2. [react-radio-button](https://www.npmjs.com/package/react-radio-buttons) library - Mourad
3. [react-beautiful-dnd](https://blog.bitsrc.io/implement-better-drag-and-drop-in-your-react-app-beafc4451599) library - Xiaotong
4. [Hamburger Menu tutorial 1](https://www.youtube.com/watch?v=e56W2T51Wg0) - Xiaotong
5. [Hamburger Menu tutorial 2](https://www.youtube.com/watch?v=l6nmysZKHFU&t=7s) - Xiaotong


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
