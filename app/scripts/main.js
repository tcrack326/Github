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


}).fail(function (){
  alert("Failed to get user data from Github");
});

$.getJSON(repoUrl).done(function (repo_data) {
  repo_data.forEach(function(repo){
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
