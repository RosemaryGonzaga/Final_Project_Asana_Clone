# Shavasana
### A project and task management tool for boosting team productivity, inspired by Asana

[Live site](https://shavasana.herokuapp.com/#/)

<!-- ![Home page](https://github.com/RosemaryGonzaga/Final_Project_Asana_Clone/raw/master/app/assets/images/readme%20_images/Shavasana_login_short.gif) -->
![Home page](https://github.com/RosemaryGonzaga/Final_Project_Asana_Clone/raw/master/app/assets/images/readme%20_images/Shavasana_login_large.gif)

Shavasana exists to make it easier for teams to collaborate on projects. Users can organize a project's tasks into stages and keep a pulse on the project's overall completion status.


## Shavasana's Technology Stack

* React / Redux
* JavaScript
* JQuery (AJAX)
* Ruby on Rails
* PostgreSQL
* CSS
* Webpack


## Feature Spotlight: Teams

Each user can create and join multiple teams. When creating a team, a user can invite teammates through their email addresses.

![Teams](https://github.com/RosemaryGonzaga/Final_Project_Asana_Clone/raw/master/app/assets/images/readme%20_images/create_team_and_invite_members.gif)

Whenever a user joins a team, a new TeamMembership (representing a row in a joins table in the database) is created. A user may join a team in one of two different ways:
* When a user creates a team, a TeamMembership is automatically created for the given user and the newly created team.
* When a user invites one or multiple teammates by entering their email addresses, those addresses are sent to the backend, where the TeamMembershipsController retrieves the relevant users from the database and creates a TeamMembership for each one.

I configured the flow of data from frontend to backend to handle these two distinct scenarios, as shown in the following code snippets.

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



## Feature Spotlight: Optimizing autosave using a debounce algorithm to limit API requests

![Debounce](https://github.com/RosemaryGonzaga/Final_Project_Asana_Clone/raw/master/app/assets/images/readme%20_images/debounce-auto-save.gif)

As a user types a description of the team in the form's textbox, the typed contents are auto-saved to the database. Rather than sending a new updateTeam API call to the back end for every letter typed, a single call is made only after the user has stopped typing. (Here, the "user has stopped typing" condition is defined as occurring when the form's local state remains unchanged for a window of two seconds after the last keystroke.)

I achieved this optimization by storing a debounced version of the updateTeam API call as an instance variable in the form component. If the form's local state (which stores the team description) changes, the componentDidUpdate lifecycle method invokes the debounced function.

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

Implemented a simplified debounce algorithm:

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




## Feature Spotlight: Versatile and reusable Modal component

![Modal](https://github.com/RosemaryGonzaga/Final_Project_Asana_Clone/raw/master/app/assets/images/readme%20_images/versatile_and_reusable_modal.gif)

Shavasana's versatile modal component exemplifies React's emphasis on reusability and modularity. It conditionally renders various forms involved in logging in; signing up; adding, editing, and deleting various resources (including projects, tasks, and teams).


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