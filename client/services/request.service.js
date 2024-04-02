app.service("RequestService", function ($http) {
    this.manipulateRequest = function (requestId, action) {
        return $http({
            method: "PUT",
            url: "pendingRequests/" + requestId + "/" + action,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    };
});