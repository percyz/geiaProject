GEIA LEADERBOARD:

This repository includes the basic structure of Geia website project and the source code of all components of Geia leaderboard which is like the screenshot shown below. 
You can find the main page at '/imports/ui/pages/leaderboard.jsx' and several relative components at '/imports/ui/component/Leaderboard'.

![leaderboard](https://user-images.githubusercontent.com/24515815/29054470-9040d46e-7c4a-11e7-8602-7b43ddb93537.PNG)

The leaderboard display and rank the organisations according to the Geia score, which helps customers easily identify what organisation they should give their loyalty. It included four main components, searchbox, organisationList, organisationItem and pagination respectively.

    -Searchbox: Users could search organisation name direactly. They could filter the organisaiton list through organisation loaction and industry as well.

    -OrganisationList: The complete list of organisaitons which is validated by Geia, it is dynamical updated by searchbox.

    -OrganisationItem: The single organisaiton item which including organisation name, location, industry, score, status, logo.

CLIENT FOLDER:
  -Has Basic imports e.g. (Bootstrap/JQuery)
  -Has StyleSheets folder which contains CSS for a majority of the specified JSX files.
  (Some CSS may also be in the actual JSX Files).

IMPORTS FOLDER:
  API FOLDER:
    -ContactUS FOLDER has a test collection for the contact us page.

    -Doingood FOLDER was also has test collections, not going to be used I believe Same with Profiles.

    -Leaderboard FOLDER has 3 collections, just using leaders at the moment.

    -User.js just has useful functions to do with User Login etc..

    -Router FOLDER contains all the routing in the website.

    -Startup FOLDER has two folders (Client and Server):
      Client's app.jsx is the MainLayout which is the basic skeleton of the website(anything added there, gets added everywhere)
      Client's main.js imports the app.jsx and the main.js files get imported in the MAIN Client Folder (main.js)

      Server has only one file at the moment, and will soon have more content in it. At the moment it just stores
      Facebook app Id's and secret to use Facebook Login.
      Server's main.js also loads the collections.

      -Ui FOLDER:
        COMPONENT FOLDER:

          DoingGood FOLDER:
            -MessageBox.jsx is used for the companies message which users can send to them.

          Footer FOLDER:
            -Contains all the code for the footer.

          Header FOLDER:
            -Contains the AboutNav.jsx which is what we will only use for the header.
            -The other folders (ChangePassword/LoggedIn/LoggedOut) will not be used at the moment
            -Header.jsx will not be used either

          Leaderboard FOLDER:
            -OrganisationD is mainly the skeleton of the leaderboard page and calls the leaders collection for
            its data it also gets. It then gets called by OrganisationC where OrganisationC has Pagination which covers a majority
            of the code in that page. Some of the code decides what the last page is, and renders the left over
            companies to the last page of pagination, it also calls Pager.jsx which is all focusing on the Pagination

            -SearchBox.jsx Concerns everything to with the searchbox in the leaderboard page.

          Login FOLDER:
            -AccountsLogin.jsx is the facebook login package, which gets called in the AboutNav.jsx file.

            -RegisterNav is for the Dashboard page.

          Assessment FOLDER:
            -AssC02.jsx is when the user is doing their assessment for their company.
            At the moment, they have to click calculate to finish it, then submit for the data
            to be sent to the finalised page. (Not yet completed)
            -AssInstructions.jsx is just text telling the organisation about what the assessment does.

         Registers FOLDER:
          -Most of it is just text, guiding the user through the dashboard.

        -About.jsx is for the About page, mostly just text, with a little javascript for the images.

        -ContactUs.jsx is for the contact Us page, at the moment, has little functionality.

        -Doingood.jsx is for the companies profile.

        -Faqs.jsx is just text.

        -Giveback.jsx is just text as well.

        -Home.jsx is for a user if they are not logged in (if they are logged in, they are directed to the Dashboard page)

        -Leaderboard.jsx is the very base of the leaderboard page, has imported all of OrganisationC and SearchBox

        -Register.jsx was originally it's own page, but it is now in the Home.jsx page.

        -RegisterOrg.jsx is not currently completed, will eventually be for organisations signing up.

        -Rewards.jsx is just text.

        -Sustain.jsx is just text

        Public FOLDER:
          -just stores images.

        Server FOLDER:
          -imports collections and server main.js in the startup folder.
