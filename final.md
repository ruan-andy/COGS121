# Final

## Team Members
### Prasanth Abraham
* Integrating Firebase to store user data
* Statistics page - Displaying map of user's history using Leaflet and user's geolocation
* Added Google sign in
* Made various UI changes (search results, history, etc)
### Andy Ruan
* Initial SQL backend
### Gary Zhao
* Integrated Yelp API
* Search autocomplete from Yelp
### Jason Ho
* Statistics page - Plot of user's history that displays categories of restaurants they have visited
* General UI changes (layout, coloring, etc)

## Source Code Files

### index.html
* Homepage where new recommendations, discover section, and search bar and results are displayed. Users can 'like' a restaurant to add to visit history
### index.js
* Gets recommendations based on history, get new restaurants for discover section, and implements search bar autocomplete
### index.css
* Styling for index page as well as other pages
### history.html
* Page that shows list of user's restaurant history with the date they 'liked'/visited
### statistics.html
* Page where user's data is displayed in visualizations to give users an overview of their restaurant choice tendencies
### statistics.js
* Populates data visualizations based on user history
### server.js
