# tiny-crm :date: :email: :tada:

A series of Google App Scripts designed to automate prospect and lead management.

## Features

Currently, the feature set is relatively simple but I'm open to suggestions/ideas for further expansion (initially within the scope of the spreadsheet itself).

A few things to note:
- kanban board: an automated updater that moves leads as you change their stage; somewhat inflexible (as it's designed around my specific spreadsheet) but I'm working to improve that
- contact updates: identifies which leads/active users should be updated in regular periods currently set to 2 weeks; also somewhat inflexible as it requires the company/contact name to be in the first two columns of the spreadsheet
- Todoist reminder: creates a Todoist task based on the token you provide; this currently has two label IDs hard-coded in (specific to my usage) but I'll make this a variable later on

## Setup

My spreadsheet currently has 8 columns, a frozen top row with column names and a README note box (making 9 columns across the top). The last three columns of data should be (in this order):
- "Status": contains cells with dropdowns with "alpha", "beta", and "release" options
- "Contact date": contains cells with clickable dropdown calendar
- "Stage": contains cells with dropdowns with "active", "signup", "decline", and "storage" options

## Usage

I'm still trying to figure out the best way to go about using Google App Scripts but I've built this to be a standalone library so you should be able to follow [these instructions](https://developers.google.com/apps-script/guides/libraries) with MssF0j8A9W0N9oGtP1pzTjHC4WZ97WE-8 as the project key.

In the [container](https://developers.google.com/apps-script/guides/bound) sheet that you want to use it with, write a function to wrap `updater` like the one below and add it as a trigger under `Edit -> Current project's triggers` for the `On change` event.

```
function updateTrigger() {
  var spreadsheet = SpreadsheetApp.getActive();
  tinycrm.updater(spreadsheet);
};
```

This will then your spreadsheet based on the changes you make to the "Stage" dropdown in each row.
