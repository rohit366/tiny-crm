# tiny-crm :date: :email: :tada:

A small set of Google App Scripts designed to automate prospect and lead management. See [this blog post](https://dev.to/forstmeier/code-driven-business-development--5c4b) for an overview of the release system.

## Features

Currently, the feature set is relatively simple but I'm open to suggestions/ideas for further expansion (initially within the scope of the spreadsheet itself).

- **kanban board**\*: an automated updater that moves leads to different sheets based on their stage in prospecting
- **contact updates**\*: logic to look for new launches and leads who are due for an email update
- **Todoist reminder**: creates a Todoist task based on the token and project ID/label IDs you provide

\* These are somewhat inflexible as they are still connected to the layout of my prospect columns but I'm working to make this more general/flexible.

## Setup

Your spreadsheet will need six tabs: "settings", "leads", "active", "signup", "decline", and "storage". "settings" will need to be in the first position.

![Example tabs in the spreadsheet](https://github.com/forstmeier/tiny-crm/blob/master/img/tiny-crm-example-tabs.png)

The "settings" tab will need the A1:B3 range filled in with the information in the image below. "Release" should be a dropdown with "none", "alpha", "beta", and "production" options while "Release date" could be a calendar dropdown.

![Example settings page](https://github.com/forstmeier/tiny-crm/blob/master/img/tiny-crm-example-settings.png)

My spreadsheet currently has 8 columns, a frozen top row with column names and a README note box (making 9 columns across the top). The last three columns of data should be (in this order):
- "*Release*": contains cells with dropdowns with "alpha", "beta", and "production" options
- "*Contact date*": contains cells with clickable dropdown calendar
- "*Stage*": contains cells with dropdowns with "active", "signup", "decline", and "storage" options

![Example for last three columns](https://github.com/forstmeier/tiny-crm/blob/master/img/tiny-crm-example-columns.png)

I'm still trying to figure out the best way to go about using Google App Scripts but I've built this to be a standalone library so you should be able to follow [these instructions](https://developers.google.com/apps-script/guides/libraries) with MssF0j8A9W0N9oGtP1pzTjHC4WZ97WE-8 as the project key. I recommend that you turn on "Development mode" when you import the library to be up-to-date with the features I've completed thus far.

In the [container](https://developers.google.com/apps-script/guides/bound) sheet that you want to use it with, write a function to wrap the various functions (except `createTask` which is called by the other functions) like the one below and add it as a trigger under `Edit -> Current project's triggers`. I'd recommend that `updater` and `signupCheck` respond to an `On change` trigger and for `activesCheck` to run via `On time` every day.

```javascript
function updateTrigger() {
  var spreadsheet = SpreadsheetApp.getActive();
  tinycrm.updater(spreadsheet);
};
```

## Usage

Move various leads (rows) around the spreadsheet by selection different values from the "Stage" column dropdown. As you communicate with users/potential users, set their release type in the "Release" column dropdown and update your last message date in the "Contact date" calendar.

## Project status

### Roadmap
- [X] automated kanban board functionality for leads
- [X] periodic checker for leads in active contact
- [X] release announcement checker for signed up users
- [X] Todoist task creator from due leads to contact
- [ ] automatically set status date based on GitHub tags (research this more)
- [ ] set spreadsheet release via information in GitHub tags/commits (research this more)
- [ ] change lead release based on incoming webhooks (e.g. a signup notification)

### Improvements
- [ ] helper function to automatically identify project and label IDs for the user
- [ ] allow users to set which columns are included in Todoist comment contents
- [X] make reminder window time a user-set variable (currently set to two weeks)

**PRs and comments are always welcome!** :beers:
