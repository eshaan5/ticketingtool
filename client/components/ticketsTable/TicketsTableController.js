app.controller("TicketsTableController", function($scope, TicketService) {
    TicketService.getTickets()
        .then(function(response) {
            $scope.tickets = response.data;
        })
        .catch(function(err) {
            console.log(err);
        });
});