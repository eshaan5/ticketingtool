angular.module("myApp").controller("LogModalController", function ($scope, $uibModalInstance, log) {
  $scope.previousTicket = log.previousTicketState;
  $scope.updatedTicket = log.updatedTicketState;
  $scope.checkForValue = function (field, value) {
    if (field === "assignedTo") {
      return value.agentName;
    }
    if (field == "attachments") {
      return value.length;
    }

    return value;
  };

  // Function to check if a field has changed
  $scope.isChanged = function (field) {
    // Implement logic to compare previousTicket and updatedTicket
    // Return true if the field has changed, otherwise false
    if (field === "attachments") {
      return $scope.previousTicket.attachments.length !== $scope.updatedTicket.attachments.length;
    }

    if (field === "assignedTo") {
      if ($scope.previousTicket.assignedTo && $scope.updatedTicket.assignedTo) return $scope.previousTicket.assignedTo.agentId != $scope.updatedTicket.assignedTo.agentId;

      return true;
    }

    return $scope.previousTicket[field] !== $scope.updatedTicket[field];
  };

  $scope.close = function () {
    $uibModalInstance.dismiss("cancel");
  };
});
