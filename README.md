# Batsu - accountability app

[Live Page](https://www.batsu.io)

Batsu is an app designed for you to use with your friends to keep each other accountable.

Use the built in event creation form to invite your friends to the gym or to a hangout and enjoy punishing the flakers for missing out.

## **Technologies/API's Used:**
* React & Redux libraries
* Geolocation
* Google Geolocation(backup)
* Nodejs/Express
* PHP/MYSQL

## **Future Features:**
* More intuitive way to invite friends(unique username/id)
* CSS
* Interaction with map on home page
* customizable punishments

## Acknowledgments
  * [C5.17 Accountability Team](https://github.com/Learning-Fuze/c5.17_accountability)
  * [Learning-Fuze](https://learningfuze.com/)
  * Dan
  
## Author: Jay Lim


### Change Log: 

5/13/18:
 * customizable punishment
 * code clean-up
 * css

4/28/18:
 * enabled ssl installation/configuration
 * Automatically log out upon altered/false token check
 * enabled geolocation
 * issued warnings to enable location to users who disabled location feature
 * altered check-in radius to 0.5km max
 * check-in only enabled for 1 hr prior to event start
 * tracking enabled every 30 seconds from 1 hr prior to event start until user finally checks in
