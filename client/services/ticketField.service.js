app.service("TicketFieldService", function ($http) {

    this.addTicketField = function (fieldData, type) {

        var urlTo = type == 'type' ? "ticketType/addTicketType" : "ticketRelation/addTicketRelation";

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
            url: "ticketType/getTicketTypes",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    },

    this.getTicketRelations = function () {
        return $http({
            method: "GET",
            url: "ticketRelation/getTicketRelations",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    }
});