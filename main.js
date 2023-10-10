document.getElementById('issueInputForm').addEventListener('submit', saveIssue);
function saveIssue(e) {
    var issueId = chance.guid();
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueStatus = 'Open';
    var issue = {
      id: issueId,
      description: issueDesc,
      severity: issueSeverity,
      assignedTo: issueAssignedTo,
      status: issueStatus
    }
    
    if (localStorage.getItem('issues') === null) {
      var issues = [];
      issues.push(issue);
      localStorage.setItem('issues', JSON.stringify(issues));
    } else {
      var issues = JSON.parse(localStorage.getItem('issues'));
      issues.push(issue);
      localStorage.setItem('issues', JSON.stringify(issues));
    }
    
    document.getElementById('issueInputForm').reset();
   
    fetchIssues();
    
    e.preventDefault(); 
  }

function fetchIssues () {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');
    
    issuesList.innerHTML = '';
    
    for (var i = 0; i < issues.length; i++) {
      var id = issues[i].id;
      var desc = issues[i].description;
      var severity = issues[i].severity;
      var assignedTo = issues[i].assignedTo;
      var status = issues[i].status;
      
      issuesList.innerHTML +=   '<div class="columnContainer">'+
                                '<h6 class ="a">Issue ID: ' + id + '</h6>'+
                                '<h1 class="text"><span>' + status + '</span></h1>'+
                                '<h3 class = "text">' + desc + '</h3>'+
                                '<p class="text" ><span></span> ' + severity + ' '+
                                '<span></span> ' + assignedTo + '</p>'+
                                '<a href="#" class="button" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
                                '<a href="#" class="button" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
                                '</div>';
    }
  }


function setStatusClosed (id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for(var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
        issues[i].status = "Closed";
        }
    }
        
    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

function deleteIssue (id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    for(var i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues.splice(i, 1);
      }
    }
    
    localStorage.setItem('issues', JSON.stringify(issues));
    
    fetchIssues();
}



