$(function () {
  // Add a listener for click events on the save button.
  $(".saveBtn").on("click", function () {
    // Get the user input from the sibling textarea of the clicked button.
    var userInput = $(this).siblings("textarea").val().trim();
    // Get the id of the containing time-block for this button.
    var timeBlockId = $(this).parent().attr("id");

    // Save the user input in local storage using the time block id as a key.
    localStorage.setItem(timeBlockId, userInput);
  });

  // Get the current hour in 24-hour format using Day.js.
  var currentHour = dayjs().hour();

  // Loop through each time block and apply the appropriate class based on the current hour.
  $(".time-block").each(function () {
    var blockHour = parseInt($(this).attr("id").split("-")[1]);

    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour === currentHour) {
      $(this).removeClass("past");
      $(this).addClass("present");
    } else {
      $(this).removeClass("past");
      $(this).removeClass("present");
      $(this).addClass("future");
    }
  });

  // Retrieve saved user input from local storage and set it to the corresponding textareas.
  $(".time-block").each(function () {
    var blockId = $(this).attr("id");
    var savedUserInput = localStorage.getItem(blockId);

    if (savedUserInput) {
      $(this).find("textarea").val(savedUserInput);
    }
  });

  // Display the current date in the header of the page using Day.js.
  var currentDate = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDate);
});

