# Software Requirement Specification (SRS)

# Introduction

## Purpose
This SRS lists requirements of a basic design for **DrinkViewer** in its conceptional entirety. This includes key functionalities like the **Browser**, **Composer** and **Accout Management**, advanced functionalities like **Map** and **Bartinder**.

This SRS does not try to initially and foresightedly define each and every functionality that we want to include to the app, but claims to deliver a set of the most crucial requirements to enable us to design and implement a working and desirable application.

Since this document contributes to an agile project, it itself is agile in nature. It is growing with the project in detail and extent and stays open towards deeper insight from our experiences with the subject.

## Scope
With **DrinkViewer**, we want to offer a tool specifically and thoroughly assembled for browsing, creating and exploring different kind of drinks. With this app, we want to address beginners and amateurs as well as professional bartenders. Furthermore, our goal is to encourage people to visit local bars and cafes to discover new drinks and locations to meet friends and family.

Hence, the scope of this software project is to setup the full stack of a progressive web application that serves the aforementioned purpose. 

## Definitions, Acronyms and Abbreviations
Definition  | Meaning
----------- | ---------------------------
drink       | term for any kind of cocktail, longdrink, jumbo, shot, juice, smoothie, coffee, etc. containing at least one liquid ingredient, possibly containing solid ingredients like ice, fruits, condiments, etc., alcoholic or non-alcoholic
mixer       | person who mixes drinks
Browser     | software feature for accessing drinks and their recipes
Composer    | software feature for creating and editing drinks and their recipes
Bartinder   | software feature that suggests drinks to the user based on his/her preferences, similar to well-known dating apps

## Overview
The SRS includes overall descriptions of the application and its functionalities, followed by more specific requirements for those functionalities. Lastly, the SRS shows non-functional requirements and general design concepts.



# Overall Descripiton
With **DrinkViewer**, we aim to create a progressive web application that serves as a tool for browsing, creating and exploring different kind of drinks. We wamt to enhance the experience of mixing and compoing drinks with the benefis of a digital tool that is easy to use and offers useful features. **These features include the following:** 

## Browser
A feature that provides the ability to search for specific drinks, browse through a list of drinks and filter drinks by different attributes. Furthermore, the user should be able to rate drinks and see the average rating of other users. By clicking on a certain drink, the recipe should be displayed including ingredients and preparation process. When the user is logged in, he/she should be able to save drinks to different lists like favorites, to-do, etc.

## Composer
A feature that provides the ability to create and edit drinks. The user should be able to specify attributes of a drink like name, ingredients, preparation process, etc. Moreover, the user should be able to upload images to the drink. Unfinished drinks should be savable as a draft.

## Bartinder
Similar to dating apps, this feature provides the ability to swipe through a list of drinks, left to dislike and right to like. The user should be able to specify his/her preferences, then Bartinder should suggest random drinks based on these preferences.

## Map
A feature that provides the ability to see a map with all the bars and cafes in the area of the user. By clicking on a certain bar/cafe, the user should be able to see the address, opening hours, etc.



# Specific Requirements
## Functional Requirements
### Browser
- A wide range of filters and search options should enable the user to find the perfect drink. Filters should include:
  - alcoholic/non-alcoholic
  - main component
  - ingredients
  - taste
  - occasion/event
  - season
  - *more following*
- A rating system should help to find the best drinks and recipes. 
- Individual favorites and other lists should be used to save drinks and recipes for different occasions.
- The user should be able to find drinks that can be made with the ingredients he/she has at home.
  - If the user cannot find a drink that can be made with the ingredients he/she has at home, an AI should prepare a recipe of a drink that could be made with the ingredients the user has at home.
  - The AI generated recipe should be editable by the user. The user should be able to publish the recipe.
- Moreover, the user should be able to find drinks that are similar to the ones he/she likes and that are popular among other users.
- The user should be able to see the recipe of a drink including ingredients and preparation process.

### Composer
- With different forms like input fields, checkboxes, dropdown menus, etc. the user should be able to specify attributes of a drink.
- A dynamicly expanding list should enable the user to add as many ingredients as he/she wants.
- The user should be able to describe the preparation process of the drink.
- Images should be uploadable to illustrate the drink and its preparation process.
  - If the user does not upload an image, an AI should generate an image based on the ingredients and the preparation process.
  - The user should be able to choose between different AI generated images.
- Unfinished drinks should be savable as a draft and editable.
- Finished drinks should be publishable and editable.

### Bartinder
- The user should be able to specify his/her preferences regarding the same attributes as in the filter of the Browser.
- Bartinder should suggest random drinks to the user based on his/her preferences.
- The user should be able to swipe through the suggestions, left for dislike and right for like.
- The user should be able to see the recipes of the drinks he/she liked in a personal list.

### Map
- The user should be able to see a map with all the bars and cafes in his/her area.
- The user should be able to see the address, opening hours, etc. of a bar/cafe by clicking on it.

### Account Management
- The user should be able to create an account with a username and a password.
- The user should be able to login with his/her username and password.
- The user should be able to change his/her password.
- The user should be able to delete his/her account.
- The user should be able to see his/her profile with his/her personal information.
- The user should be able to change his/her personal information.
- The user should be able to see his/her favorites and other lists.



## Non-functional Requirements
### Usability
The application should be usable on any modern client, specifically on desktop / laptop using modern browsers (Chromium, Firefox, Safari), Android and iOS also using the built in browser toolkits.

To achieve a feel as close as possible to a native application, a certain extend of the application should also be [usable offline as soon as the front end has been cached by the browser](https://de.wikipedia.org/wiki/Progressive_Web_App).

To achieve usability on all those scenarios the UI design of the project is chosen as mobile first. That means, that most UI elements and layouts are first and foremost designed with a mobile like screen size as reference. For larger, especially horizontal displays some elements will then be placed horizontally to each other instead of being stacked vertically.

### Reliability
As already mentioned in the usability section, the application should be partially [usable without a consistent internet connection](https://de.wikipedia.org/wiki/Progressive_Web_App).

Furthermore, in a future release ( dev → beta → release) version, high availability and automatic scalability through a cloud first cluster based deployment is being discussed.

### Performance
Performance restraints are mostly applicable to the back end part of the application. As a primary use case scenario of the application will be students checking lecture schedules on the go with their mobile devices with no Wi-Fi connection and possibly low and slow mobile data availability, the data sent from and to the back end should be kept to a minimum in core functionalities of the application.

Regarding the front end this can also mean, that the overhead of loading the displayable HTML, JS and CSS needs to be kept as minimal as possible. While a certain size is realistically unavoidable here, concepts like lazy loading, resource injection and minification should be adhered to.

### Supportability
The status of maintenance of the project after the software engineering lecture, or latest after graduation of the team members is uncertain. Therefore, one discussed option is to hand this project over to other developers or hand it over to the open-source community for further development and maintenance.

To make this feasible the project’s source code and relevant documentation should be structured in a modular way, so that a rather unorganized group of contributors can independently work on various aspects of the application with minimal risk of breaking changes to other parts of the code.

### Architecture Significant Requirements
Some more non-functional attributes or quality attributes are mentioned and explicated in our [utility tree](../architecture_significant_requirements/utility_tree.md).
For that purpose there is also an [architecture decisions and design patterns document](../architecture_significant_requirements/architecture_decisions_and_design_patterns.md).

### General Design Concepts
