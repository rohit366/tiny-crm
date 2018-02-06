# tiny-crm :date: :email: :tada:

A small set of Google App Scripts designed to automate prospect and lead management.

## Features

Currently, the feature set is relatively simple but I'm open to suggestions/ideas for further expansion (initially within the scope of the spreadsheet itself).

- *kanban board*\*: an automated updater that moves leads to different sheets based on their stage in prospecting
- *contact updates*\*: logic to look for new launches and leads who are due for an email update
- *Todoist reminder*: creates a Todoist task based on the token and project ID/label IDs you provide

\* These are somewhat inflexible as they are still connected to the layout of my prospect columns but I'm working to make this more general/flexible.

## Setup

Your spreadsheet will need six tabs: "settings", "leads", "active", "signup", "decline", and "storage".

![Example tabs in the spreadsheet](https://github.com/forstmeier/tiny-crm/blob/master/img/tiny-crm-example-tabs.png)

The "settings" tab will need the A1:B3 range filled in with the information in the image below. "Status" should be a dropdown with "none", "alpha", "beta", and "release" options while "Status date" could be a calendar dropdown.

![Example settings page](https://github.com/forstmeier/tiny-crm/blob/master/img/tiny-crm-example-settings.png)

My spreadsheet currently has 8 columns, a frozen top row with column names and a README note box (making 9 columns across the top). The last three columns of data should be (in this order):
- "*Status*": contains cells with dropdowns with "alpha", "beta", and "release" options
- "*Contact date*": contains cells with clickable dropdown calendar
- "*Stage*": contains cells with dropdowns with "active", "signup", "decline", and "storage" options

![Example for last three columns](https://github.com/forstmeier/tiny-crm/blob/master/img/tiny-crm-example-columns.png)



## Usage

I'm still trying to figure out the best way to go about using Google App Scripts but I've built this to be a standalone library so you should be able to follow [these instructions](https://developers.google.com/apps-script/guides/libraries) with MssF0j8A9W0N9oGtP1pzTjHC4WZ97WE-8 as the project key.

In the [container](https://developers.google.com/apps-script/guides/bound) sheet that you want to use it with, write a function to wrap `updater` like the one below and add it as a trigger under `Edit -> Current project's triggers` for the `On change` event.

```javascript
function updateTrigger() {
  var spreadsheet = SpreadsheetApp.getActive();
  tinycrm.updater(spreadsheet);
};
```

This will then your spreadsheet based on the changes you make to the "Stage" dropdown in each row.
