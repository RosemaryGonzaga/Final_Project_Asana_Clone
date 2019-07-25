import React from 'react';
import { connect } from 'react-redux';
import { selectAllUsers } from '../../reducers/selectors';

const UserListDropdown = props => {
    const { users, selectUser } = props;
    const userItems = users.map(user => {
        return (
            <li key={user.id} onClick={selectUser(user.id)}>
                <p>{user.fullName ? user.fullName : user.primaryEmail}</p>
                <p>{user.primaryEmail}</p>
            </li>
        );
    });
    return (
        <ul className="user-dropdown-menu-hidden" id="user-dropdown-menu">
            {userItems}
        </ul>
    );
};

const msp = state => {
    const users = selectAllUsers(state);
    return { users };
};

export default connect(msp, null)(UserListDropdown);