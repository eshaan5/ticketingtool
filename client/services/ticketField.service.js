app.service("TicketFieldService", function ($http) {

    this.addTicketField = function (fieldData, type) {

        var urlTo = type == 'type' ? "http://localhost:3000/ticketType/addTicketType" : "http://localhost:3000/ticketRelation/addTicketRelation";

        return $http({
            method: "POST",
            url: urlTo,
            data: fieldData,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    },

    this.getTicketTypes = function () {
        return $http({
            method: "GET",
            url: "http://localhost:3000/ticketType/getTicketTypes",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    },

    this.getTicketRelations = function () {
        return $http({
            method: "GET",
            url: "http://localhost:3000/ticketRelation/getTicketRelations",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    }
});