var utils = {

  formatDate: function(date){
    var hours = date.getHours();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    var hours = hours >= 13 ? hours - 12 : hours;
    var month = utils.monthNames[date.getMonth()];
    var dateString = month + " " + date.getDate() + " - " +
                     hours + ":" + date.getMinutes() + " " + ampm;
    return dateString;
  },

  monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
               'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

  loader: {
    isLoading: false,
    show: function(){
      this.isLoading = true;
      // display loading icon
    },
    hide: function(){
      this.isLoading = false;
      // remove loading icon
    }
  }
};
