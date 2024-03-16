app.controller("TicketsTableController", function($scope, TicketService) {
    TicketService.getTickets()
        .then(function(response) {
            $scope.tickets = response.data;
        })
        .catch(function(err) {
            console.log(err);
        });
});

if (priority === 'High') {
    style.color = 'red';
    style.backgroundColor = '#ffe6e6'; // Extremely light red background
} else if (priority === 'Medium') {
    style.color = 'yellow';
    style.backgroundColor = '#ffffcc'; // Extremely light yellow background
} else if (priority === 'Low') {
    style.color = 'green';
    style.backgroundColor = '#e6ffe6'; // Extremely light green background
}