$(document).ready(function () {

//Set up the Templates with Underscore

var userUrl="https://api.github.com/users/tcrack326";
var repoUrl="https://api.github.com/users/tcrack326/repos";
var orgsUrl="https://api.github.com/users/tcrack326/orgs";

var userNavTemplate = $('#userNav_template').html();
var userNavRendered = _.template(userNavTemplate);

var user_Template = $('#user_template').html();
var userRendered = _.template(user_Template);

var repo_Template = $('#repo_template').html();
var repoRendered = _.template(repo_Template);

var org_Template = $('#organization').html();
var orgRendered = _.template(org_Template);

//AJAX call to Github for User and Repo JSON data

$.getJSON(userUrl).done(function (user_data) {

  $('#userNav').append(userNavRendered(user_data));
  $('#sidebarUserInfo').append(userRendered(user_data));

  //format the join date
  var joinDate = $('#joinDate').text();
  var formattedDate = formatDate(joinDate);
  $('#joinDate').text(formattedDate);

}).fail(function (){
  alert("Failed to get user data from Github");
});

$.getJSON(repoUrl).done(function (repo_data) {
  repo_data.forEach(function(repo){
    //format the update date
    var updateDate = repo.pushed_at;
    var formattedDate = formatDate(updateDate);

    var timeInMS = elapsedTime(repo.pushed_at);

    var timeInHours = Math.round( (timeInMS) / (1000*60*60));
    var timeInDays = Math.round( (timeInMS) / (1000*60*60*24));

    if (timeInHours < 24) {
      repo.pushed_at = "Updated " + timeInHours + " hours ago";
    }

    else if ( timeInHours > 24 && timeInDays < 30  ) {
      repo.pushed_at = "Updated " + timeInDays + " days ago";
    }
    else{
      repo.pushed_at = "Updated on " + formattedDate;
    }

    $('.repoList').append(repoRendered(repo));

  });



}).fail(function (){
  alert("Failed to get repo data from Github");
});

$.getJSON(orgsUrl).done(function (orgs_data){
  orgs_data.forEach(function(org){
    $('.organizations').append(orgRendered(org));
  });


}).fail(function (){
  alert("Failed to get organizations data from Github");
});
//=============================================================================
//Helper function to Format the Date strings
//=============================================================================

var formatDate = function (date) {
  var theDate = new Date(date);
  var monthNumber = theDate.getMonth();
  var monthString;
  switch (monthNumber) {
    case 0:
      monthString = "Jan";
     break;
    case 1:
      monthString = "Feb";
      break;
    case 2:
      monthString = "Mar";
      break;
    case 3:
      monthString = "Apr";
      break;
    case 4:
      monthString = "May";
      break;
    case 5:
      monthString = "Jun";
      break;
    case 6:
      monthString = "Jul";
      break;
    case 7:
      monthString = "Aug";
      break;
    case 8:
        monthString = "Sep";
        break;
    case 9:
      monthString = "Oct";
      break;
    case 10:
      monthString = "Nov";
      break;
    case 11:
      monthString = "Dec";
      break;
    default:
        monthString = "AAA";
     }
  var day = theDate.getDate().toString();
  var year = theDate.getFullYear().toString();
  var dateString = monthString + " " + day + ", " + year;
  return dateString;
}
//calculate elapsed time for dates
var elapsedTime = function(date) {
 var startDate = new Date(date);
 var endDate = Date.now();

 var elapsedInMS = endDate - startDate;
 return elapsedInMS;
}
//=================================================================================
//Script from Refills to control the Tab-Accordion Container ========================

  $('.accordion-tabs-minimal').each(function(index) {
    $(this).children('li').first().children('a').addClass('is-active').next().addClass('is-open').show();
  });

  $('.accordion-tabs-minimal').on('click', 'li > a', function(event) {
    if (!$(this).hasClass('is-active')) {
      event.preventDefault();
      var accordionTabs = $(this).closest('.accordion-tabs-minimal')
      accordionTabs.find('.is-open').removeClass('is-open').hide();

      $(this).next().toggleClass('is-open').toggle();
      accordionTabs.find('.is-active').removeClass('is-active');
      $(this).addClass('is-active');
    } else {
      event.preventDefault();
    }
  });


//End of Tab-Accordion Container Refill Script========================================

});
