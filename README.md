# Shavasana
## A project and task management tool for boosting team productivity, inspired by Asana

<!-- ![Home page](https://github.com/RosemaryGonzaga/Final_Project_Asana_Clone/raw/master/app/assets/images/asana_home_logo.png) -->
<!-- ![Home page](https://github.com/RosemaryGonzaga/Final_Project_Asana_Clone/raw/master/app/assets/images/readme%20_images/Shavasana_login.gif) -->
<!-- ![Home page](https://github.com/RosemaryGonzaga/Final_Project_Asana_Clone/raw/master/app/assets/images/readme%20_images/Shavasana_login_large.gif) -->
![Home page](https://github.com/RosemaryGonzaga/Final_Project_Asana_Clone/raw/master/app/assets/images/readme%20_images/Shavasana_login_short.gif)

Table of contents:

* [Follow along on the site](https://shavasana.herokuapp.com/#/)

* Why Shavasana?

* Shavasana's technology stack

* Feature Spotlight: User Authentication

* Feature Spotlight: Projects

* Future Directions

* Acknowledgements


---


## Why Shavasana?


Shavasana exists to make it easier for teams to collaborate on projects. Users can organize a project's tasks into stages and keep a pulse on the project's overall completion status.


---


## Shavasana's technology stack

This application is built on a stack of backend technologies, including PostgreSQL to host the database, Ruby on Rails for managing the data model, JQuery (AJAX), Javascript, React, Redux, HTML, and CSS.


---


## Feature Spotlight: User Authentication

Shavasana incorporates robust user authentication, ensuring users can only view their own team's projects and tasks.

---


## Feature Spotlight: Projects

Shavasana's users are able to create projects with individual tasks that they can mark complete.

---


## Future Directions

* Enhancements to existing features:
    * Refactor code to improve user experience when navigating around the site.
    * Allow users to add and edit sections.
    * Implement board layouts for projects.
    * Add drag-and-drop functionality to reassign tasks to sections.
    * Users can assign due dates to tasks and projects.

* New features to implement:
    * Allow users to participate in Teams and work on shared projects.
    * Build interface by which users can update their profile information.
    * Add calendar view for visualizing project and task due dates.



---


## Acknowledgements

Many thanks to my classmates and the teachers of App Academy!


---


## Code snippets

Adding users to a team by their email addresses.

Frontend form component:

```
// Event handler in NewTeamForm component:

handleSubmit(e) {
    e.preventDefault();

    // Destructure props and the form component's local state.
    const { createTeam, createTeamMembership, currentUserId, 
            fetchUsers, createTeamMembershipsByEmail } = this.props;
    const { name, members } = this.state;

    // Create array of emails to be sent to backend.
    let membersArr = members.split(',');
    membersArr = membersArr.map(email => email.trim())
        .filter(email => email.length > 2 ); // very basic email validation

    // 1) Create new team.
    createTeam({ name }).then(team => {
        const teamId = team.id;

        // 2) Then add current user to the new team.
        createTeamMembership({ userId: currentUserId, teamId })

            // 3) Then, if additional member emails were added in the form, 
            // add the corresponding users (if they exist) to the team.
            .then(() => {
                if (membersArr.length >= 1) {
                    let data = { teamId: teamId, emails: membersArr };
                    createTeamMembershipsByEmail(data).then(() => fetchUsers(team.id));
                } else {
                    fetchUsers(team.id);
                }
            })
    });

    this.props.history.push('/home'); 
}

```


Thunk action creator, asynchronously sends AJAX request to backend:

```
// NOTE: The data passed into this function is an object with two key-value pairs:
// { teamId: teamId, emails: [email1, email2, email3, ...] }
export const createTeamMembershipsByEmail = data => {
    return dispatch => {
        return TeamMembershipApiUtil.createTeamMembershipsByEmail(data)
            .then(payload => {  
                // TeamMembershipsController will send back (in the payload)
                // any users that were added to the team      
                dispatch(receiveAllUsers(payload))
            });
    };
}
```


AJAX request that sends team and member information to the backend:

```
export const createTeamMembershipsByEmail = data => {
    const { teamId, emails } = data;
    return $.ajax({
        method: 'POST',
        url: '/api/team_memberships',
        data: {
            team_membership: {
                team_id: teamId,
                emails,
            }
        },
    })
};
```


TeamMemberships Controller (receives API request from front end):

```
# TeamMembershipsController#create:

def create
    #  Scenario 1: incoming API request contains an array of emails,
    #  so multiple team memberships must be created.
    if params[:team_membership][:emails]
        @users = []
        # Iterate through each email and create a team_membership for each one...
        # ...as long as the email corresponds to a user that already exists in the DB.
        params[:team_membership][:emails].each do |email|
            user = User.where("UPPER(primary_email) LIKE ?", "#{email}".upcase)
            if user.empty?
                next
            else
                user = user.first   # The above query returns an ActiveRecord collection
                @users.push(user)   # Add user to @users array
                
                # Also add the user to the team (create team membership)
                membership_params = { team_id: team_membership_params[:team_id], user_id: user.id }
                team_membership = TeamMembership.new(membership_params)
                team_membership.save
            end
        end

        render 'api/users/index', status: 200   # send users to the front end (formatted with jbuilder)

    #  Scenario 2: incoming API request is to create a single team membership
    #  In this straightforward scenario, the membership can be created using strong params.
    else
        @team_membership = TeamMembership.new(team_membership_params)
        if @team_membership.save
            render :show
        else
            render json: @team_membership.errors.full_messages
        end
    end
end
```


---


## Code snippets (part 2)

Versatile and reusable Modal component

```
const Modal = props => {
    const { modal, closeModal } = props;
    if (!modal) {
        return null;
    }
    let component;
    switch (modal) {
        case "login":
            component = <LoginFormContainer />;
            break;
        case "signup":
            component = <SignupFormContainer />;
            break;
        case "editProject":
            component = <EditProjectForm />;
            break;
        case "deleteProject":
            component = <DeleteProjectForm />;
            break;
        case "editTask":
            component = <TaskModal />;
            break;
        case "createTeam":
            component = <NewTeamForm />;
            break;
        case "removeUserFromTeam":
            component = <DeleteTeamMembershipForm />;
            break;
        case "editTeamGeneralSettings":
            component = <WorkspaceSettings selectedTab="General" />;
            break;
        case "editTeamMemberSettings":
            component = <WorkspaceSettings selectedTab="Members" />;
            break;
        default:
            return null;
    }

    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    );
};
```


The WorkspaceSettings modal takes advantage of the Modal component's versatility.
Depending on the prop passed in from the Modal component, the WorkspaceSettings
component will render either the "General" tab or the "Members" tab.

```
class WorkspaceSettings extends React.Component {
    constructor(props) {
        super(props);
        const { selectedTab } = this.props;
        this.state = { selectedTab };

        this.toggleTab = this.toggleTab.bind(this);
    }

    toggleTab(e) {
        const newState = this.state.selectedTab === "General" ? "Members" : "General";
        this.setState({ selectedTab: newState });
    }

    // #render function defined below...
}
```



---


## Code snippets (part 3): Debounce

Using debounce in a form to limit costly API requests

```
class TeamShow extends React.Component {
    constructor(props) {
        super(props);
        const { currentTeam, updateTeam } = this.props;
        const description = currentTeam ? currentTeam.description : "";
        this.state = { description };

        this.updateTeamApiRequest = debounce(teamParams => updateTeam(teamParams), 2000);

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(_, prevState) {
        if (prevState !== this.state) {
            const { currentTeam } = this.props;
            const { description } = this.state;
            const updatedTeamParams = { id: currentTeam.id, description };
            this.updateTeamApiRequest(updatedTeamParams);
        }
    }

    handleChange(e) {
        this.setState({ description: e.target.value });
    }

    // more code (not shown)...
}
```

Implemented a simplified debounce algorithm

```
function debounce(callback, interval) {
    let timeout;

    const executedFunction = (...args) => {
        const later = () => {
            callback(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, interval);
    };

    return executedFunction;
}
```