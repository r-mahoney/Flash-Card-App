<h1>Flash Card Application</h1>

Flash Card App implementing CRUD functionality written in React

<h2>Installation Instructions</h2>

---

To install this repository:
1. Either clone the code or fork and clone the code by clicking the `Code` or `Fork` buttons at the top of the page
2. cd into the new repository
3. run `npm install`
4. run `npm start`

`npm start` will open a locally hosted webpage letting you access the flash card application and all of its functionality



<h2>Description</h2>

---

<h3> Home Page </h3>

![Home Page Image](/src/Images/home-page.PNG)

The home page allows you to see all of the created card decks as well as view, study, or delete each individual deck. There is a portion of text in the top right of each deck item letting 
you know how many cards are in each deck.

It also allows you to create a new deck via the button at the top of the page.

---

<h3> View Page </h3>

![View Page Image](/src/Images/view-page.PNG)

From the view page, you can seee each card that has been added to the deck you have selected. You are able to edit or delete individual cards by selecting the button from the card you want.

The edit button at the top allows you to edit the name and description of the deck, while the Study button takes you to a page to display cards one by one allowing you to test your knowledge,\
and the Create a Card button allows you to add a new card to the deck

---

<h3> Study Page </h3>

![Front of Card](/src/Images/front-study.PNG)

![Back of Card](/src/Images/back-study.PNG)

The initial image is the front of the card/ or the question, with only the flip button showing. When the flip button is clicked, the back of the card, or answer, is shown along with a next button\
 that will take you to the next card in the deck

 When you get to the end off the deck, clicking the next button will prompt you to either start over or rreturn to the home page.

 ---

 <h3> Create / Edit Deck </h3>

 ![Create Deck](/src/Images/create-deck.PNG)

 ![Edit Deck](/src/Images/edit-deck.PNG)

 Creating and editing a deck will take you to the same form, although the page will be set up slightly different for each. When creating a deck, the form will start empty and submitting will\
  add a new deck to the array of decks and then take you to the view page to start adding cards.

  When editing a deck, the form will be pre filled with the name and description off the deck you are trying to edit, allowing you to change both and then update the deck. Upon submitting, you will \
  also be taken back to the deck view page to either create cards or study. 

  ---

  <h3> Create / Edit Cards </h3>

 ![Create Card](/src/Images/create-card.PNG)

 ![Edit Card](/src/Images/edit-card.PNG)

 Similar to the create/edit functionality of the decks, when editing, you are presented with a pre filled form that enables you to change the contects of the card and then update the card. Whgen creating \
 a new card, the form is blank, allowing you to add whatever you would like. On submission you are taken back to the deck viewing page. 