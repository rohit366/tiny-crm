function createTask(title, content, token) {
  var taskURL = "https://beta.todoist.com/API/v8/tasks?token="+token;
  var task = {
    'content': title,
    'project_id': 2174420378,
    'due_string': 'today',
    'label_ids': [2149269418,2149274420],
  };
  var taskOptions = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload' : JSON.stringify(task),
    'muteHttpExceptions': true,
  };
      
  var response = UrlFetchApp.fetch(taskURL, taskOptions);
  if (typeof(response) == 'undefined') {
    return;
  };
  var id = JSON.parse(response.getContentText())["id"];
 
  var commentURL = "https://beta.todoist.com/API/v8/comments?token="+token;
  var comment = {
    'task_id': id,
    'content': content,
  };
  var commentOptions = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload' : JSON.stringify(comment),
    'muteHttpExceptions': true,
  };
  
  UrlFetchApp.fetch(commentURL, commentOptions);
};