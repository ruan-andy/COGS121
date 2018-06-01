# Milestone6

For this milestone, we worked towards displaying user restaurant statistics. We wanted to give users an overview of what types of restaurants they liked and what cities/locations they have visited restaurants. Also, history and statistics are now saved into individual users by integrating login and Firebase into our project.

## UI
We first added a Google login button to attach user's data and history to their account. 
![Login](https://github.com/ruan-andy/COGS121/blob/master/milestone6/login.png)

We then added more status messages to help the user interact with our app and give them more information on what is happening.

We have the search button turn green after selecting a search result so that the user knows to click it to see more information and be able to add it to history.
![Search](https://github.com/ruan-andy/COGS121/blob/master/milestone6/searchbutton.png)

Once you add a restaurant to history, a confirmation status message pops up.
![Add Status](https://github.com/ruan-andy/COGS121/blob/master/milestone6/addedstatus.png)

We added a loading status message while the history loads from Firebase to help avoid confusion. We also updated the history UI.
![History Loading](https://github.com/ruan-andy/COGS121/blob/master/milestone6/loading.png)
![History UI](https://github.com/ruan-andy/COGS121/blob/master/milestone6/history.png)


## Data Visualization
On the statistics page we show various visualizations of the categories of restaurants the user has visited and the locations they have visited marked on a map.
![stat](https://github.com/ruan-andy/COGS121/blob/master/milestone6/statistics.png)
