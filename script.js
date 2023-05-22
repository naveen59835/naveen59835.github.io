const firebaseConfig = {
  apiKey: "AIzaSyCQ5tjSVfIGaHjZNxqdZP80FH_ODD3yc3I",
  authDomain: "naveenkumarsportfolio.firebaseapp.com",
  databaseURL: "https://naveenkumarsportfolio-default-rtdb.firebaseio.com",
  projectId: "naveenkumarsportfolio",
  storageBucket: "naveenkumarsportfolio.appspot.com",
  messagingSenderId: "1025055399899",
  appId: "1:1025055399899:web:28fd7e1e9c2d311fd291fe",
  measurementId: "G-VR32QLB2QL"
};

firebase.initializeApp(firebaseConfig);

// Get the contact form and table container
var contactForm = document.getElementById("contactForm");
var contactTable = document.getElementById("contactTable");

// Handle form submission
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  var name = document.getElementById("name").value;
  var email = document.getElementById("emailid").value;
  var message = document.getElementById("msgContent").value;

  // Store form data in Firebase
  firebase
    .database()
    .ref("contacts")
    .push({
      name: name,
      email: email,
      message: message,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    })
    .then(function () {
      // Clear form fields
      contactForm.reset();
    })
    .catch(function (error) {
      console.error("Error storing form data: ", error);
    });
});

// Display contact messages in a table
firebase
  .database()
  .ref("contacts")
  .on("value", function (snapshot) {
    var contacts = snapshot.val();

    if (contacts) {
      var tableHTML = "<table>";
      tableHTML += "<tr><th>Name</th><th>Email</th><th>Message</th></tr>";

      Object.keys(contacts).forEach(function (key) {
        var contact = contacts[key];
        tableHTML += "<tr>";
        tableHTML += "<td>" + contact.name + "</td>";
        tableHTML += "<td>" + contact.email + "</td>";
        tableHTML += "<td>" + contact.message + "</td>";
        tableHTML += "</tr>";
      });

      tableHTML += "</table>";
      contactTable.innerHTML = tableHTML;
    } else {
      contactTable.innerHTML = "No contact messages found.";
    }
  });